import { notFound } from "next/navigation";
import Link from "next/link";
import { EavecSlideDeckClient } from "@/components/eavec/eavec-slide-deck-client";
import { getHackathonDeck } from "@/lib/hackathon/slides/registry";
import { HK_SLIDES_LIGHT_CLASS } from "@/lib/hackathon/slides-light";

export const dynamic = "force-dynamic";

export default async function EavecSlidePreparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = getHackathonDeck(slug);
  if (!deck || !deck.slug.startsWith("vukafrik")) notFound();

  return (
    <div
      className={`hackathon-theme ${HK_SLIDES_LIGHT_CLASS} min-h-dvh`}
      data-hk-theme="light"
    >
      <div className="border-b border-[color:var(--hk-border,#e5e5e0)] px-4 py-3">
        <Link href="/slides" className="text-xs font-bold text-[color:var(--hk-accent,#1f6b43)]">
          ← Hub slides
        </Link>
        <h1 className="mt-1 text-xl font-black tracking-tight">{deck.titleFr}</h1>
        <p className="mt-1 max-w-2xl text-sm text-[color:var(--hk-muted,#8a8a8a)]">
          {deck.descriptionFr}
        </p>
      </div>
      <EavecSlideDeckClient deck={deck} mode="prepare" />
    </div>
  );
}
