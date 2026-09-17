"use client";

import { useOfflineState } from "@/components/offline/offline-provider";
import { useI18n } from "@/components/i18n-provider";

export function OfflineStatusBar() {
  const { t, locale } = useI18n();
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
    ? t("offline_bar_offline")
    : syncing
      ? t("offline_bar_syncing")
      : failedCount > 0
        ? t("offline_bar_failed").replace("{n}", String(failedCount))
        : queueCount > 0
          ? t("offline_bar_queued").replace("{n}", String(queueCount))
          : lastSyncAt
            ? t("offline_bar_synced").replace(
                "{time}",
                new Date(lastSyncAt).toLocaleTimeString(
                  locale === "fr" ? "fr-CD" : "en-GB",
                  { hour: "2-digit", minute: "2-digit" },
                ),
              )
            : t("offline_bar_ready");

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
            {t("offline_bar_sync_btn")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
