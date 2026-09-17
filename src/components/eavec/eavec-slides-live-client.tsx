"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HackathonSlideFrame } from "@/components/hackathon/hackathon-slide-frame";
import type { HackathonSlide } from "@/lib/hackathon/slides/types";
import { HK_SLIDES_LIGHT_CLASS } from "@/lib/hackathon/slides-light";

type LivePayload = {
  status: "idle" | "live";
  slide: HackathonSlide | null;
  slideIndex: number;
  total: number;
  deckTitleFr: string;
  speakerLabel: string | null;
  updatedAt: string;
};

export function EavecSlidesLiveClient() {
  const [data, setData] = useState<LivePayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch("/api/slides", { cache: "no-store" });
        const j = (await res.json()) as LivePayload & { ok?: boolean };
        if (!cancelled) setData(j);
      } catch {
        /* keep last frame */
      }
    }
    void poll();
    const id = window.setInterval(() => void poll(), 1200);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const live = data?.status === "live" && data.slide;

  return (
    <div
      className={`hackathon-theme ${HK_SLIDES_LIGHT_CLASS} flex min-h-dvh flex-col bg-[var(--hk-page,#0c1210)] text-white`}
      data-hk-theme="light"
    >
      <header className="flex items-center justify-between gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
        <span>e-AVEC · LIVE</span>
        <span className={live ? "text-emerald-400" : "text-amber-300"}>
          {live ? "On Air" : "En attente MC"}
        </span>
        <Link href="/" className="normal-case tracking-normal text-white/40 underline">
          e-AVEC
        </Link>
      </header>

      <main className="flex flex-1 flex-col px-3 pb-4 sm:px-6">
        {live && data.slide ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={data.slide.id}
                initial={{ opacity: 0.4, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-1"
              >
                <HackathonSlideFrame
                  slide={data.slide}
                  className="min-h-[78dvh] w-full flex-1"
                />
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-center text-xs text-white/45">
              {data.deckTitleFr} · {data.slideIndex + 1}/{data.total}
              {data.speakerLabel ? ` · ${data.speakerLabel}` : ""}
            </p>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400/90">
              Projecteur
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              En attente de la télécommande
            </h1>
            <p className="mt-3 max-w-md text-sm text-white/60">
              Ouvrez <span className="font-semibold text-white">/mc</span> sur le
              téléphone du speaker, puis appuyez sur <strong>Passer On Air</strong>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
