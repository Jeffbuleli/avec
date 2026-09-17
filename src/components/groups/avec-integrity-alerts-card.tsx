"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { avecCls } from "@/components/groups/avec-ui";

type Alert = {
  id: string;
  severity: "high" | "medium" | "info";
  titleFr: string;
  titleEn: string;
  detailFr: string;
  detailEn: string;
};

export function AvecIntegrityAlertsCard({
  groupId,
  canExport = false,
}: {
  groupId: string;
  canExport?: boolean;
}) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [alerts, setAlerts] = useState<Alert[] | null>(null);

  useEffect(() => {
    void fetch(`/api/groups/${groupId}/integrity`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j.alerts)) setAlerts(j.alerts as Alert[]);
        else setAlerts([]);
      })
      .catch(() => setAlerts([]));
  }, [groupId]);

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="rounded-[1.35rem] border border-rose-200/80 bg-gradient-to-br from-rose-50 to-amber-50/40 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-rose-800">
            {fr ? "Intégrité caisse" : "Treasury integrity"}
          </p>
          <p className="mt-1 text-sm font-bold text-rose-950">
            {fr
              ? "Signaux anti-détournement"
              : "Anti-misappropriation signals"}
          </p>
        </div>
        {canExport ? (
          <a
            href={`/api/facilitateur/groups/${groupId}/export`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-rose-300 bg-white px-2.5 py-1 text-[10px] font-bold text-rose-900"
          >
            {fr ? "Export" : "Export"}
          </a>
        ) : null}
      </div>
      <ul className="mt-3 space-y-2">
        {alerts.map((a) => (
          <li
            key={a.id}
            className={`rounded-xl border px-3 py-2 ${
              a.severity === "high"
                ? "border-rose-300 bg-rose-100/70"
                : a.severity === "medium"
                  ? "border-amber-300 bg-amber-50"
                  : "border-[color:var(--fd-border)] bg-white/80"
            }`}
          >
            <p className="text-xs font-extrabold text-[color:var(--fd-text)]">
              {fr ? a.titleFr : a.titleEn}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-[color:var(--fd-muted)]">
              {fr ? a.detailFr : a.detailEn}
            </p>
          </li>
        ))}
      </ul>
      <p className={`${avecCls.moneyNote} mt-3`}>
        {fr
          ? "Alertes indicatives — le comité décide. e-AVEC n’est pas une banque."
          : "Indicative alerts — the committee decides. e-AVEC is not a bank."}
      </p>
    </div>
  );
}
