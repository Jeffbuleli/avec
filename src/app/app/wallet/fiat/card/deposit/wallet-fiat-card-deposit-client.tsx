"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { FIAT_FEE_RATE } from "@/lib/wallet-fees";
import { clientErrorText } from "@/lib/client-error-text";
import { FiatStepper } from "@/components/wallet/fiat-stepper";
import { IconBankCard } from "@/components/wallet/fiat-icons";
import { WalletAssetIcon } from "@/components/wallet/wallet-asset-icon";
import {
  WalletErrorBanner,
  WalletFieldLabel,
  WalletFormCard,
  WalletStatusBanner,
  walletInputClass,
  walletPrimaryBtnClass,
} from "@/components/wallet/wallet-form";

const STEPS = [
  { id: "amount", label: "Montant" },
  { id: "confirm", label: "OK" },
] as const;

export default function WalletFiatCardDepositClient({ fiatPaused = false }: { fiatPaused?: boolean }) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [asset] = useState<"CDF">("CDF");
  const [gross, setGross] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pct = Math.round(FIAT_FEE_RATE * 1000) / 10;
  const summary = useMemo(() => {
    const g = Number(gross);
    if (!Number.isFinite(g) || g <= 0) return null;
    const fee = g * FIAT_FEE_RATE;
    const net = g - fee;
    if (net <= 0) return null;
    return { fee, net, g };
  }, [gross]);

  async function submit() {
    if (fiatPaused || !summary) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/wallet/fiat/card/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asset, grossAmount: gross }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setErr(typeof data.error === "string" ? data.error : "wallet_fiat_deposit_failed");
        return;
      }
      if (typeof data.checkoutUrl === "string") {
        window.location.href = data.checkoutUrl;
        return;
      }
      if (typeof data.depositId === "string") {
        router.push(`/app/wallet/fiat/status/${encodeURIComponent(data.depositId)}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const locked = fiatPaused;
  const loc = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <WalletFormCard>
      <div className="mb-3 flex items-center gap-2 text-[color:var(--fd-brown)]">
        <IconBankCard />
        <span className="text-xs font-bold uppercase tracking-wide">{t("wallet_fiat_rail_card")}</span>
      </div>

      <FiatStepper
        steps={STEPS.map((s, i) => ({
          id: s.id,
          label: locale === "fr" ? s.label : ["Amount", "Confirm"][i]!,
        }))}
        current={step}
      />

      {fiatPaused ? <WalletStatusBanner tone="warn">{t("wallet_fiat_paused_hint")}</WalletStatusBanner> : null}

      {step === 0 ? (
        <>
          <WalletFieldLabel label={t("wallet_transfer_asset")}>
            <div className="mb-1 flex items-center gap-2 rounded-xl border border-[color:var(--fd-primary)] bg-[color:var(--fd-mint)] px-3 py-2.5">
              <WalletAssetIcon asset="CDF" size={24} />
              <span className="text-sm font-extrabold text-[color:var(--fd-text)]">
                Fc
              </span>
              <span className="text-xs font-semibold text-[color:var(--fd-muted)]">
                (CDF)
              </span>
            </div>
          </WalletFieldLabel>
          <WalletFieldLabel label={t("wallet_fiat_gross")}>
            <input
              value={gross}
              onChange={(e) => setGross(e.target.value)}
              inputMode="numeric"
              disabled={locked}
              placeholder="0"
              className={`${walletInputClass} text-lg font-bold tabular-nums disabled:opacity-60`}
            />
          </WalletFieldLabel>
          {summary ? (
            <WalletStatusBanner tone="info">
              {t("wallet_fiat_net")}: {summary.net.toLocaleString(loc)} Fc · {t("wallet_fiat_fee", { pct })}
            </WalletStatusBanner>
          ) : null}
          <p className="text-[10px] text-[color:var(--fd-muted)]">{t("wallet_fiat_card_checkout_hint")}</p>
          <button type="button" className={walletPrimaryBtnClass} disabled={locked || !summary} onClick={() => setStep(1)}>
            →
          </button>
        </>
      ) : null}

      {step === 1 && summary ? (
        <>
          <WalletStatusBanner tone="success">
            <p className="font-bold tabular-nums">
              {summary.g.toLocaleString(loc)} Fc
            </p>
            <p className="text-[11px] opacity-90">Visa · Mastercard</p>
          </WalletStatusBanner>
          <p className="text-xs text-[color:var(--fd-muted)]">{t("wallet_fiat_card_checkout_hint")}</p>
          {err ? <WalletErrorBanner>{clientErrorText(t, err)}</WalletErrorBanner> : null}
          <div className="flex gap-2">
            <button type="button" className={walletPrimaryBtnClass} onClick={() => setStep(0)}>
              ←
            </button>
            <button type="button" className={walletPrimaryBtnClass} disabled={loading} onClick={() => void submit()}>
              {loading ? "…" : t("wallet_fiat_card_pay")}
            </button>
          </div>
        </>
      ) : null}
    </WalletFormCard>
  );
}
