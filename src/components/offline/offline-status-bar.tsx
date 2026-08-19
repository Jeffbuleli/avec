"use client";

import { useOfflineState } from "@/components/offline/offline-provider";

export function OfflineStatusBar() {
  const { online, queueCount, syncing, failedCount, lastSyncAt, syncNow } =
    useOfflineState();
  const tone = !online
    ? "bg-amber-100 text-amber-950"
    : failedCount > 0
      ? "bg-rose-100 text-rose-900"
      : queueCount > 0 || syncing
        ? "bg-sky-100 text-sky-900"
        : "bg-emerald-100 text-emerald-900";

  const label = !online
    ? "Offline - actions saved on this device"
    : syncing
      ? "Sync in progress"
      : failedCount > 0
        ? `${failedCount} action(s) need attention`
        : queueCount > 0
          ? `${queueCount} action(s) queued`
          : lastSyncAt
            ? `Synced ${new Date(lastSyncAt).toLocaleTimeString()}`
            : "Ready for field sync";

  return (
    <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${tone}`}>
      <div className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {online && (queueCount > 0 || failedCount > 0) ? (
          <button
            type="button"
            onClick={() => void syncNow()}
            className="rounded-full border border-current/20 px-2.5 py-1 text-[11px] font-bold"
          >
            Sync
          </button>
        ) : null}
      </div>
    </div>
  );
}
