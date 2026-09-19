"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { avecMoney } from "@/lib/avec/display-currency";
import { avecCls } from "@/components/groups/avec-ui";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";

type FacilGroup = {
  groupId: string;
  name: string;
  cycleNumber: number | null;
  role: string;
  memberCount: number;
  availableUsdt: number;
  lentUsdt: number;
  openVotes: number;
  integrityHigh: number;
  alertCount: number;
};

export default function FacilitateurPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [groups, setGroups] = useState<FacilGroup[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    setErr(null);
    setGroups(null);
    void fetch("/api/facilitateur/portfolio", { cache: "no-store" })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          setErr(fr ? "Chargement impossible" : "Could not load");
          setGroups([]);
          return;
        }
        setGroups(((j as { groups?: FacilGroup[] }).groups ?? []) as FacilGroup[]);
      })
      .catch(() => {
        setErr(fr ? "Hors ligne" : "Offline");
        setGroups([]);
      });
  }, [fr]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto w-full max-w-lg space-y-3 pb-8 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <WalletSubpageHeader
        title={fr ? "Facilitateur" : "Facilitator"}
        backHref="/app/home"
        action={
          <button type="button" onClick={load} className={avecCls.btnGhost}>
            {fr ? "Actualiser" : "Refresh"}
          </button>
        }
      />

      {err ? (
        <div className={avecCls.section}>
          <p className="text-sm text-rose-700">{err}</p>
          <button type="button" onClick={load} className={`${avecCls.btnGhost} mt-2`}>
            {fr ? "Réessayer" : "Retry"}
          </button>
        </div>
      ) : null}

      {!groups ? (
        <p className="text-sm text-[color:var(--fd-muted)]">…</p>
      ) : !err && groups.length === 0 ? (
        <div className={avecCls.section}>
          <p className="text-sm font-semibold">
            {fr ? "Aucun groupe à animer" : "No groups to facilitate"}
          </p>
          <p className="mt-1 text-xs text-[color:var(--fd-muted)]">
            {fr ? "Rôle admin / co-admin / comité requis." : "Admin / co-admin / committee required."}
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/app/wallet/groups" className={avecCls.btnGhost}>
              AVEC
            </Link>
          </div>
        </div>
      ) : groups.length > 0 ? (
        <ul className="space-y-2.5">
          {groups.map((g) => (
            <li key={g.groupId} className={avecCls.section}>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">{g.name}</p>
                  <p className="text-[10px] text-[color:var(--fd-muted)]">
                    {g.role} · {g.memberCount} · #{g.cycleNumber ?? 1}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    g.integrityHigh > 0
                      ? "bg-rose-100 text-rose-900"
                      : g.alertCount > 0
                        ? "bg-amber-100 text-amber-900"
                        : "bg-emerald-100 text-emerald-900"
                  }`}
                >
                  {g.integrityHigh > 0
                    ? `${g.integrityHigh}!`
                    : g.alertCount > 0
                      ? g.alertCount
                      : "OK"}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                <div className={avecCls.kpi}>
                  <p className={avecCls.kpiLabel}>{fr ? "Dispo" : "Avail"}</p>
                  <p className={avecCls.kpiValue}>{avecMoney(g.availableUsdt)}</p>
                </div>
                <div className={avecCls.kpi}>
                  <p className={avecCls.kpiLabel}>{fr ? "Prêté" : "Lent"}</p>
                  <p className={avecCls.kpiValue}>{avecMoney(g.lentUsdt)}</p>
                </div>
                <div className={avecCls.kpi}>
                  <p className={avecCls.kpiLabel}>Votes</p>
                  <p className={avecCls.kpiValue}>{g.openVotes}</p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <Link
                  href={`/app/wallet/groups/${g.groupId}?tab=vue`}
                  className={avecCls.btnGhost}
                >
                  {fr ? "Ouvrir" : "Open"}
                </Link>
                <a
                  href={`/api/facilitateur/groups/${g.groupId}/export`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={avecCls.btnGhost}
                >
                  PDF
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
