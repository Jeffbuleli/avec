"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { HackathonSlide } from "@/lib/hackathon/slides/types";
import { vukafrikEavecJ1Deck } from "@/lib/hackathon/slides/decks/vukafrik-eavec-j1";

type Session = {
  status: "idle" | "live";
  slideIndex: number;
  speakerLabel: string | null;
};

/** Télécommande uniquement — le contenu immersif est sur /live. */
export function EavecSlidesMcClient({
  initialLoggedIn,
}: {
  initialLoggedIn: boolean;
}) {
  const deck = vukafrikEavecJ1Deck;
  const [session, setSession] = useState<Session>({
    status: "idle",
    slideIndex: 0,
    speakerLabel: null,
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const slide: HackathonSlide = deck.slides[
    Math.min(session.slideIndex, deck.slides.length - 1)
  ]!;

  const refresh = useCallback(async () => {
    const res = await fetch("/api/slides", { cache: "no-store" });
    const j = await res.json();
    setSession({
      status: j.status ?? "idle",
      slideIndex: j.slideIndex ?? 0,
      speakerLabel: j.speakerLabel ?? null,
    });
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => void refresh(), 2500);
    return () => window.clearInterval(id);
  }, [refresh]);

  async function act(body: Record<string, unknown>) {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          (j as { error?: string; message?: string }).error ||
          (j as { message?: string }).message;
        setErr(
          res.status === 401
            ? "Connectez-vous pour piloter le Live."
            : res.status === 404
              ? "API slides indisponible (redeploy)."
              : msg || `Échec (${res.status})`,
        );
        return;
      }
      if (j.session) {
        setSession({
          status: j.session.status,
          slideIndex: j.session.slideIndex,
          speakerLabel: j.session.speakerLabel,
        });
      } else {
        await refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        void act({ action: "next" });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        void act({ action: "prev" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialLoggedIn) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          MC · Télécommande
        </p>
        <h1 className="mt-3 text-2xl font-black">Connexion requise</h1>
        <p className="mt-2 text-sm text-[color:var(--fd-muted)]">
          Seul le speaker connecté pilote le projecteur LIVE.
        </p>
        <Link
          href={`/login?next=${encodeURIComponent("/mc")}`}
          className="mt-6 rounded-2xl bg-[color:var(--fd-primary)] px-4 py-3 text-sm font-bold text-white"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  const onAir = session.status === "live";

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-[#0F2D2F] px-4 py-5 text-[#F6E8CD]">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            Télécommande
          </p>
          <p className="text-sm font-extrabold text-[#F6E8CD]">e-AVEC · MC</p>
        </div>
        <Link
          href="/live"
          target="_blank"
          className="rounded-full border border-[#C9A227]/40 px-3 py-1.5 text-[10px] font-bold uppercase text-[#C9A227]"
        >
          Ouvrir LIVE
        </Link>
      </header>

      <div className="mt-6 rounded-2xl border border-[#F6E8CD]/15 bg-black/25 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A227]/90">
          Slide {session.slideIndex + 1} / {deck.slides.length}
        </p>
        <p className="mt-2 text-lg font-black leading-snug text-[#F6E8CD]">
          {slide.title}
        </p>
        {slide.eyebrow ? (
          <p className="mt-1 text-xs font-semibold text-[#F6E8CD]/55">
            {slide.eyebrow}
          </p>
        ) : null}
        {slide.notes ? (
          <p className="mt-3 border-t border-[#F6E8CD]/10 pt-3 text-[12px] leading-relaxed text-[#F6E8CD]/75">
            {slide.notes}
          </p>
        ) : null}
      </div>

      {err ? (
        <p className="mt-3 rounded-xl bg-rose-500/20 px-3 py-2 text-xs text-rose-100">
          {err}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void act({ action: "prev" })}
          className="rounded-2xl border border-[#F6E8CD]/25 py-4 text-sm font-bold active:scale-[0.98] disabled:opacity-40"
        >
          ← Préc.
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void act({ action: "next" })}
          className="rounded-2xl border border-[#F6E8CD]/25 py-4 text-sm font-bold active:scale-[0.98] disabled:opacity-40"
        >
          Suiv. →
        </button>
      </div>

      <button
        type="button"
        disabled={busy}
        onClick={() =>
          void act(
            onAir
              ? { action: "go_idle" }
              : { action: "go_live", speakerLabel: "e-AVEC" },
          )
        }
        className={`mt-3 rounded-2xl py-4 text-sm font-black text-[#0F2D2F] active:scale-[0.98] disabled:opacity-40 ${
          onAir ? "bg-[#E8C96A]" : "bg-[#C9A227]"
        }`}
      >
        {onAir ? "Couper On Air" : "Passer On Air"}
      </button>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {deck.slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            disabled={busy}
            onClick={() => void act({ action: "set_index", slideIndex: i })}
            className={`h-9 min-w-9 rounded-lg px-2 text-[11px] font-bold ${
              i === session.slideIndex
                ? "bg-[#C9A227] text-[#0F2D2F]"
                : "bg-[#F6E8CD]/10 text-[#F6E8CD]/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Link href="/" className="mt-8 text-center text-xs text-[#F6E8CD]/40 underline">
        ← e-AVEC
      </Link>
    </div>
  );
}
