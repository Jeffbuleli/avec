"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { FieldOpsCard } from "@/components/offline/field-ops-card";
import { avecMoney } from "@/lib/avec/display-currency";
import { avecCls } from "@/components/groups/avec-ui";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";

type FacilGroup = {
  groupId: string;
  name: string;
  status: string;
  cycleStatus: string | null;
  cycleNumber: number | null;
  role: string;
  memberCount: number;
  availableUsdt: number;
  lentUsdt: number;
  openVotes: number;
  integrityHigh: number;
  alertCount: number;
  inviteCode: string | null;
};

export default function FacilitateurPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [groups, setGroups] = useState<FacilGroup[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/facilitateur/portfolio", { cache: "no-store" })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          setErr((j as { error?: string }).error ?? "error");
          setGroups([]);
          return;
        }
        setGroups(((j as { groups?: FacilGroup[] }).groups ?? []) as FacilGroup[]);
      })
      .catch(() => {
        setErr("network");
        setGroups([]);
      });
  }, []);

  return (
    <div className="space-y-4 pb-8">
      <WalletSubpageHeader
        title={fr ? "Facilitateur ONG" : "NGO facilitator"}
        backHref="/app/wallet/groups"
      />
      <p className="text-sm leading-relaxed text-[color:var(--fd-muted)]">
        {fr
          ? "Vue multi-groupes pour animateurs / ONG : caisse, votes ouverts, alertes intégrité et export PV (PDF via impression)."
          : "Multi-group view for facilitators / NGOs: treasury, open votes, integrity alerts and meeting export (print to PDF)."}
      </p>

      <FieldOpsCard />

      {err ? (
        <p className="text-sm text-rose-700">{err}</p>
      ) : null}

      {!groups ? (
        <p className="text-sm text-[color:var(--fd-muted)]">…</p>
      ) : groups.length === 0 ? (
        <div className={avecCls.section}>
          <p className="text-sm font-semibold">
            {fr
              ? "Aucun groupe en rôle admin / co-admin / comité."
              : "No groups in admin / co-admin / committee role."}
          </p>
          <Link href="/app/wallet/groups" className={`${avecCls.btnPrimary} mt-3 inline-flex justify-center`}>
            {fr ? "Retour AVEC" : "Back to AVEC"}
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {groups.map((g) => (
            <li key={g.groupId} className={avecCls.section}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-black">{g.name}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[color:var(--fd-muted)]">
                    {g.role} · {g.memberCount}{" "}
                    {fr ? "membres" : "members"} · cycle #{g.cycleNumber ?? 1}
                  </p>
                </div>
                {g.integrityHigh > 0 ? (
                  <span className="shrink-0 rounded-full bg-rose-100 px-2 py-1 text-[10px] font-bold text-rose-900">
                    {g.integrityHigh} {fr ? "alerte(s)" : "alert(s)"}
                  </span>
                ) : g.alertCount > 0 ? (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-900">
                    {g.alertCount} {fr ? "signal(s)" : "signal(s)"}
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-900">
                    OK
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className={avecCls.kpi}>
                  <p className={avecCls.kpiLabel}>{fr ? "Dispo" : "Avail."}</p>
                  <p className={avecCls.kpiValue}>{avecMoney(g.availableUsdt)}</p>
                </div>
                <div className={avecCls.kpi}>
                  <p className={avecCls.kpiLabel}>{fr ? "Prêté" : "Lent"}</p>
                  <p className={avecCls.kpiValue}>{avecMoney(g.lentUsdt)}</p>
                </div>
                <div className={avecCls.kpi}>
                  <p className={avecCls.kpiLabel}>{fr ? "Votes" : "Votes"}</p>
                  <p className={avecCls.kpiValue}>{g.openVotes}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
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
                  {fr ? "Export PV / PDF" : "Export minutes / PDF"}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      <McBuleliPoweredFooter />
    </div>
  );
}
