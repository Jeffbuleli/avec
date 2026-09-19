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
      d: fr ? "Groupes & réunions" : "Groups & meetings",
      bg: "bg-[#E8F5E9]",
      icon: "avec" as const,
    },
    {
      href: "/app/marche",
      t: fr ? "Marché" : "Market",
      d: fr ? "Acheter & vendre" : "Buy & sell",
      bg: "bg-[#E3F2FD]",
      icon: "shop" as const,
    },
    {
      href: "/app/wallet",
      t: "Wallet",
      d: fr ? "Fc · transferts" : "Fc · transfers",
      bg: "bg-[#FFF8E1]",
      icon: "wallet" as const,
    },
    {
      href: "/app/wallet/transfer?asset=CDF",
      t: fr ? "Envoyer" : "Send",
      d: fr ? "Transfert interne" : "Internal transfer",
      bg: "bg-[#F3E5F5]",
      icon: "send" as const,
    },
    {
      href: "/app/profile",
      t: "Profile",
      d: fr ? "Compte & sécurité" : "Account & security",
      bg: "bg-[#E0F7FA]",
      icon: "user" as const,
    },
    {
      href: "/app/facilitateur",
      t: fr ? "ONG" : "NGO",
      d: fr ? "Facilitateur" : "Facilitator",
      bg: "bg-[#FCE4EC]",
      icon: "ong" as const,
    },
  ];

  return (
    <div className="home-theme space-y-4 pb-2 pt-1">
      <header className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src={BRAND_LOGO_MARK_256}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-2xl object-contain"
            unoptimized
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#0F2D2F]">
              {greeting(fr, hour)},{" "}
              <span className="truncate">{displayName}</span>
            </p>
            <p className="text-xs text-[#0F2D2F]/55">e-AVEC</p>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-[1.75rem] bg-[#0F2D2F] p-5 text-[#F6E8CD] shadow-[0_16px_40px_-18px_rgba(15,45,47,0.55)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#F6E8CD]/70">
              {fr ? "Solde Wallet" : "Wallet balance"}
            </p>
            <p className="mt-2 text-3xl font-black tabular-nums tracking-tight">
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
            className="rounded-full bg-white/10 p-2"
            aria-label={hidden ? "Show" : "Hide"}
          >
            <EyeIcon crossed={hidden} />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href="/app/wallet/fiat/deposit?asset=CDF"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-[#F6E8CD] text-sm font-extrabold text-[#0F2D2F]"
          >
            <ArrowDownIcon />
            {fr ? "Dépôt" : "Deposit"}
          </Link>
          <Link
            href="/app/wallet/transfer?asset=CDF"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-[#C9A227]/25 text-sm font-extrabold text-[#F6E8CD] ring-1 ring-[#C9A227]/45"
          >
            <SendIcon />
            {fr ? "Envoyer" : "Send"}
          </Link>
        </div>
      </section>

      <Link
        href="/app/wallet/groups"
        className="flex items-center gap-3 rounded-2xl border border-[#0F2D2F]/08 bg-[#E8F5E9] px-4 py-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
          <ServiceIcon kind="avec" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-[#0F2D2F]">AVEC</p>
          <p className="text-xs text-[#0F2D2F]/6">
            {fr
              ? "Réunion, parts, caisse, Passport"
              : "Meeting, shares, treasury, Passport"}
          </p>
        </div>
        <span className="rounded-full bg-[#0F2D2F] px-3 py-1.5 text-xs font-bold text-[#F6E8CD]">
          {fr ? "Ouvrir" : "Open"}
        </span>
      </Link>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-[#0F2D2F]">
            {fr ? "Services" : "Services"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.href + s.t}
              href={s.href}
              className={`rounded-2xl ${s.bg} p-4 transition active:scale-[0.98]`}
            >
              <ServiceIcon kind={s.icon} />
              <p className="mt-3 text-sm font-extrabold text-[#0F2D2F]">{s.t}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#0F2D2F]/55">
                {s.d}
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
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
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
