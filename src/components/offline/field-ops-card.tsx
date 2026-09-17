"use client";

import { useOfflineState } from "@/components/offline/offline-provider";
import { useI18n } from "@/components/i18n-provider";

export function FieldOpsCard({ groupId }: { groupId?: string }) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const { fieldOps, setPrimaryDevice, queueCount, online } = useOfflineState();
  const primary = groupId ? Boolean(fieldOps.primaryDeviceByGroup[groupId]) : false;

  return (
    <div className="rounded-2xl border border-[color:var(--fd-border)] bg-[color:var(--fd-card)] px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-[color:var(--fd-text)]">
          {fr ? "Terrain" : "Field"}
          {!online ? (fr ? " · hors ligne" : " · offline") : null}
          {queueCount > 0 ? ` · ${queueCount}` : null}
        </p>
        {groupId ? (
          <button
            type="button"
            onClick={() => void setPrimaryDevice(groupId, !primary)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              primary
                ? "bg-[color:var(--fd-primary)] text-white"
                : "border border-[color:var(--fd-border)]"
            }`}
          >
            {primary ? (fr ? "Principal" : "Primary") : (fr ? "Définir" : "Set")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
