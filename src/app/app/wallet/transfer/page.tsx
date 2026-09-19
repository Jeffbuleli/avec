"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";
import { clientErrorText } from "@/lib/client-error-text";

type RecipientPreview = {
  userId: string;
  displayName: string;
  emailMasked: string;
  email?: string;
};

function TransferForm() {
  const { t, locale } = useI18n();
  const fr = locale === "fr";
  const router = useRouter();
  const sp = useSearchParams();
  const asset = sp.get("asset") === "USD" ? "USD" : "CDF";

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<RecipientPreview | null>(null);
  const [done, setDone] = useState(false);
  const [totpCode, setTotpCode] = useState("");

  const canSubmit =
    email.trim().includes("@") && amount.trim() && Number(amount) > 0;

  async function openConfirm() {
    setErr(null);
    setLoading(true);
    try {
      const qs = new URLSearchParams({ email: email.trim() });
      const res = await fetch(`/api/wallet/transfer/resolve?${qs}`, {
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(
          typeof data.error === "string" ? data.error : "wallet_transfer_failed",
        );
        return;
      }
      setPreview(data.recipient as RecipientPreview);
    } finally {
      setLoading(false);
    }
  }

  async function submit() {
    setErr(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        recipientEmail: email.trim(),
        asset,
        amount,
        memo,
      };
      if (totpCode.trim()) body.totpCode = totpCode.trim();
      const res = await fetch("/api/wallet/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(
          typeof data.error === "string" ? data.error : "wallet_transfer_failed",
        );
        return;
      }
      setDone(true);
      window.setTimeout(() => {
        router.push("/app/wallet");
        router.refresh();
      }, 1400);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg pb-4 pt-2">
      <WalletSubpageHeader
        title={fr ? "Envoyer à un utilisateur" : "Send to a user"}
        subtitle={fr ? "Transfert interne e-AVEC · gratuit" : "Internal e-AVEC transfer · free"}
        backHref="/app/wallet"
      />

      {done ? (
        <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-50 p-5 text-center">
          <p className="text-base font-extrabold text-emerald-800">
            {t("wallet_transfer_success")}
          </p>
          <Link
            href="/app/wallet"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-bold text-[#0F2D2F]"
          >
            {fr ? "Retour Wallet" : "Back to Wallet"}
          </Link>
        </div>
      ) : preview ? (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-[#0F2D2F]/1 bg-white p-4">
            <p className="text-xs font-bold uppercase text-[#0F2D2F]/5">
              {t("wallet_transfer_to")}
            </p>
            <p className="mt-1 text-base font-extrabold text-[#0F2D2F]">
              {preview.displayName}
            </p>
            <p className="text-sm text-[#0F2D2F]/65">
              {preview.email ?? preview.emailMasked}
            </p>
            <p className="mt-3 text-2xl font-black tabular-nums text-[#0F2D2F]">
              {amount} {asset === "CDF" ? "Fc" : asset}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#0F2D2F]/55">
              {t("wallet_transfer_confirm_hint")}
            </p>
          </div>
          <label className="block">
            <span className="text-xs font-bold text-[#0F2D2F]/6">
              {fr ? "Code 2FA (si activé)" : "2FA code (if enabled)"}
            </span>
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/15 bg-white px-3 py-3 text-sm"
              placeholder="000000"
            />
          </label>
          {err ? (
            <p className="text-sm font-semibold text-red-600">
              {clientErrorText(t, err)}
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setErr(null);
              }}
              className="min-h-[48px] rounded-2xl border border-[#0F2D2F]/2 text-sm font-bold"
            >
              {fr ? "Modifier" : "Edit"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => void submit()}
              className="min-h-[48px] rounded-2xl bg-[#0F2D2F] text-sm font-extrabold text-[#F6E8CD] disabled:opacity-60"
            >
              {loading ? "…" : t("wallet_transfer_confirm")}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-[#0F2D2F] p-4 text-[#F6E8CD]">
            <p className="text-xs font-semibold text-[#F6E8CD]/65">
              {t("wallet_transfer_asset")}
            </p>
            <p className="mt-1 text-lg font-extrabold">
              {asset === "CDF" ? "Fc (CDF)" : asset}
            </p>
            <p className="mt-2 text-xs text-[#F6E8CD]/7">
              {fr
                ? "Envoi instantané entre comptes e-AVEC. Gratuit."
                : "Instant send between e-AVEC accounts. Free."}
            </p>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-[#0F2D2F]/6">
              {t("wallet_transfer_email")}
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/15 bg-white px-3 py-3 text-sm"
              placeholder="ami@e-avec.org"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-[#0F2D2F]/6">
              {t("wallet_transfer_amount")}
            </span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/15 bg-white px-3 py-3 text-sm tabular-nums"
              placeholder="0"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-[#0F2D2F]/6">
              {fr ? "Note (optionnel)" : "Memo (optional)"}
            </span>
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={120}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/15 bg-white px-3 py-3 text-sm"
            />
          </label>

          {err ? (
            <p className="text-sm font-semibold text-red-600">
              {clientErrorText(t, err)}
            </p>
          ) : null}

          <button
            type="button"
            disabled={!canSubmit || loading}
            onClick={() => void openConfirm()}
            className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-[#0F2D2F] text-sm font-extrabold text-[#F6E8CD] disabled:opacity-50"
          >
            {loading ? "…" : t("wallet_transfer_review")}
          </button>
        </div>
      )}
    </div>
  );
}

export default function WalletTransferPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm text-[#0F2D2F]/6">…</div>
      }
    >
      <TransferForm />
    </Suspense>
  );
}
