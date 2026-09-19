"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import {
  APP_NAV_ITEMS,
  type AppNavId,
  isAppNavActive,
} from "@/lib/app-nav-items";

export function EavecBottomNav({ marcheWorld = false }: { marcheWorld?: boolean }) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const fr = locale === "fr";

  const labelFor = (id: AppNavId) => {
    switch (id) {
      case "home":
        return "Home";
      case "marche":
        return fr ? "Marché" : "Market";
      case "avec":
        return "AVEC";
      case "wallet":
        return "Wallet";
      case "profile":
        return "Profile";
    }
  };

  return (
    <nav
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2"
      aria-label="Main"
    >
      <div
        className={`pointer-events-auto flex w-full max-w-[min(32rem,calc(100%-0.25rem))] items-stretch justify-around rounded-full px-0.5 py-1 backdrop-blur-md ${
          marcheWorld
            ? "border border-[rgba(7,18,16,0.12)] bg-[rgba(244,247,246,0.94)] shadow-[0_12px_40px_rgba(7,18,16,0.14)]"
            : "fd-nav-glow"
        }`}
      >
        {APP_NAV_ITEMS.map((p) => {
          const active = isAppNavActive(pathname, p.href);
          return (
            <Link
              key={p.id}
              href={p.href}
              className={`relative flex min-h-[48px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-0.5 py-1.5 transition-transform active:scale-95 ${
                marcheWorld
                  ? active
                    ? "bg-[#071210] text-[#f4f7f6]"
                    : "text-[#5a6e6a]"
                  : active
                    ? "fd-nav-active"
                    : "fd-nav-idle"
              }`}
            >
              <NavIcon id={p.id} active={active} marcheWorld={marcheWorld} />
              <span
                className={`max-w-full truncate text-[9px] leading-tight sm:text-[10px] ${
                  marcheWorld
                    ? active
                      ? "font-bold text-[#f4f7f6]"
                      : "font-semibold"
                    : active
                      ? "font-bold text-[#0F2D2F]"
                      : "font-semibold"
                }`}
              >
                {labelFor(p.id)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function NavIcon({
  id,
  active,
  marcheWorld,
}: {
  id: AppNavId;
  active: boolean;
  marcheWorld: boolean;
}) {
  const stroke = marcheWorld
    ? active
      ? "#f4f7f6"
      : "#5a6e6a"
    : active
      ? "#0F2D2F"
      : "currentColor";
  const sw = 1.7;

  if (id === "home") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-9.5Z"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "marche") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 7h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        <path
          d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (id === "avec") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="2.6" stroke={stroke} strokeWidth={sw} />
        <circle cx="15.5" cy="9" r="2.6" stroke={stroke} strokeWidth={sw} />
        <path
          d="M4.5 18.5c.5-2.3 2.4-3.8 5.2-3.8.8 0 1.5.1 2.1.4"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path
          d="M12.2 15.2c.7-.3 1.5-.4 2.4-.4 2.8 0 4.7 1.5 5.2 3.8"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (id === "wallet") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2.5"
          stroke={stroke}
          strokeWidth={sw}
        />
        <path
          d="M3 10h18"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <circle cx="16.5" cy="14.5" r="1.3" fill={stroke} />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke={stroke} strokeWidth={sw} />
      <path
        d="M5 19c1-3.2 3.4-5 7-5s6 1.8 7 5"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </svg>
  );
}
