"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getMcbuleliWalletUrl } from "@/lib/app-url";
import { BRAND_LOGO_MARK_256 } from "@/lib/brand-logo";

type WalletSummary = {
  lines?: { asset?: string; balance?: string | number }[];
};

export function EavecWalletFundPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [usdt, setUsdt] = useState<string | null>(null);
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
      const row = data.lines?.find((b) => b.asset === "USDT");
      setUsdt(row?.balance != null ? String(row.balance) : "0");
    })();
  }, []);

  return (
    <div className="mx-auto max-w-lg pb-8 pt-2">
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

      <div className="mt-6 rounded-3xl bg-[#0F2D2F] p-6 text-[#F6E8CD]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#F6E8CD]/60">
          USDT
        </p>
        <p className="mt-2 text-4xl font-black tabular-nums">
          {err ? "—" : usdt ?? "…"}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#F6E8CD]/75">
          {fr
            ? "Les parts AVEC sont débitées de ce solde. Déposez ou retirez sur McBuleli — même compte, même base."
            : "AVEC shares are debited from this balance. Deposit or withdraw on McBuleli — same account, same database."}
        </p>
      </div>

      <a
        href={getMcbuleliWalletUrl()}
        className="mt-5 flex min-h-[52px] items-center justify-center rounded-2xl bg-[#0F2D2F] px-5 text-sm font-extrabold text-[#F6E8CD]"
      >
        {fr ? "Alimenter / retirer sur McBuleli" : "Fund / withdraw on McBuleli"}
      </a>
      <a
        href="/app/wallet/groups"
        className="mt-3 flex min-h-[48px] items-center justify-center rounded-2xl border border-[#0F2D2F]/20 px-5 text-sm font-bold text-[#0F2D2F]"
      >
        {fr ? "Retour aux AVEC" : "Back to AVEC groups"}
      </a>
    </div>
  );
}
