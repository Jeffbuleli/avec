"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

type Alert = {
  id: string;
  severity: "high" | "medium" | "info";
  titleFr: string;
  titleEn: string;
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
    <div className="rounded-2xl border border-rose-200/70 bg-rose-50/80 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-extrabold uppercase tracking-wide text-rose-800">
          {fr ? "Intégrité" : "Integrity"}
        </p>
        {canExport ? (
          <a
            href={`/api/facilitateur/groups/${groupId}/export`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-rose-900 underline"
          >
            PDF
          </a>
        ) : null}
      </div>
      <ul className="space-y-1.5">
        {alerts.map((a) => (
          <li
            key={a.id}
            className={`rounded-xl px-2.5 py-1.5 text-xs font-bold ${
              a.severity === "high"
                ? "bg-rose-100 text-rose-950"
                : a.severity === "medium"
                  ? "bg-amber-100 text-amber-950"
                  : "bg-white/80 text-[color:var(--fd-text)]"
            }`}
          >
            {fr ? a.titleFr : a.titleEn}
          </li>
        ))}
      </ul>
    </div>
  );
}
