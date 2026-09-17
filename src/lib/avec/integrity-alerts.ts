import { and, desc, eq, gte, inArray, sql } from "drizzle-orm";
import {
  getDb,
  groupAvecLoanApprovals,
  groupAvecLoans,
  groupProposals,
  groupSavingsGroups,
  groupSavingsMemberships,
  groupWalletLedgerEntries,
} from "@/db";
import { getGroupFundSummary } from "@/lib/avec/fund-buckets";
import { numFromNumeric } from "@/lib/wallet-types";

export type IntegrityAlert = {
  id: string;
  severity: "high" | "medium" | "info";
  code:
    | "duplicate_contribution"
    | "payout_without_vote"
    | "loan_missing_approvals"
    | "bucket_stress"
    | "share_concentration";
  titleFr: string;
  titleEn: string;
  detailFr: string;
  detailEn: string;
};

const MANAGER_ROLES = new Set(["admin", "co_admin", "committee"]);

export async function assertGroupFacilitatorAccess(args: {
  groupId: string;
  userId: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const db = getDb();
  const [m] = await db
    .select({
      role: groupSavingsMemberships.role,
      status: groupSavingsMemberships.status,
    })
    .from(groupSavingsMemberships)
    .where(
      and(
        eq(groupSavingsMemberships.groupId, args.groupId),
        eq(groupSavingsMemberships.userId, args.userId),
      ),
    )
    .limit(1);
  if (!m || m.status !== "approved" || !MANAGER_ROLES.has(m.role)) {
    return { ok: false, message: "group_forbidden" };
  }
  return { ok: true };
}

/** Deterministic anti-misappropriation / governance risk signals for Vue. */
export async function buildIntegrityAlerts(groupId: string): Promise<IntegrityAlert[]> {
  const db = getDb();
  const alerts: IntegrityAlert[] = [];
  const since = new Date(Date.now() - 30 * 86400000);

  const ledger = await db
    .select({
      id: groupWalletLedgerEntries.id,
      entryType: groupWalletLedgerEntries.entryType,
      amount: groupWalletLedgerEntries.amount,
      meta: groupWalletLedgerEntries.meta,
      createdAt: groupWalletLedgerEntries.createdAt,
    })
    .from(groupWalletLedgerEntries)
    .where(
      and(
        eq(groupWalletLedgerEntries.groupId, groupId),
        gte(groupWalletLedgerEntries.createdAt, since),
      ),
    )
    .orderBy(desc(groupWalletLedgerEntries.createdAt))
    .limit(400);

  // 1) Duplicate contributions (same member, same amount, < 2h)
  const contribs = ledger.filter((e) => e.entryType === "group_contribution_in");
  for (let i = 0; i < contribs.length; i++) {
    const a = contribs[i]!;
    const uid = String((a.meta as { userId?: string } | null)?.userId ?? "");
    if (!uid) continue;
    const amt = numFromNumeric(a.amount);
    for (let j = i + 1; j < Math.min(i + 12, contribs.length); j++) {
      const b = contribs[j]!;
      const uidB = String((b.meta as { userId?: string } | null)?.userId ?? "");
      if (uidB !== uid) continue;
      if (Math.abs(numFromNumeric(b.amount) - amt) > 0.0001) continue;
      const dt = Math.abs(a.createdAt.getTime() - b.createdAt.getTime());
      if (dt <= 2 * 3600000) {
        alerts.push({
          id: `dup-${a.id}`,
          severity: "high",
          code: "duplicate_contribution",
          titleFr: "Double cotisation suspecte",
          titleEn: "Suspicious duplicate contribution",
          detailFr:
            "Deux cotisations identiques pour le même membre en moins de 2 h — vérifier avant la réunion.",
          detailEn:
            "Two identical contributions for the same member within 2 hours — verify before the meeting.",
        });
        break;
      }
    }
    if (alerts.some((x) => x.code === "duplicate_contribution")) break;
  }

  // 2) Large payout without a passed governance proposal in the window
  const payouts = ledger.filter((e) => e.entryType === "group_payout_out");
  const [passedVotes] = await Promise.all([
    db
      .select({ id: groupProposals.id, financialImpactUsdt: groupProposals.financialImpactUsdt })
      .from(groupProposals)
      .where(
        and(
          eq(groupProposals.groupId, groupId),
          inArray(groupProposals.status, ["passed", "executed"]),
          gte(groupProposals.createdAt, since),
        ),
      )
      .limit(80),
  ]);
  for (const p of payouts.slice(0, 8)) {
    const amt = numFromNumeric(p.amount);
    if (amt < 50) continue;
    const matched = passedVotes.some((v) => {
      const impact = numFromNumeric(v.financialImpactUsdt ?? "0");
      return Math.abs(impact - amt) < 0.5 || impact >= amt * 0.9;
    });
    if (!matched) {
      alerts.push({
        id: `payout-${p.id}`,
        severity: "high",
        code: "payout_without_vote",
        titleFr: "Sortie de caisse sans vote clair",
        titleEn: "Treasury outflow without clear vote",
        detailFr: `Versement ~${amt.toFixed(0)} USD sans proposition de gouvernance correspondante récente.`,
        detailEn: `Payout ~${amt.toFixed(0)} USD without a matching recent governance proposal.`,
      });
      break;
    }
  }

  // 3) Disbursed loans missing approvals
  const loans = await db
    .select({
      id: groupAvecLoans.id,
      requiredApprovals: groupAvecLoans.requiredApprovals,
      status: groupAvecLoans.status,
      principalUsdt: groupAvecLoans.principalUsdt,
    })
    .from(groupAvecLoans)
    .where(
      and(
        eq(groupAvecLoans.groupId, groupId),
        eq(groupAvecLoans.status, "disbursed"),
      ),
    )
    .limit(20);

  for (const loan of loans) {
    const need = loan.requiredApprovals ?? 0;
    if (need <= 0) continue;
    const [row] = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(groupAvecLoanApprovals)
      .where(eq(groupAvecLoanApprovals.loanId, loan.id));
    const got = row?.c ?? 0;
    if (got < need) {
      alerts.push({
        id: `loan-${loan.id}`,
        severity: "medium",
        code: "loan_missing_approvals",
        titleFr: "Crédit décaissé avec approbations incomplètes",
        titleEn: "Loan disbursed with incomplete approvals",
        detailFr: `${got}/${need} signatures pour un crédit de ${numFromNumeric(loan.principalUsdt).toFixed(0)} USD.`,
        detailEn: `${got}/${need} signatures for a ${numFromNumeric(loan.principalUsdt).toFixed(0)} USD loan.`,
      });
      break;
    }
  }

  // 4) Bucket stress: lent close to or above savings
  try {
    const funds = await getGroupFundSummary(groupId);
    if (funds.savingsUsdt > 0 && funds.lentUsdt >= funds.savingsUsdt * 0.95) {
      alerts.push({
        id: "bucket-stress",
        severity: "medium",
        code: "bucket_stress",
        titleFr: "Caisse sous tension",
        titleEn: "Treasury under stress",
        detailFr: "Presque toute l’épargne est prêtée — risque de liquidité à la prochaine réunion.",
        detailEn: "Almost all savings are lent out — liquidity risk at the next meeting.",
      });
    }
  } catch {
    /* ignore */
  }

  // 5) Share concentration (one member > 35% of shares in recent contribs)
  const shareByUser = new Map<string, number>();
  let totalShares = 0;
  for (const e of contribs) {
    const uid = String((e.meta as { userId?: string; shares?: number } | null)?.userId ?? "");
    const shares = Number((e.meta as { shares?: number } | null)?.shares ?? 0);
    if (!uid || !(shares > 0)) continue;
    shareByUser.set(uid, (shareByUser.get(uid) ?? 0) + shares);
    totalShares += shares;
  }
  if (totalShares >= 20) {
    for (const [uid, sh] of shareByUser) {
      if (sh / totalShares >= 0.35) {
        alerts.push({
          id: `conc-${uid}`,
          severity: "info",
          code: "share_concentration",
          titleFr: "Concentration des parts",
          titleEn: "Share concentration",
          detailFr: "Un membre détient plus de 35 % des parts récentes — surveiller l’équité du groupe.",
          detailEn: "One member holds over 35% of recent shares — watch group equity.",
        });
        break;
      }
    }
  }

  return alerts.slice(0, 5);
}

export async function listFacilitatorPortfolio(userId: string) {
  const db = getDb();
  const rows = await db
    .select({
      groupId: groupSavingsGroups.id,
      name: groupSavingsGroups.name,
      status: groupSavingsGroups.status,
      cycleStatus: groupSavingsGroups.cycleStatus,
      cycleNumber: groupSavingsGroups.cycleNumber,
      role: groupSavingsMemberships.role,
      logoUrl: groupSavingsGroups.logoUrl,
      countryCode: groupSavingsGroups.countryCode,
      address: groupSavingsGroups.address,
      inviteCode: groupSavingsGroups.inviteCode,
    })
    .from(groupSavingsMemberships)
    .innerJoin(
      groupSavingsGroups,
      eq(groupSavingsMemberships.groupId, groupSavingsGroups.id),
    )
    .where(
      and(
        eq(groupSavingsMemberships.userId, userId),
        eq(groupSavingsMemberships.status, "approved"),
        inArray(groupSavingsMemberships.role, ["admin", "co_admin", "committee"]),
        eq(groupSavingsGroups.type, "avec"),
      ),
    )
    .orderBy(desc(groupSavingsGroups.updatedAt))
    .limit(50);

  const out = [];
  for (const r of rows) {
    let availableUsdt = 0;
    let lentUsdt = 0;
    let memberCount = 0;
    let openVotes = 0;
    let integrityHigh = 0;
    try {
      const funds = await getGroupFundSummary(r.groupId);
      availableUsdt = funds.availableUsdt;
      lentUsdt = funds.lentUsdt;
    } catch {
      /* ignore */
    }
    const [mc] = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(groupSavingsMemberships)
      .where(
        and(
          eq(groupSavingsMemberships.groupId, r.groupId),
          eq(groupSavingsMemberships.status, "approved"),
        ),
      );
    memberCount = mc?.c ?? 0;
    const [vc] = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(groupProposals)
      .where(
        and(
          eq(groupProposals.groupId, r.groupId),
          eq(groupProposals.status, "voting"),
        ),
      );
    openVotes = vc?.c ?? 0;
    const alerts = await buildIntegrityAlerts(r.groupId);
    integrityHigh = alerts.filter((a) => a.severity === "high").length;

    out.push({
      ...r,
      availableUsdt,
      lentUsdt,
      memberCount,
      openVotes,
      integrityHigh,
      alertCount: alerts.length,
    });
  }

  return { groups: out };
}
