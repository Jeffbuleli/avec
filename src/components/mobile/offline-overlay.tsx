"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

export function OfflineOverlay() {
  const { t } = useI18n();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  if (online) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[90] flex items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50/95 px-4 py-3 text-left shadow-xl backdrop-blur-sm lg:bottom-4 lg:left-auto lg:right-4 lg:max-w-sm"
      role="alert"
    >
      <WifiOffIcon />
      <div>
        <p className="text-sm font-semibold text-amber-950">{t("offline_title")}</p>
        <p className="max-w-xs text-xs text-amber-900/80">
          {t("offline_hint")} Vos actions peuvent etre enregistrees puis synchronisees plus tard.
        </p>
      </div>
    </div>
  );
}

function WifiOffIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      className="text-amber-700"
      aria-hidden
    >
      <path
        d="M2 2l20 20M8.5 8.5a5 5 0 017 7M3 10a13 13 0 0117 0M6 14a9 9 0 0111 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
