import Link from "next/link";
import { listHackathonDecks } from "@/lib/hackathon/slides/registry";
import { HK_SLIDES_LIGHT_CLASS } from "@/lib/hackathon/slides-light";

export const dynamic = "force-dynamic";

export default function EavecSlidesHubPage() {
  const decks = listHackathonDecks().filter((d) => d.slug.startsWith("vukafrik"));

  return (
    <div
      className={`hackathon-theme ${HK_SLIDES_LIGHT_CLASS} min-h-dvh bg-[var(--hk-page,#fafaf8)] text-[var(--hk-text,#222)]`}
      data-hk-theme="light"
    >
      <main className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--hk-accent,#1f6b43)]">
          e-AVEC · Slides
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Présentation VUK’AFRIK
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--hk-muted,#8a8a8a)]">
          Jour 1 théorique — format slides (modèle Silikin). Démo pratique ={" "}
          <Link href="/" className="font-semibold text-[color:var(--hk-accent,#1f6b43)] underline">
            e-avec.org
          </Link>{" "}
          en production.
        </p>

        <ul className="mt-8 space-y-3">
          {decks.map((deck) => (
            <li
              key={deck.slug}
              className="rounded-2xl border border-[color:var(--hk-border,#e5e5e0)] bg-white p-4 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--hk-muted,#8a8a8a)]">
                {deck.moduleLabelFr} · ~{deck.estimatedMinutes} min
              </p>
              <h2 className="mt-1 text-lg font-extrabold">{deck.titleFr}</h2>
              <p className="mt-1 text-sm text-[color:var(--hk-muted,#8a8a8a)]">
                {deck.descriptionFr}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/slides/${deck.slug}/present`}
                  className="rounded-full bg-[color:var(--hk-accent,#1f6b43)] px-4 py-2 text-xs font-bold text-white"
                >
                  Présenter
                </Link>
                <Link
                  href={`/slides/${deck.slug}`}
                  className="rounded-full border border-[color:var(--hk-border,#e5e5e0)] px-4 py-2 text-xs font-bold"
                >
                  Préparer + notes
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {decks.length === 0 ? (
          <p className="mt-6 text-sm text-[color:var(--hk-muted,#8a8a8a)]">
            Aucun deck VUK’AFRIK enregistré.
          </p>
        ) : null}
      </main>
    </div>
  );
}
