"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";
import { WalletHistoryRow } from "@/components/wallet/wallet-history-row";
import type { WalletActivityItem } from "@/lib/wallet-activity-feed";

export default function WalletHistoryPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [items, setItems] = useState<WalletActivityItem[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(
          "/api/wallet/CDF/activity?page=1&pageSize=30&sort=newest",
          { cache: "no-store" },
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setErr(
            typeof data.error === "string" ? data.error : "failed",
          );
          setItems([]);
          return;
        }
        setItems((data.items as WalletActivityItem[]) ?? []);
      } catch {
        setErr("network");
        setItems([]);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-lg pb-4 pt-2">
      <WalletSubpageHeader
        title={fr ? "Historique" : "History"}
        subtitle={fr ? "Fc · dépôts, retraits, transferts" : "Fc · deposits, withdrawals, transfers"}
        backHref="/app/wallet"
      />

      {err ? (
        <p className="mt-4 text-sm font-semibold text-red-700">
          {fr ? "Impossible de charger l'historique." : "Could not load history."}
        </p>
      ) : null}

      {items === null ? (
        <p className="mt-6 text-sm font-medium text-[#0F2D2F]">…</p>
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#0F2D2F]/12 bg-white p-5">
          <p className="text-sm font-bold text-[#0F2D2F]">
            {fr ? "Aucune opération pour l’instant." : "No activity yet."}
          </p>
          <p className="mt-1 text-sm text-[#0F2D2F]/75">
            {fr
              ? "Les dépôts MoMo, retraits et transferts internes apparaîtront ici."
              : "MoMo deposits, withdrawals and internal transfers will show here."}
          </p>
          <Link
            href="/app/wallet/transfer?asset=CDF"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-extrabold text-[#0F2D2F] underline"
          >
            {fr ? "Faire un transfert" : "Make a transfer"}
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <WalletHistoryRow
              key={item.id}
              item={item}
              locale={locale}
              showAssetBadge={false}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
