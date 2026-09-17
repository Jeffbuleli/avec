import { NextResponse } from "next/server";
import { z } from "zod";
import {
  EAVEC_DECK_SLUG,
  getEavecLivePresentation,
  getEavecSlideSession,
  setEavecSlideSession,
} from "@/lib/eavec/slides-runtime";
import { getSessionUserId } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const postSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("go_live"),
    speakerLabel: z.string().max(80).optional(),
  }),
  z.object({ action: z.literal("go_idle") }),
  z.object({
    action: z.literal("set_index"),
    slideIndex: z.number().int().min(0).max(200),
  }),
  z.object({ action: z.literal("next") }),
  z.object({ action: z.literal("prev") }),
]);

/** Public poll for LIVE projector. */
export async function GET() {
  const live = getEavecLivePresentation();
  return NextResponse.json({
    ok: true,
    session: live.session,
    deckSlug: live.session.deckSlug,
    deckTitleFr: live.deckTitleFr,
    slideIndex: live.session.slideIndex,
    total: live.total,
    status: live.session.status,
    slide: live.session.status === "live" ? live.slide : null,
    speakerLabel: live.session.speakerLabel,
    updatedAt: live.session.updatedAt,
  });
}

/** MC remote — requires login. */
export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const cur = getEavecSlideSession();
  const action = parsed.data.action;

  if (action === "go_live") {
    const session = setEavecSlideSession({
      status: "live",
      deckSlug: EAVEC_DECK_SLUG,
      speakerLabel: parsed.data.speakerLabel?.trim() || "Speaker e-AVEC",
    });
    return NextResponse.json({ ok: true, session });
  }
  if (action === "go_idle") {
    const session = setEavecSlideSession({ status: "idle" });
    return NextResponse.json({ ok: true, session });
  }
  if (action === "set_index") {
    const session = setEavecSlideSession({
      slideIndex: parsed.data.slideIndex,
      status: "live",
      deckSlug: EAVEC_DECK_SLUG,
    });
    return NextResponse.json({ ok: true, session });
  }
  if (action === "next") {
    const session = setEavecSlideSession({
      slideIndex: cur.slideIndex + 1,
      status: "live",
      deckSlug: EAVEC_DECK_SLUG,
    });
    return NextResponse.json({ ok: true, session });
  }
  // prev
  const session = setEavecSlideSession({
    slideIndex: cur.slideIndex - 1,
    status: "live",
    deckSlug: EAVEC_DECK_SLUG,
  });
  return NextResponse.json({ ok: true, session });
}
