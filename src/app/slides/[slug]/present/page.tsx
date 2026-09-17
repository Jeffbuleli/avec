import { notFound } from "next/navigation";
import { EavecSlideDeckClient } from "@/components/eavec/eavec-slide-deck-client";
import { getHackathonDeck } from "@/lib/hackathon/slides/registry";
import { HK_SLIDES_LIGHT_CLASS } from "@/lib/hackathon/slides-light";

export const dynamic = "force-dynamic";

export default async function EavecSlidePresentPage({
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
      <EavecSlideDeckClient deck={deck} mode="present" />
    </div>
  );
}
