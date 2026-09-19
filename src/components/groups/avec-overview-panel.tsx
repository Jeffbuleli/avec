"use client";

import { avecMoney } from "@/lib/avec/display-currency";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { AvecVueGovernanceCard } from "@/components/groups/avec-vue-governance-card";
import { AvecAiInsightsCard } from "@/components/groups/avec-ai-insights-card";
import { AvecFinancialPassportPanel } from "@/components/groups/avec-financial-passport-panel";
import { AvecIntegrityAlertsCard } from "@/components/groups/avec-integrity-alerts-card";
import {
  avecCls,
  AvecFeedRow,
} from "@/components/groups/avec-ui";
import type { GovernanceVoteMeta } from "@/lib/avec/governance/types";
import type { AvecMemberRow } from "@/components/groups/avec-member-list";

type FundBuckets = {
  savingsUsdt: number;
  socialUsdt: number;
  lentUsdt: number;
  availableUsdt: number;
};

type LedgerEntry = {
  id: string;
  entryType: string;
  amount: string;
  createdAt: string;
};

function entryLabel(
  entryType: string,
  labels: Record<string, string>,
): string {
  if (entryType.includes("contribution")) return labels.contribution;
  if (entryType.includes("loan")) return labels.loan;
  if (entryType.includes("social") || entryType.includes("aid"))
    return labels.social;
  if (entryType.includes("payout")) return labels.payout;
  return labels.movement;
}

/**
 * Vue = one job: caisse + next pay. Members/cycle live in the group hero only.
 */
