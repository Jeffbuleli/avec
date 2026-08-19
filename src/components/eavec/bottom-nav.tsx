"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { APP_NAV_ITEMS, isAppNavActive } from "@/lib/app-nav-items";

export function EavecBottomNav() {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const fr = locale === "fr";

  const labelFor = (href: string) => {
    if (href === "/app/wallet/groups") return fr ? "AVEC" : "AVEC";
    if (href === "/app/wallet") return fr ? "Caisse" : "Wallet";
    return t("nav_profile");
  };

  return (
    <nav
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2"
      aria-label="Main"
    >
      <div className="fd-nav-glow pointer-events-auto flex w-full max-w-md items-stretch justify-around rounded-full px-1 py-1 backdrop-blur-md md:max-w-lg">
        {APP_NAV_ITEMS.map((p) => {
          const active = isAppNavActive(pathname, p.href);
          return (
            <Link
              key={p.href}
              href={p.href}
              className={`relative flex min-h-[48px] min-w-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 transition-transform active:scale-95 ${
                active ? "fd-nav-active" : "fd-nav-idle"
              }`}
            >
              <NavIcon href={p.href} active={active} />
              <span
                className={`max-w-[4.75rem] truncate text-[10px] leading-tight ${
                  active ? "font-bold text-[#0F2D2F]" : "font-semibold"
                }`}
              >
                {labelFor(p.href)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function NavIcon({ href, active }: { href: string; active: boolean }) {
  const stroke = active ? "#0F2D2F" : "currentColor";
  if (href === "/app/wallet/groups") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 10a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
          stroke={stroke}
          strokeWidth="1.8"
        />
        <path
          d="M5 19c.6-2.4 2.7-4 7-4s6.4 1.6 7 4"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (href === "/app/wallet") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2.5"
          stroke={stroke}
          strokeWidth="1.8"
        />
        <path d="M3 10h18" stroke={stroke} strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke={stroke} strokeWidth="1.8" />
      <path
        d="M5 19c1-3.2 3.4-5 7-5s6 1.8 7 5"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
