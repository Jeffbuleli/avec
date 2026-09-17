"use client";

import { useOfflineState } from "@/components/offline/offline-provider";
import { useI18n } from "@/components/i18n-provider";

/** Offline field tip — only meaningful when facilitating a specific group. */
export function FieldOpsCard({ groupId }: { groupId?: string }) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const { fieldOps, setPrimaryDevice, queueCount, online } = useOfflineState();
  const primary = groupId ? Boolean(fieldOps.primaryDeviceByGroup[groupId]) : false;

  return (
    <div className="rounded-2xl border border-[color:var(--fd-border)] bg-[color:var(--fd-card)] p-3">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--fd-muted)]">
        {fr ? "Mode terrain (optionnel)" : "Field mode (optional)"}
      </p>
      <p className="mt-1 text-sm font-bold text-[color:var(--fd-text)]">
        {fr ? "Appareil principal du groupe" : "Group primary device"}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-[color:var(--fd-muted)]">
        {fr
          ? "Sur le terrain (réseau faible), un seul téléphone par AVEC enregistre les actions pour éviter les doublons de réunion. Ce n’est pas lié à l’export PDF."
          : "In the field (weak network), one phone per AVEC records actions to avoid duplicate meetings. This is unrelated to PDF export."}
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
          {primary
            ? fr
              ? "Appareil principal actif"
              : "Primary device active"
            : fr
              ? "Définir comme appareil principal"
              : "Set as primary device"}
        </button>
      ) : (
        <p className="mt-2 text-[11px] text-[color:var(--fd-muted)]">
          {fr
            ? "Ouvrez un groupe pour activer l’appareil principal."
            : "Open a group to set the primary device."}
        </p>
      )}
      <p className="mt-2 text-[11px] text-[color:var(--fd-muted)]">
        {online
          ? fr
            ? `${queueCount} action(s) en file de sync`
            : `${queueCount} action(s) in sync queue`
          : fr
            ? "Hors ligne — actions gardées sur cet appareil"
            : "Offline — actions kept on this device"}
      </p>
    </div>
  );
}
