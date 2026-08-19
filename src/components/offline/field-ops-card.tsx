"use client";

import { useOfflineState } from "@/components/offline/offline-provider";

export function FieldOpsCard({ groupId }: { groupId?: string }) {
  const { fieldOps, setPrimaryDevice, queueCount, online } = useOfflineState();
  const primary = groupId ? Boolean(fieldOps.primaryDeviceByGroup[groupId]) : false;

  return (
    <div className="rounded-2xl border border-[color:var(--fd-border)] bg-[color:var(--fd-card)] p-3">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--fd-muted)]">
        Terrain
      </p>
      <p className="mt-1 text-sm font-bold text-[color:var(--fd-text)]">
        Facilitateur et appareil principal
      </p>
      <p className="mt-1 text-xs leading-relaxed text-[color:var(--fd-muted)]">
        Utilisez un appareil principal par groupe pour réduire les doublons de réunion et
        synchronisez avant de changer d’animateur.
      </p>
      {groupId ? (
        <button
          type="button"
          onClick={() => void setPrimaryDevice(groupId, !primary)}
          className={`mt-3 rounded-xl px-3 py-2 text-xs font-bold ${
            primary
              ? "bg-[color:var(--fd-primary)] text-white"
              : "border border-[color:var(--fd-border)] text-[color:var(--fd-text)]"
          }`}
        >
          {primary ? "Appareil principal actif" : "Définir comme appareil principal"}
        </button>
      ) : null}
      <p className="mt-2 text-[11px] text-[color:var(--fd-muted)]">
        {online
          ? `${queueCount} action(s) en attente éventuelle de sync`
          : "Mode offline actif - les actions sont gardées sur cet appareil"}
      </p>
    </div>
  );
}
