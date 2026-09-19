"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";
import { avecCdf } from "@/lib/avec/display-currency";
import { BRAND_LOGO_MARK_256 } from "@/lib/brand-logo";

type WalletSummary = {
  lines?: { asset?: string; balance?: string | number }[];
};

export function EavecWalletFundPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [cdf, setCdf] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/wallet/summary", { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as WalletSummary & {
        error?: string;
      };
      if (!res.ok) {
        setErr(data.error ?? "wallet_not_found");
        return;
      }
      const cdfRow = data.lines?.find((b) => b.asset === "CDF");
      setCdf(cdfRow?.balance != null ? String(cdfRow.balance) : "0");
    })();
  }, []);

  return (
    <div className="mx-auto max-w-lg pb-4 pt-2">
      <WalletSubpageHeader
        title="Wallet"
        subtitle={fr ? "Fc · Mobile Money · transferts" : "Fc · Mobile Money · transfers"}
        backHref="/app/home"
      />

      <div className="mt-1 flex items-center gap-3 px-0.5">
        <Image
          src={BRAND_LOGO_MARK_256}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          unoptimized
        />
        <p className="text-sm leading-relaxed text-[#0F2D2F]/70">
          {fr
            ? "Dépôt, retrait et envoi entre utilisateurs e-AVEC. Le Marché utilise ce solde."
            : "Deposit, withdraw and send between e-AVEC users. Market uses this balance."}
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.75rem] bg-[#0F2D2F] p-5 text-[#F6E8CD]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F6E8CD]/90">
              {fr ? "Solde Fc" : "Fc balance"}
            </p>
            <p className="mt-2 text-3xl font-black tabular-nums text-[#F6E8CD]">
              {err
                ? "-"
                : hidden
                  ? "••••"
                  : cdf != null
                    ? avecCdf(cdf)
                    : "…"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHidden((v) => !v)}
            className="rounded-full bg-white/15 p-2"
            aria-label="Toggle"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                stroke="#F6E8CD"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="12" r="2.5" stroke="#F6E8CD" strokeWidth="1.7" />
            </svg>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href="/app/wallet/fiat/deposit?asset=CDF"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#F6E8CD] text-sm font-extrabold text-[#0F2D2F]"
          >
            {fr ? "Dépôt" : "Deposit"}
          </Link>
          <Link
            href="/app/wallet/fiat/withdraw?asset=CDF"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#E8C96A] text-sm font-extrabold text-[#0F2D2F]"
          >
            {fr ? "Retrait" : "Withdraw"}
          </Link>
        </div>
      </div>

      <Link
        href="/app/wallet/transfer?asset=CDF"
        className="mt-4 flex items-center gap-3 rounded-2xl border border-[#0F2D2F]/15 bg-[#E8F5E9] px-4 py-4"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12h14M12 6l6 6-6 6"
              stroke="#0F2D2F"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-[#0F2D2F]">
            {fr ? "Envoyer à un utilisateur" : "Send to a user"}
          </p>
          <p className="text-xs font-medium text-[#0F2D2F]/75">
            {fr
              ? "Transfert interne instantané · gratuit"
              : "Instant internal transfer · free"}
          </p>
        </div>
      </Link>

      <Link
        href="/app/wallet/history"
        className="mt-3 flex min-h-[48px] items-center justify-between rounded-2xl border border-[#0F2D2F]/15 bg-white px-4 py-3"
      >
        <span className="text-sm font-extrabold text-[#0F2D2F]">
          {fr ? "Historique" : "History"}
        </span>
        <span className="text-xs font-bold text-[#0F2D2F]/70">→</span>
      </Link>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link
          href="/app/marche"
          className="rounded-2xl border border-[#0F2D2F]/15 bg-white px-4 py-3 text-sm font-extrabold text-[#0F2D2F]"
        >
          {fr ? "Marché" : "Market"}
        </Link>
        <Link
          href="/app/wallet/groups"
          className="rounded-2xl border border-[#0F2D2F]/15 bg-white px-4 py-3 text-sm font-extrabold text-[#0F2D2F]"
        >
          AVEC
        </Link>
      </div>

      <McBuleliPoweredFooter />
    </div>
  );
}
