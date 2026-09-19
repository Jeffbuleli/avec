"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";
import { clientErrorText } from "@/lib/client-error-text";
import { avecCdf } from "@/lib/avec/display-currency";

type RecipientPreview = {
  userId: string;
  displayName: string;
  emailMasked: string;
  email?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function TransferForm() {
  const { t, locale } = useI18n();
  const fr = locale === "fr";
  const router = useRouter();
  const asset = "CDF" as const;

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [fieldErr, setFieldErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<RecipientPreview | null>(null);
  const [done, setDone] = useState(false);
  const [totpCode, setTotpCode] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/wallet/summary", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return;
      const row = (data.lines as { asset?: string; balance?: string | number }[] | undefined)?.find(
        (b) => b.asset === asset,
      );
      setBalance(row?.balance != null ? Number(row.balance) : 0);
    })();
  }, [asset]);

  const amountNum = useMemo(() => {
    const n = Number(String(amount).replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  function validate(): string | null {
    const em = email.trim().toLowerCase();
    if (!em) {
      return fr ? "Saisissez l'e-mail du destinataire." : "Enter the recipient email.";
    }
    if (!EMAIL_RE.test(em)) {
      return t("wallet_transfer_invalid_email");
    }
    if (!amount.trim() || !Number.isFinite(amountNum) || amountNum <= 0) {
      return t("wallet_transfer_invalid_amount");
    }
    if (balance != null && amountNum > balance + 1e-9) {
      return fr
        ? `Solde insuffisant (disponible : ${avecCdf(String(balance))}).`
        : `Insufficient balance (available: ${avecCdf(String(balance))}).`;
    }
    return null;
  }

  const canSubmit = !validate();

  async function openConfirm() {
    const v = validate();
    if (v) {
      setFieldErr(v);
      return;
    }
    setFieldErr(null);
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
    const v = validate();
    if (v) {
      setFieldErr(v);
      return;
    }
    setErr(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        recipientEmail: email.trim(),
        asset,
        amount: String(amountNum),
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
        router.push("/app/wallet/history");
        router.refresh();
      }, 1200);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg pb-4 pt-1 text-[#0F2D2F] sm:max-w-xl md:max-w-2xl">
      <WalletSubpageHeader
        title={fr ? "Envoyer à un utilisateur" : "Send to a user"}
        subtitle={fr ? "Transfert interne e-AVEC · gratuit" : "Internal e-AVEC transfer · free"}
        backHref="/app/wallet"
      />

      {done ? (
        <div className="mt-6 rounded-2xl border border-emerald-600/40 bg-emerald-50 p-5 text-center">
          <p className="text-base font-extrabold text-emerald-900">
            {t("wallet_transfer_success")}
          </p>
          <Link
            href="/app/wallet/history"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-extrabold text-[#0F2D2F] underline"
          >
            {fr ? "Voir l'historique" : "View history"}
          </Link>
        </div>
      ) : preview ? (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-[#0F2D2F]/15 bg-white p-4">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#0F2D2F]/80">
              {t("wallet_transfer_to")}
            </p>
            <p className="mt-1 text-base font-extrabold text-[#0F2D2F]">
              {preview.displayName}
            </p>
            <p className="text-sm font-medium text-[#0F2D2F]/80">
              {preview.email ?? preview.emailMasked}
            </p>
            <p className="mt-3 text-2xl font-black tabular-nums text-[#0F2D2F]">
              {amountNum} Fc
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#0F2D2F]/80">
              {t("wallet_transfer_confirm_hint")}
            </p>
          </div>
          <label className="block">
            <span className="text-xs font-extrabold text-[#0F2D2F]">
              {fr ? "Code 2FA (si activé)" : "2FA code (if enabled)"}
            </span>
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/20 bg-white px-3 py-3 text-sm text-[#0F2D2F]"
              placeholder="000000"
            />
          </label>
          {err ? (
            <p className="text-sm font-bold text-red-700">
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
              className="min-h-[48px] rounded-2xl border border-[#0F2D2F]/25 text-sm font-extrabold text-[#0F2D2F]"
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
            <p className="text-xs font-bold text-[#F6E8CD]/90">
              {t("wallet_transfer_asset")}
            </p>
            <p className="mt-1 text-lg font-extrabold text-[#F6E8CD]">
              Fc
            </p>
            <p className="mt-2 text-sm font-medium text-[#F6E8CD]/90">
              {fr
                ? `Disponible : ${balance == null ? "…" : avecCdf(String(balance))}`
                : `Available: ${balance == null ? "…" : avecCdf(String(balance))}`}
            </p>
            <p className="mt-1 text-xs font-medium text-[#F6E8CD]/85">
              {fr
                ? "Envoi instantané entre comptes e-AVEC. Gratuit."
                : "Instant send between e-AVEC accounts. Free."}
            </p>
          </div>

          <label className="block">
            <span className="text-xs font-extrabold text-[#0F2D2F]">
              {t("wallet_transfer_email")}
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErr(null);
              }}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/20 bg-white px-3 py-3 text-sm font-medium text-[#0F2D2F]"
              placeholder="ami@exemple.com"
            />
          </label>

          <label className="block">
            <span className="text-xs font-extrabold text-[#0F2D2F]">
              {t("wallet_transfer_amount")}
            </span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setFieldErr(null);
              }}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/20 bg-white px-3 py-3 text-sm font-semibold tabular-nums text-[#0F2D2F]"
              placeholder="0"
            />
          </label>

          <label className="block">
            <span className="text-xs font-extrabold text-[#0F2D2F]">
              {fr ? "Note (optionnel)" : "Memo (optional)"}
            </span>
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={120}
              className="mt-1 w-full rounded-xl border border-[#0F2D2F]/20 bg-white px-3 py-3 text-sm text-[#0F2D2F]"
            />
          </label>

          {fieldErr ? (
            <p className="text-sm font-bold text-red-700">{fieldErr}</p>
          ) : null}
          {err ? (
            <p className="text-sm font-bold text-red-700">
              {clientErrorText(t, err)}
            </p>
          ) : null}

          <button
            type="button"
            disabled={loading}
            onClick={() => void openConfirm()}
            className={`flex min-h-[52px] w-full items-center justify-center rounded-2xl text-sm font-extrabold ${
              canSubmit
                ? "bg-[#0F2D2F] text-[#F6E8CD]"
                : "bg-[#0F2D2F]/35 text-white"
            } disabled:opacity-60`}
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
        <div className="p-6 text-sm font-medium text-[#0F2D2F]">…</div>
      }
    >
      <TransferForm />
    </Suspense>
  );
}
