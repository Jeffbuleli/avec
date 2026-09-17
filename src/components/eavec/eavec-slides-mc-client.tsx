"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { HackathonSlideFrame } from "@/components/hackathon/hackathon-slide-frame";
import type { HackathonSlide } from "@/lib/hackathon/slides/types";
import { vukafrikEavecJ1Deck } from "@/lib/hackathon/slides/decks/vukafrik-eavec-j1";

type Session = {
  status: "idle" | "live";
  slideIndex: number;
  speakerLabel: string | null;
};

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
        setErr(
          res.status === 401
            ? "Connectez-vous pour piloter le Live."
            : (j as { error?: string }).error ?? "Échec",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- remote keys bind once per mount
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
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-[#071210] px-4 py-5 text-white">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/90">
            e-AVEC · MC
          </p>
          <p className="text-sm font-extrabold">{deck.titleFr}</p>
        </div>
        <Link
          href="/live"
          target="_blank"
          className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold uppercase"
        >
          Ouvrir LIVE
        </Link>
      </header>

      <div className="mt-4 overflow-hidden rounded-2xl bg-white">
        <HackathonSlideFrame slide={slide} compact className="w-full" />
      </div>

      <p className="mt-3 text-center text-xs text-white/55">
        Slide {session.slideIndex + 1} / {deck.slides.length}
        {slide.notes ? (
          <span className="mt-1 block text-left text-[11px] leading-snug text-white/70">
            {slide.notes}
          </span>
        ) : null}
      </p>

      {err ? (
        <p className="mt-2 rounded-xl bg-rose-500/20 px-3 py-2 text-xs text-rose-100">
          {err}
        </p>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void act({ action: "prev" })}
          className="rounded-2xl border border-white/20 py-4 text-sm font-bold active:scale-[0.98] disabled:opacity-40"
        >
          ← Préc.
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void act({ action: "next" })}
          className="rounded-2xl border border-white/20 py-4 text-sm font-bold active:scale-[0.98] disabled:opacity-40"
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
        className={`mt-3 rounded-2xl py-4 text-sm font-black active:scale-[0.98] disabled:opacity-40 ${
          onAir
            ? "bg-amber-400 text-black"
            : "bg-emerald-500 text-black"
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
                ? "bg-emerald-400 text-black"
                : "bg-white/10 text-white/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Link href="/" className="mt-6 text-center text-xs text-white/40 underline">
        ← e-AVEC
      </Link>
    </div>
  );
}
