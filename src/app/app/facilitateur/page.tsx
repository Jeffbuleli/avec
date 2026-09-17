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
  const [meEmail, setMeEmail] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        const email = (j as { user?: { email?: string } })?.user?.email;
        setMeEmail(typeof email === "string" ? email : null);
      })
      .catch(() => setMeEmail(null));

    void fetch("/api/facilitateur/portfolio", { cache: "no-store" })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          const msg =
            (j as { error?: string; message?: string }).error ??
            (j as { message?: string }).message ??
            (r.status === 401
              ? fr
                ? "Session expirée — reconnectez-vous."
                : "Session expired — sign in again."
              : fr
                ? `Impossible de charger le portefeuille (HTTP ${r.status}).`
                : `Could not load portfolio (HTTP ${r.status}).`);
          setErr(msg);
          setGroups([]);
          return;
        }
        setErr(null);
        setGroups(((j as { groups?: FacilGroup[] }).groups ?? []) as FacilGroup[]);
      })
      .catch(() => {
        setErr(
          fr
            ? "Réseau indisponible — réessayez."
            : "Network unavailable — try again.",
        );
        setGroups([]);
      });
  }, [fr]);

  return (
    <div className="space-y-4 pb-8">
      <WalletSubpageHeader
        title={fr ? "Facilitateur ONG" : "NGO facilitator"}
        backHref="/app/wallet/groups"
      />

      <div className={avecCls.section}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[color:var(--fd-muted)]">
          {fr ? "Comment ça marche" : "How it works"}
        </p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-[color:var(--fd-text)]">
          <li>
            {fr
              ? "Connectez-vous avec un compte qui est président / co-admin / comité d’au moins une AVEC."
              : "Sign in with an account that is admin / co-admin / committee of at least one AVEC."}
          </li>
          <li>
            {fr
              ? "Ici vous voyez tous ces groupes : caisse, votes ouverts, alertes anti-détournement."
              : "Here you see all those groups: treasury, open votes, integrity alerts."}
          </li>
          <li>
            {fr
              ? "« Export PV / PDF » ouvre un rapport imprimable (Imprimer → Enregistrer en PDF)."
              : "“Export minutes / PDF” opens a printable report (Print → Save as PDF)."}
          </li>
        </ol>
        <p className="mt-3 text-[11px] leading-snug text-[color:var(--fd-muted)]">
          {fr
            ? "Démo jury : utilisez demo-umoja-01@eavec.demo (présidente d’AVEC Umoja)."
            : "Jury demo: use demo-umoja-01@eavec.demo (chair of AVEC Umoja)."}
        </p>
        {meEmail ? (
          <p className="mt-2 text-[11px] font-semibold text-[color:var(--fd-muted)]">
            {fr ? "Compte actuel :" : "Current account:"}{" "}
            <span className="text-[color:var(--fd-text)]">{meEmail}</span>
          </p>
        ) : null}
      </div>

      {err ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {err}
        </p>
      ) : null}

      {!groups ? (
        <p className="text-sm text-[color:var(--fd-muted)]">…</p>
      ) : groups.length === 0 && !err ? (
        <div className={avecCls.section}>
          <p className="text-sm font-semibold">
            {fr
              ? "Aucun groupe à animer avec ce compte"
              : "No groups to facilitate with this account"}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[color:var(--fd-muted)]">
            {fr
              ? "Cette page ne liste pas les groupes où vous êtes simple membre. Il faut le rôle admin, co-admin ou comité. Si vous voyez des AVEC dans « Mes groupes » en tant que membre seulement, c’est normal qu’elles n’apparaissent pas ici."
              : "This page does not list groups where you are only a member. You need admin, co-admin or committee role. If you see AVEC groups under “My groups” as a member only, they will not show here."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/app/wallet/groups"
              className={`${avecCls.btnPrimary} inline-flex flex-1 justify-center sm:flex-none`}
            >
              {fr ? "Mes groupes AVEC" : "My AVEC groups"}
            </Link>
            <Link
              href="/demo"
              className={`${avecCls.btnGhost} inline-flex flex-1 justify-center sm:flex-none`}
            >
              {fr ? "Compte démo Umoja" : "Umoja demo account"}
            </Link>
          </div>
        </div>
      ) : groups.length > 0 ? (
        <>
          <FieldOpsCard />
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
        </>
      ) : null}

      <McBuleliPoweredFooter />
    </div>
  );
}
