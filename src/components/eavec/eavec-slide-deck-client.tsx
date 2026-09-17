"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { HackathonDeck } from "@/lib/hackathon/slides/types";
import { HackathonSlideFrame } from "@/components/hackathon/hackathon-slide-frame";

/**
 * Lightweight presenter for e-avec.org — Silikin-style UX, no McBuleli Live/On Air.
 */
export function EavecSlideDeckClient({
  deck,
  mode,
}: {
  deck: HackathonDeck;
  mode: "prepare" | "present";
}) {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(mode === "prepare");
  const slide = deck.slides[index]!;
  const total = deck.slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, total - 1)));
    },
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      } else if (e.key === "n" || e.key === "N") {
        setShowNotes((v) => !v);
      } else if (e.key === "f" || e.key === "F") {
        const el = document.documentElement;
        if (!document.fullscreenElement) void el.requestFullscreen?.();
        else void document.exitFullscreen?.();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, total]);

  return (
    <div className="flex min-h-dvh flex-col">
      {mode === "prepare" ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--hk-border,#e5e5e0)] px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--hk-muted,#8a8a8a)]">
              e-AVEC · Slides
            </p>
            <p className="truncate text-sm font-extrabold text-[color:var(--hk-text,#222)]">
              {deck.titleFr}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/slides/${deck.slug}/present`}
              className="rounded-full bg-[color:var(--hk-accent,#1f6b43)] px-4 py-2 text-xs font-bold text-white"
            >
              Présenter
            </Link>
            <Link
              href="/slides"
              className="rounded-full border border-[color:var(--hk-border,#e5e5e0)] px-4 py-2 text-xs font-bold"
            >
              Hub
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[color:var(--hk-muted,#8a8a8a)]">
          <span>
            {index + 1} / {total}
          </span>
          <span>← → · F plein écran · N notes</span>
          <Link href={`/slides/${deck.slug}`} className="underline">
            Quitter
          </Link>
        </div>
      )}

      <div className="relative flex flex-1 flex-col px-3 pb-4 pt-2 sm:px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex flex-1"
          >
            <HackathonSlideFrame
              slide={slide}
              className="min-h-[70dvh] w-full flex-1"
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="rounded-xl border border-[color:var(--hk-border,#e5e5e0)] px-4 py-2 text-xs font-bold disabled:opacity-40"
          >
            ← Préc.
          </button>
          <div className="flex gap-1">
            {deck.slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full ${
                  i === index
                    ? "bg-[color:var(--hk-accent,#1f6b43)]"
                    : "bg-[color:var(--hk-border,#e5e5e0)]"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index >= total - 1}
            className="rounded-xl bg-[color:var(--hk-accent,#1f6b43)] px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
          >
            Suiv. →
          </button>
        </div>

        {showNotes && slide.notes ? (
          <p className="mt-3 rounded-xl border border-dashed border-[color:var(--hk-border,#e5e5e0)] bg-white/80 px-3 py-2 text-xs leading-relaxed text-[color:var(--hk-muted,#8a8a8a)]">
            <span className="font-bold text-[color:var(--hk-text,#222)]">Notes · </span>
            {slide.notes}
          </p>
        ) : null}
      </div>
    </div>
  );
}
