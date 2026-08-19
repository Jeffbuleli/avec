"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { AvecIconTreasury } from "@/components/groups/avec-icons";
import { avecCls } from "@/components/groups/avec-ui";
import { clientErrorText } from "@/lib/client-error-text";

type Funds = {
  totalUsdt: number;
  savingsUsdt: number;
  socialUsdt: number;
  adminUsdt: number;
  penaltiesUsdt: number;
  interestUsdt: number;
  reserveUsdt: number;
  lentUsdt: number;
  creditUsdt: number;
  availableUsdt: number;
  totalShares: number;
  shareValueUsdt: number;
  outflowLast24hUsdt?: number;
  outflowCapUsdt?: number;
  pendingLocalUsdt: number;
  pendingLocalSavingsUsdt: number;
  pendingLocalSocialUsdt: number;
  coveredUsdt: number;
  coverageRatioPct: number;
  retirableUsdt: number;
};

function FundRow({
  label,
  value,
  hint,
  accent,
  compact,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div
        className={`rounded-xl border px-2.5 py-2 ${
          accent
            ? "border-[color:var(--fd-primary)]/25 bg-[color:var(--fd-mint)]/40"
            : "border-[color:var(--fd-border)] bg-[color:var(--fd-card)]"
        }`}
      >
        <p className="truncate text-[9px] font-bold uppercase tracking-wide text-[color:var(--fd-muted)]">
          {label}
        </p>
        <p className="mt-0.5 truncate font-mono text-xs font-bold tabular-nums text-[color:var(--fd-primary)]">
          {value}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 ${
        accent
          ? "border-[color:var(--fd-primary)]/25 bg-[color:var(--fd-mint)]/40"
          : "border-[color:var(--fd-border)] bg-[color:var(--fd-card)]"
      }`}
    >
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--fd-muted)]">
          {label}
        </p>
        {hint ? <p className="text-[9px] text-[color:var(--fd-muted)]">{hint}</p> : null}
      </div>
      <p className="shrink-0 font-mono text-sm font-bold tabular-nums text-[color:var(--fd-primary)]">
        {value}
      </p>
    </div>
  );
}

export function AvecTreasuryFunds({
  groupId,
  canAdmin = false,
  onRefreshKey,
}: {
  groupId: string;
  canAdmin?: boolean;
  onRefreshKey?: number;
}) {
  const { t } = useI18n();
  const [funds, setFunds] = useState<Funds | null>(null);
  const [coverageAmount, setCoverageAmount] = useState("");
  const [coverageNote, setCoverageNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/groups/${groupId}/funds`, { cache: "no-store" });
    const j = await res.json().catch(() => ({}));
    if (res.ok && j.funds) setFunds(j.funds as Funds);
  }, [groupId]);

  useEffect(() => {
    void load();
  }, [load, onRefreshKey]);

  const fmt = (n: number) => `${n.toFixed(2)} USD`;

  async function submitCoverage() {
    const amountUsdt = Number(coverageAmount.replace(",", "."));
    if (!Number.isFinite(amountUsdt) || amountUsdt <= 0) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/groups/${groupId}/cash-coverage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsdt, note: coverageNote }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr((j as { error?: string }).error ?? "group_action_failed");
        return;
      }
      setCoverageAmount("");
      setCoverageNote("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={avecCls.section}>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--fd-mint)] text-[color:var(--fd-primary)]">
          <AvecIconTreasury className="h-5 w-5" />
        </span>
        <div>
          <p className={avecCls.sectionTitle}>{t("avec_treasury_title")}</p>
          <p className="text-2xl font-black tabular-nums text-[color:var(--fd-primary)]">
            {funds ? funds.totalUsdt.toFixed(0) : "…"}
            <span className="ml-1 text-xs font-bold">USD</span>
          </p>
        </div>
      </div>

      {funds ? (
        <div className="space-y-2">
          {typeof funds.outflowCapUsdt === "number" && funds.outflowCapUsdt > 0 ? (
            <div className="rounded-xl border border-sky-200/80 bg-sky-50/50 px-3 py-2">
              <div className="flex items-center justify-between gap-2 text-[9px] font-bold text-sky-950">
                <span>{t("avec_treasury_outflow_24h")}</span>
                <span className="font-mono tabular-nums">
                  {(funds.outflowLast24hUsdt ?? 0).toFixed(0)} / {funds.outflowCapUsdt.toFixed(0)}{" "}
                  USD
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sky-100">
                <div
                  className="h-full rounded-full bg-sky-600 transition-all"
                  style={{
                    width: `${Math.min(100, ((funds.outflowLast24hUsdt ?? 0) / funds.outflowCapUsdt) * 100)}%`,
                  }}
                />
              </div>
              <p className="mt-1 text-[8px] text-sky-900/80">{t("avec_treasury_outflow_hint")}</p>
            </div>
          ) : null}
          <FundRow
            label={t("avec_fund_savings")}
            value={fmt(funds.savingsUsdt)}
            hint={t("avec_fund_savings_hint", {
              shares: funds.totalShares,
              value: funds.shareValueUsdt.toFixed(2),
            })}
            accent
          />
          <FundRow label={t("avec_fund_social")} value={fmt(funds.socialUsdt)} />
          <FundRow
            label="Epargne locale non centralisee"
            value={fmt(funds.pendingLocalUsdt)}
            hint="Valeur enregistree en cash local, pas encore retirable numeriquement."
          />
          <FundRow
            label="Liquidite couverte"
            value={fmt(funds.coveredUsdt)}
            hint={`Couverture ${funds.coverageRatioPct}%`}
            accent
          />
          <FundRow label={t("avec_fund_penalties")} value={fmt(funds.penaltiesUsdt)} />
          <FundRow label={t("avec_fund_interest")} value={fmt(funds.interestUsdt)} />
          {funds.reserveUsdt > 0.01 ? (
            <FundRow label={t("avec_fund_reserve")} value={fmt(funds.reserveUsdt)} />
          ) : null}
          <FundRow label={t("avec_fund_admin")} value={fmt(funds.adminUsdt)} />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <FundRow
              compact
              label={t("avec_fund_avail_short")}
              value={fmt(funds.retirableUsdt)}
              accent
            />
            <FundRow
              compact
              label={t("avec_fund_credit_short")}
              value={fmt(funds.creditUsdt ?? funds.lentUsdt)}
              hint={funds.creditUsdt > 0.01 ? t("avec_fund_credit_hint") : undefined}
            />
          </div>
          {canAdmin ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-950">
                Centraliser du cash
              </p>
              <p className="mt-1 text-[10px] text-amber-900/80">
                Utilisez ceci quand l’admin a effectivement depose le cash via banque ou
                Mobile Money.
              </p>
              <div className="mt-2 grid gap-2">
                <input
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  inputMode="decimal"
                  placeholder="Montant centralise (USD)"
                  className="wallet-input w-full rounded-xl border px-3 py-2 text-sm"
                />
                <input
                  value={coverageNote}
                  onChange={(e) => setCoverageNote(e.target.value)}
                  placeholder="Reference / note"
                  className="wallet-input w-full rounded-xl border px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => void submitCoverage()}
                  disabled={busy}
                  className="rounded-xl bg-[color:var(--fd-primary)] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                >
                  {busy ? "…" : "Confirmer la centralisation"}
                </button>
                {err ? (
                  <p className="text-xs text-rose-700">{clientErrorText(t, err)}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="text-xs text-[color:var(--fd-muted)]">…</p>
      )}
    </div>
  );
}
