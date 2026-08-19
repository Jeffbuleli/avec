"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { APP_NAV_ITEMS, isAppNavActive } from "@/lib/app-nav-items";
import { BRAND_LOGO_MARK_256 } from "@/lib/brand-logo";
import { getMcbuleliWalletUrl } from "@/lib/app-url";

export function EavecSideNav() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const fr = locale === "fr";

  const labelFor = (href: string) => {
    if (href === "/app/wallet/groups") return "AVEC";
    if (href === "/app/wallet") return fr ? "Caisse" : "Wallet";
    return fr ? "Profil" : "Profile";
  };

  return (
    <aside className="sticky top-0 flex h-dvh w-56 shrink-0 flex-col border-r border-[color:var(--fd-border)] bg-[color:var(--fd-card)] px-3 py-5">
      <Link href="/app/wallet/groups" className="mb-8 flex items-center gap-2 px-2">
        <Image
          src={BRAND_LOGO_MARK_256}
          alt="e-AVEC"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-contain"
          unoptimized
        />
        <span className="text-sm font-extrabold tracking-tight text-[#0F2D2F]">
          e-AVEC
        </span>
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {APP_NAV_ITEMS.map((p) => {
          const active = isAppNavActive(pathname, p.href);
          return (
            <Link
              key={p.href}
              href={p.href}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-[#0F2D2F] text-[#F6E8CD]"
                  : "text-[#0F2D2F]/80 hover:bg-[#F6E8CD]"
              }`}
            >
              {labelFor(p.href)}
            </Link>
          );
        })}
      </nav>
      <a
        href={getMcbuleliWalletUrl()}
        className="mt-auto rounded-xl border border-[color:var(--fd-border)] px-3 py-2 text-xs font-semibold text-[#0F2D2F]/70 hover:bg-[#F6E8CD]"
      >
        {fr ? "Portefeuille McBuleli" : "McBuleli wallet"}
      </a>
    </aside>
  );
}
