"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";
import { useOfflineState } from "@/components/offline/offline-provider";
import {
  EAVEC_PRIMARY_CURRENCY,
  EAVEC_SECONDARY_CURRENCY,
  eavecDisplayAsset,
} from "@/lib/eavec-currency";
import { BRAND_LOGO_MARK_256 } from "@/lib/brand-logo";

type WalletSummary = {
  lines?: { asset?: string; balance?: string | number }[];
};

function formatBalance(asset: string, balance: string, locale: "fr" | "en") {
  const n = Number(balance);
  if (!Number.isFinite(n)) return balance;
  const loc = locale === "fr" ? "fr-FR" : "en-US";
  if (asset === "CDF") {
    return `${Math.round(n).toLocaleString(loc)} ${EAVEC_SECONDARY_CURRENCY}`;
  }
  return `${n.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${EAVEC_PRIMARY_CURRENCY}`;
}

export function EavecWalletFundPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const { queueCount, failedCount, online, lastSyncAt, syncNow } = useOfflineState();
  const [usd, setUsd] = useState<string | null>(null);
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
      const usdRow = data.lines?.find(
        (b) => eavecDisplayAsset(b.asset ?? "") === EAVEC_PRIMARY_CURRENCY,
      );
      const cdfRow = data.lines?.find((b) => b.asset === EAVEC_SECONDARY_CURRENCY);
      setUsd(
        usdRow?.balance != null
          ? String(usdRow.balance)
          : data.lines?.find((b) => b.asset === "USDT")?.balance != null
            ? String(data.lines!.find((b) => b.asset === "USDT")!.balance)
            : "0",
      );
      setCdf(cdfRow?.balance != null ? String(cdfRow.balance) : "0");
    })();
  }, []);

  return (
    <div className="mx-auto max-w-lg pb-4 pt-2">
      <div className="flex items-center gap-3">
        <Image
          src={BRAND_LOGO_MARK_256}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          unoptimized
        />
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#C9A227]">
            e-AVEC
          </p>
          <h1 className="text-xl font-black text-[#0F2D2F]">
            {fr ? "Caisse personnelle" : "Personal wallet"}
          </h1>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#0F2D2F]/70">
        {fr
          ? "Dépôt et retrait via Mobile Money (Orange, M-Pesa, Airtel). Les parts AVEC sont débitées de votre solde USD."
          : "Deposit and withdraw via Mobile Money (Orange, M-Pesa, Airtel). AVEC shares are debited from your USD balance."}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-[#0F2D2F] p-5 text-[#F6E8CD]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#F6E8CD]/60">
            {EAVEC_PRIMARY_CURRENCY}
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums">
            {err ? "—" : usd != null ? formatBalance("USD", usd, locale) : "…"}
          </p>
        </div>
        <div className="rounded-3xl border border-[#0F2D2F]/15 bg-[#F6E8CD]/40 p-5 text-[#0F2D2F]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0F2D2F]/50">
            {EAVEC_SECONDARY_CURRENCY}
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums">
            {err ? "—" : cdf != null ? formatBalance("CDF", cdf, locale) : "…"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="/app/wallet/fiat/deposit?asset=USD"
          className="flex min-h-[52px] items-center justify-center rounded-2xl bg-[#0F2D2F] px-5 text-sm font-extrabold text-[#F6E8CD]"
        >
          {fr ? "Dépôt Mobile Money" : "Mobile Money deposit"}
        </Link>
        <Link
          href="/app/wallet/fiat/withdraw?asset=USD"
          className="flex min-h-[52px] items-center justify-center rounded-2xl border border-[#0F2D2F]/20 px-5 text-sm font-bold text-[#0F2D2F]"
        >
          {fr ? "Retrait Mobile Money" : "Mobile Money withdraw"}
        </Link>
      </div>

      <Link
        href="/app/wallet/groups"
        className="mt-3 flex min-h-[48px] items-center justify-center rounded-2xl border border-[#0F2D2F]/20 px-5 text-sm font-bold text-[#0F2D2F]"
      >
        {fr ? "Retour aux AVEC" : "Back to AVEC groups"}
      </Link>

      <div className="mt-4 rounded-2xl border border-[#0F2D2F]/10 bg-white/70 p-4 text-sm text-[#0F2D2F]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F2D2F]/55">
          Sync terrain
        </p>
        <p className="mt-1 font-semibold">
          {online
            ? `${queueCount} action(s) en attente`
            : "Mode offline actif - vos actions sont gardees localement"}
        </p>
        <p className="mt-1 text-xs text-[#0F2D2F]/65">
          {failedCount > 0
            ? `${failedCount} action(s) demandent une verification`
            : lastSyncAt
              ? `Derniere sync: ${new Date(lastSyncAt).toLocaleString(fr ? "fr-FR" : "en-US")}`
              : "Aucune synchronisation complete pour le moment"}
        </p>
        {online ? (
          <button
            type="button"
            onClick={() => void syncNow()}
            className="mt-3 rounded-xl bg-[#0F2D2F] px-3 py-2 text-xs font-bold text-[#F6E8CD]"
          >
            {fr ? "Synchroniser maintenant" : "Sync now"}
          </button>
        ) : null}
      </div>

      <McBuleliPoweredFooter />
    </div>
  );
}
