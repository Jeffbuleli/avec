"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { avecCdf } from "@/lib/avec/display-currency";
import { BRAND_LOGO_MARK_256 } from "@/lib/brand-logo";

type WalletSummary = {
  lines?: { asset?: string; balance?: string | number }[];
};

function greeting(fr: boolean, hour: number) {
  if (fr) {
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  }
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Shared content column — mobile / tablet / desk keep the same side gutters via shell. */
const HOME_COL =
  "mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl";

export function EavecHomeHub({
  displayName,
}: {
  displayName: string;
}) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [cdf, setCdf] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const hour = useMemo(() => new Date().getHours(), []);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/wallet/summary", { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as WalletSummary;
      if (!res.ok) {
        setCdf("0");
        return;
      }
      const row = data.lines?.find((b) => b.asset === "CDF");
      setCdf(row?.balance != null ? String(row.balance) : "0");
    })();
  }, []);

  const services = [
    {
      href: "/app/wallet/groups",
      t: "AVEC",
      bg: "bg-[#E8F5E9]",
      icon: "avec" as const,
    },
    {
      href: "/app/marche",
      t: fr ? "Marché" : "Market",
      bg: "bg-[#E3F2FD]",
      icon: "shop" as const,
    },
    {
      href: "/app/wallet",
      t: "Wallet",
      bg: "bg-[#FFF8E1]",
      icon: "wallet" as const,
    },
    {
      href: "/app/wallet/transfer?asset=CDF",
      t: fr ? "Envoyer" : "Send",
      bg: "bg-[#F3E5F5]",
      icon: "send" as const,
    },
    {
      href: "/app/profile",
      t: "Profile",
      bg: "bg-[#E0F7FA]",
      icon: "user" as const,
    },
    {
      href: "/app/facilitateur",
      t: fr ? "ONG" : "NGO",
      bg: "bg-[#FCE4EC]",
      icon: "ong" as const,
    },
  ];

  return (
    <div className={`home-theme ${HOME_COL} space-y-4 pb-3 pt-1 text-[#0F2D2F] sm:space-y-5`}>
      <header className="flex items-center gap-3 sm:gap-3.5">
        <Image
          src={BRAND_LOGO_MARK_256}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-2xl object-contain sm:h-11 sm:w-11"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-[#0F2D2F] sm:text-[15px]">
            {greeting(fr, hour)}, {displayName}
          </p>
          <p className="text-xs font-semibold text-[#0F2D2F]/80">e-AVEC</p>
        </div>
      </header>

      <section className="overflow-hidden rounded-[1.5rem] bg-[#0F2D2F] p-4 text-[#F6E8CD] shadow-[0_16px_40px_-18px_rgba(15,45,47,0.55)] sm:rounded-[1.75rem] sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-[#F6E8CD]/90 sm:text-xs">
              {fr ? "Solde Wallet" : "Wallet balance"}
            </p>
            <p className="mt-1.5 truncate text-2xl font-black tabular-nums tracking-tight text-[#F6E8CD] sm:mt-2 sm:text-3xl md:text-4xl">
              {hidden
                ? "••••"
                : cdf != null
                  ? avecCdf(cdf)
                  : "…"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHidden((v) => !v)}
            className="shrink-0 rounded-full bg-white/15 p-2 sm:p-2.5"
            aria-label={hidden ? "Show" : "Hide"}
          >
            <EyeIcon crossed={hidden} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-2.5">
          <Link
            href="/app/wallet/fiat/deposit?asset=CDF"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#F6E8CD] text-sm font-extrabold text-[#0F2D2F] sm:min-h-[48px]"
          >
            <ArrowDownIcon />
            {fr ? "Dépôt" : "Deposit"}
          </Link>
          <Link
            href="/app/wallet/transfer?asset=CDF"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#E8C96A] text-sm font-extrabold text-[#0F2D2F] sm:min-h-[48px]"
          >
            <SendIcon />
            {fr ? "Envoyer" : "Send"}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-2.5 text-sm font-extrabold text-[#0F2D2F] sm:mb-3">
          {fr ? "Services" : "Services"}
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
          {services.map((s) => (
            <Link
              key={s.href + s.t}
              href={s.href}
              className={`flex aspect-square min-w-0 flex-col items-center justify-center gap-1.5 rounded-[1.15rem] ${s.bg} px-1.5 py-2 text-center transition active:scale-[0.97] sm:gap-2 sm:rounded-[1.35rem] sm:px-2 sm:py-3`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/85 shadow-sm sm:h-11 sm:w-11 sm:rounded-2xl md:h-12 md:w-12">
                <ServiceIcon kind={s.icon} />
              </span>
              <p className="max-w-full truncate px-0.5 text-[10px] font-extrabold leading-tight text-[#0F2D2F] sm:text-[11px] md:text-xs">
                {s.t}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
        stroke="#F6E8CD"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.5" stroke="#F6E8CD" strokeWidth="1.7" />
      {crossed ? (
        <path d="M4 4l16 16" stroke="#F6E8CD" strokeWidth="1.7" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v14M6 14l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12h14M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceIcon({
  kind,
}: {
  kind: "avec" | "shop" | "wallet" | "send" | "user" | "ong";
}) {
  const stroke = "#0F2D2F";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="h-[18px] w-[18px] shrink-0 sm:h-[22px] sm:w-[22px]"
    >
      {kind === "avec" && (
        <>
          <circle cx="9" cy="9" r="2.4" stroke={stroke} strokeWidth="1.6" />
          <circle cx="15.2" cy="9" r="2.4" stroke={stroke} strokeWidth="1.6" />
          <path d="M4.5 18c.5-2 2.2-3.4 4.8-3.4.7 0 1.3.1 1.9.3M12 14.9c.6-.2 1.3-.3 2.1-.3 2.6 0 4.3 1.4 4.8 3.4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === "shop" && (
        <>
          <path d="M4 7h16l-1.1 10.5a2 2 0 0 1-2 1.7H7.1a2 2 0 0 1-2-1.7L4 7Z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 7V5.6A2.4 2.4 0 0 1 10.4 3.2h3.2A2.4 2.4 0 0 1 16 5.6V7" stroke={stroke} strokeWidth="1.6" />
        </>
      )}
      {kind === "wallet" && (
        <>
          <rect x="3" y="6" width="18" height="13" rx="2.2" stroke={stroke} strokeWidth="1.6" />
          <path d="M3 10h18" stroke={stroke} strokeWidth="1.6" />
          <circle cx="16.5" cy="14.5" r="1.2" fill={stroke} />
        </>
      )}
      {kind === "send" && (
        <path d="M4 12h14M12 6l6 6-6 6" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {kind === "user" && (
        <>
          <circle cx="12" cy="8" r="3" stroke={stroke} strokeWidth="1.6" />
          <path d="M5 19c1-3 3.2-4.6 7-4.6s6 1.6 7 4.6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === "ong" && (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke={stroke} strokeWidth="1.6" />
          <path d="M8 10h8M8 14h5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