export function AvecOverviewPanel({
  groupId,
  group,
  members,
  pendingCount,
  myUserId,
  canModerate,
  onNavigate,
}: {
  groupId: string;
  group: {
    balanceUsdt: number;
    contributionAmountUsdt: string;
    cycleDurationDays: number;
    meetingIntervalDays: number;
    maxMembers: number;
    socialFundUsdt: string;
    createdAt: string;
    subscriptionStatus: string;
    status: string;
    cycleStatus?: string;
    cycleNumber?: number;
  };
  memberCount: number;
  members: AvecMemberRow[];
  pendingCount: number;
  myUserId?: string;
  canModerate?: boolean;
  canAdmin?: boolean;
  onNavigate: (tab: "meeting" | "members" | "treasury" | "dialogue") => void;
}) {
  const { t, locale } = useI18n();
  const [funds, setFunds] = useState<FundBuckets | null>(null);
  const [openVote, setOpenVote] = useState<GovernanceVoteMeta | null>(null);
  const [pendingPayouts, setPendingPayouts] = useState(0);
  const [feed, setFeed] = useState<LedgerEntry[]>([]);
  const [showTips, setShowTips] = useState(false);

  const loadGov = useCallback(async () => {
    const res = await fetch(`/api/groups/${groupId}/governance/proposals`, {
      cache: "no-store",
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) return;
    const list = (j.proposals ?? []) as GovernanceVoteMeta[];
    setOpenVote(list.find((p) => p.status === "voting") ?? null);
  }, [groupId]);

  useEffect(() => {
    void Promise.all([
      fetch(`/api/groups/${groupId}/funds`, { cache: "no-store" }),
      fetch(`/api/groups/${groupId}/activity`, { cache: "no-store" }),
      loadGov(),
    ])
      .then(async ([f, a]) => {
        const fj = await f.json().catch(() => ({}));
        if (fj.funds) setFunds(fj.funds as FundBuckets);
        const aj = await a.json().catch(() => ({}));
        if (Array.isArray(aj.ledger)) {
          setFeed((aj.ledger as LedgerEntry[]).slice(0, 3));
        }
      })
      .catch(() => {});

    if (canModerate) {
      void fetch(`/api/groups/${groupId}/payouts`, { cache: "no-store" })
        .then((r) => r.json())
        .then((j) => {
          setPendingPayouts(Array.isArray(j.pending) ? j.pending.length : 0);
        })
        .catch(() => {});
    }
  }, [groupId, canModerate, loadGov]);

  const me = members.find((m) => m.userId === myUserId);
  const myShares = Number(me?.sharesTotal ?? 0) || 0;
  const shareValue = Number(group.contributionAmountUsdt) || 0;
  const socialPer = Number(group.socialFundUsdt) || 0;
  const nextMeetingTotal = shareValue + socialPer;
  const treasury = funds?.availableUsdt ?? group.balanceUsdt;
  const loc = locale === "fr" ? "fr-FR" : "en-US";

  const alerts = useMemo(() => {
    const items: { key: string; label: string; tone: string; onClick?: () => void }[] =
      [];
    if (openVote) {
      items.push({
        key: "vote",
        label: t("avec_vue_vote_live"),
        tone: "bg-violet-100 text-violet-900 ring-violet-300",
        onClick: () => onNavigate("dialogue"),
      });
    }
    if (pendingCount > 0) {
      items.push({
        key: "pending",
        label: `${pendingCount} · ${t("avec_vue_members")}`,
        tone: "bg-amber-100 text-amber-900 ring-amber-300",
        onClick: () => onNavigate("members"),
      });
    }
    if (pendingPayouts > 0 && canModerate) {
      items.push({
        key: "payout",
        label: `${pendingPayouts} · ${t("avec_tab_treasury")}`,
        tone: "bg-sky-100 text-sky-900 ring-sky-300",
        onClick: () => onNavigate("treasury"),
      });
    }
    if (group.subscriptionStatus === "overdue") {
      items.push({
        key: "sub",
        label: t("avec_vue_alert_sub"),
        tone: "bg-rose-100 text-rose-800 ring-rose-300",
      });
    }
    return items;
  }, [
    openVote,
    pendingCount,
    pendingPayouts,
    canModerate,
    group.subscriptionStatus,
    onNavigate,
    t,
  ]);

  return (
    <div className="space-y-3">
      <div className={avecCls.layoutVue}>
        <div className={avecCls.heroBalance}>
          <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-[#C9A227]/25 blur-2xl" />
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F6E8CD]/75">
            {t("avec_vue_treasury")}
          </p>
          <p className="mt-1 text-3xl font-black tabular-nums tracking-tight text-[#F6E8CD]">
            {avecMoney(treasury)}
          </p>
          {funds ? (
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/15 pt-3">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-wide text-[#F6E8CD]/65">
                  {locale === "fr" ? "Épargne" : "Savings"}
                </p>
                <p className="mt-0.5 text-xs font-extrabold tabular-nums text-[#F6E8CD]">
                  {avecMoney(funds.savingsUsdt)}
                </p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-wide text-[#F6E8CD]/65">
                  {locale === "fr" ? "Social" : "Social"}
                </p>
                <p className="mt-0.5 text-xs font-extrabold tabular-nums text-[#F6E8CD]">
                  {avecMoney(funds.socialUsdt)}
                </p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-wide text-[#F6E8CD]/65">
                  {locale === "fr" ? "Prêté" : "Lent"}
                </p>
                <p className="mt-0.5 text-xs font-extrabold tabular-nums text-[#F6E8CD]">
                  {avecMoney(funds.lentUsdt)}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className={avecCls.checkoutCard}>
          <p className={avecCls.sectionTitle}>{t("avec_vue_next_action")}</p>
          <p className="mt-2 text-2xl font-black tabular-nums text-[color:var(--fd-primary)]">
            {avecMoney(nextMeetingTotal)}
          </p>
          <p className="mt-1 text-[11px] text-[color:var(--fd-muted)]">
            {t("avec_vue_next_action_hint", {
              share: avecMoney(shareValue),
              social: avecMoney(socialPer),
            })}
          </p>
          <button
            type="button"
            onClick={() => onNavigate("meeting")}
            className={`${avecCls.btnPrimary} mt-auto mt-3 min-h-[48px]`}
          >
            {t("avec_vue_cta_contribute")}
          </button>
          {myUserId ? (
            <p className="mt-2 text-center text-[11px] text-[color:var(--fd-muted)]">
              {myShares} {t("avec_vue_my_shares").toLowerCase()} ·{" "}
              <span className="font-bold text-[color:var(--fd-primary)]">
                {avecMoney(myShares * shareValue)}
              </span>
            </p>
          ) : null}
        </div>
      </div>

      {alerts.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {alerts.map((a) =>
            a.onClick ? (
              <button
                key={a.key}
                type="button"
                onClick={a.onClick}
                className={`${avecCls.alertChip} ${a.tone}`}
              >
                {a.label}
              </button>
            ) : (
              <span key={a.key} className={`${avecCls.alertChip} ${a.tone}`}>
                {a.label}
              </span>
            ),
          )}
        </div>
      ) : null}

      {openVote ? (
        <AvecVueGovernanceCard
          groupId={groupId}
          myUserId={myUserId}
          meta={openVote}
          onVoted={() => void loadGov()}
        />
      ) : null}

      {canModerate ? (
        <AvecIntegrityAlertsCard groupId={groupId} canExport />
      ) : null}

      <div className={avecCls.section}>
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className={avecCls.sectionTitle}>{t("avec_vue_recent")}</p>
          <button
            type="button"
            onClick={() => onNavigate("treasury")}
            className="text-[10px] font-bold text-[color:var(--fd-primary)]"
          >
            {t("avec_vue_see_all")}
          </button>
        </div>
        {feed.length === 0 ? (
          <p className="py-2 text-center text-xs text-[color:var(--fd-muted)]">
            {t("avec_vue_feed_empty")}
          </p>
        ) : (
          feed.map((e) => (
            <AvecFeedRow
              key={e.id}
              title={entryLabel(e.entryType, {
                contribution: t("avec_feed_contribution"),
                loan: t("avec_feed_loan"),
                social: t("avec_feed_social"),
                payout: t("avec_feed_payout"),
                movement: t("avec_feed_movement"),
              })}
              meta={new Date(e.createdAt).toLocaleString(loc, {
                day: "2-digit",
                month: "short",
              })}
              amount={avecMoney(e.amount)}
            />
          ))
        )}
      </div>

      {myUserId ? (
        <div className={avecCls.section} id="avec-passport">
          <p className={avecCls.sectionTitle}>{t("avec_passport_title")}</p>
          <div className="mt-2">
            <AvecFinancialPassportPanel groupId={groupId} compact />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setShowTips((v) => !v)}
        className="w-full py-1 text-center text-[11px] font-bold text-[color:var(--fd-muted)]"
      >
        {showTips ? t("avec_vue_less") : t("avec_vue_more")}
      </button>

      {showTips ? <AvecAiInsightsCard groupId={groupId} /> : null}
    </div>
  );
}
