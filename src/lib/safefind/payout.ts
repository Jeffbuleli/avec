import { eq } from "drizzle-orm";
import { getDb, safefindCases, safefindRewards, users } from "@/db";
import { hasPawapayKeys } from "@/lib/env";
import { isKycApproved } from "@/lib/kyc-policy";
import { pawapayPayOut } from "@/lib/pawapay/provider";
import {
  resolvePawapayProvider,
  toPawapayProviderId,
} from "@/lib/cod-mobile-providers";
import {
  isValidCodMsisdn,
  normalizeCodPhoneNumber,
} from "@/lib/freshpay/normalize-phone";
import { canAuthorizeReward } from "./reward-ownership";
import { writePlatformAdminAudit } from "@/lib/admin-audit";

/**
 * Trigger PawaPay payout for an authorized SafeFind reward.
 * Idempotent via unique payout_reference on safefind_rewards.
 */
export async function processSafefindRewardPayout(args: {
  rewardId: string;
  phoneNumber: string;
  provider: string;
  actorUserId?: string | null;
}): Promise<{ ok: true; reference: string } | { ok: false; error: string }> {
  if (!hasPawapayKeys()) {
    return { ok: false, error: "pawapay_unconfigured" };
  }

  const db = getDb();
  const [reward] = await db
    .select()
    .from(safefindRewards)
    .where(eq(safefindRewards.id, args.rewardId))
    .limit(1);
  if (!reward) return { ok: false, error: "reward_not_found" };
  if (reward.status === "PAID" || reward.status === "PROCESSING") {
    return { ok: true, reference: String(reward.payoutReference ?? reward.id) };
  }
  if (reward.status !== "AUTHORIZED") {
    return { ok: false, error: "reward_not_authorized" };
  }

  const [caseRow] = await db
    .select()
    .from(safefindCases)
    .where(eq(safefindCases.id, reward.caseId))
    .limit(1);
  if (!caseRow) return { ok: false, error: "case_not_found" };

  const [beneficiary] = await db
    .select({ kycStatus: users.kycStatus })
    .from(users)
    .where(eq(users.id, reward.beneficiaryUserId))
    .limit(1);

  const decision = canAuthorizeReward({
    ownership: {
      caseId: caseRow.id,
      initialFinderUserId: caseRow.initialFinderUserId,
      rewardOwnerUserId: caseRow.rewardOwnerUserId,
      rewardStatus: reward.status,
      rewardFrozen: caseRow.rewardFrozen,
      caseStatus: caseRow.status,
      hasOpenDispute: caseRow.status === "DISPUTED",
      hasOpenIncident: caseRow.status === "PARTNER_INCIDENT",
      reportedStolen: caseRow.status === "REPORTED_STOLEN",
    },
    beneficiaryKycApproved: isKycApproved(beneficiary?.kycStatus),
    requireKyc: true,
  });
  if (!decision.ok) {
    return { ok: false, error: decision.reason };
  }

  const phone = normalizeCodPhoneNumber(args.phoneNumber);
  if (!isValidCodMsisdn(phone)) {
    return { ok: false, error: "invalid_phone" };
  }
  const resolved = resolvePawapayProvider(phone, args.provider);
  if (!resolved.matched && !resolved.method) {
    return { ok: false, error: "invalid_provider" };
  }
  const providerId = toPawapayProviderId(resolved.method || args.provider);

  const reference = reward.payoutReference;
  if (!reference) return { ok: false, error: "missing_payout_reference" };

  await db
    .update(safefindRewards)
    .set({
      status: "PROCESSING",
      phoneNumber: phone,
      provider: providerId,
      updatedAt: new Date(),
    })
    .where(eq(safefindRewards.id, reward.id));

  try {
    const result = await pawapayPayOut({
      payoutId: reference,
      amount: reward.amount,
      currency: (reward.currency === "USD" ? "USD" : "CDF") as "USD" | "CDF",
      phoneNumber: phone,
      provider: providerId,
      customerMessage: "SafeFind reward",
    });

    await db
      .update(safefindRewards)
      .set({
        updatedAt: new Date(),
        meta: {
          ...(reward.meta ?? {}),
          pawapayInit: result.response,
          accepted: result.accepted,
        },
      })
      .where(eq(safefindRewards.id, reward.id));

    if (!result.accepted) {
      await db
        .update(safefindRewards)
        .set({
          status: "FAILED",
          failureReason: "pawapay_not_accepted",
          updatedAt: new Date(),
        })
        .where(eq(safefindRewards.id, reward.id));
      return { ok: false, error: "payout_failed" };
    }

    if (args.actorUserId) {
      await writePlatformAdminAudit({
        actorUserId: args.actorUserId,
        action: "safefind.reward_payout_init",
        resourceType: "safefind_reward",
        resourceId: reward.id,
        meta: { caseId: reward.caseId, reference },
      });
    }

    return { ok: true, reference };
  } catch (e) {
    await db
      .update(safefindRewards)
      .set({
        status: "FAILED",
        failureReason: e instanceof Error ? e.message : "payout_failed",
        updatedAt: new Date(),
      })
      .where(eq(safefindRewards.id, reward.id));
    return { ok: false, error: "payout_failed" };
  }
}

/** Idempotent webhook completion for SafeFind rewards (called from PawaPay handler). */
export async function applySafefindPayoutWebhook(args: {
  reference: string;
  status: "COMPLETED" | "FAILED";
  providerTxId?: string | null;
}): Promise<"applied" | "ignored" | "not_found"> {
  const db = getDb();
  const [reward] = await db
    .select()
    .from(safefindRewards)
    .where(eq(safefindRewards.payoutReference, args.reference))
    .limit(1);
  if (!reward) return "not_found";
  if (reward.status === "PAID") return "ignored";

  if (args.status === "COMPLETED") {
    await db
      .update(safefindRewards)
      .set({
        status: "PAID",
        paidAt: new Date(),
        providerTxId: args.providerTxId ?? reward.providerTxId,
        updatedAt: new Date(),
      })
      .where(eq(safefindRewards.id, reward.id));
    await db
      .update(safefindCases)
      .set({
        status: "REWARD_RELEASED",
        rewardStatus: "PAID",
        closedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(safefindCases.id, reward.caseId));
    return "applied";
  }

  await db
    .update(safefindRewards)
    .set({
      status: "FAILED",
      updatedAt: new Date(),
    })
    .where(eq(safefindRewards.id, reward.id));
  return "applied";
}
