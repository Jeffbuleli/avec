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
        title={fr ? "Caisse personnelle" : "Personal wallet"}
        subtitle={fr ? "Fc · Mobile Money" : "Fc · Mobile Money"}
        backHref="/app/wallet/groups"
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
            ? "Dépôt et retrait en francs congolais via Mobile Money. Le Marché utilise ce solde."
            : "Deposit and withdraw Congolese francs via Mobile Money. Market uses this balance."}
        </p>
      </div>

      <div className="mt-5 rounded-3xl bg-[#0F2D2F] p-5 text-[#F6E8CD]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#F6E8CD]/60">
          Fc
        </p>
        <p className="mt-2 text-3xl font-black tabular-nums">
          {err ? "-" : cdf != null ? avecCdf(cdf) : "…"}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="/app/wallet/fiat/deposit?asset=CDF"
          className="flex min-h-[52px] items-center justify-center rounded-2xl bg-[#0F2D2F] px-5 text-sm font-extrabold text-[#F6E8CD]"
        >
          {fr ? "Dépôt Mobile Money" : "Mobile Money deposit"}
        </Link>
        <Link
          href="/app/wallet/fiat/withdraw?asset=CDF"
          className="flex min-h-[52px] items-center justify-center rounded-2xl border border-[#0F2D2F]/20 px-5 text-sm font-bold text-[#0F2D2F]"
        >
          {fr ? "Retrait Mobile Money" : "Mobile Money withdraw"}
        </Link>
      </div>

      <McBuleliPoweredFooter />
    </div>
  );
}
