import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getHackathonDeck } from "@/lib/hackathon/slides/registry";
import type { HackathonSlide } from "@/lib/hackathon/slides/types";

export const EAVEC_DECK_SLUG = "vukafrik-eavec-j1";

export type EavecSlideSession = {
  deckSlug: string;
  slideIndex: number;
  status: "idle" | "live";
  speakerLabel: string | null;
  updatedAt: string;
};

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "eavec-slides-session.json");

const g = globalThis as unknown as {
  __eavecSlideSession?: EavecSlideSession;
};

function defaultSession(): EavecSlideSession {
  return {
    deckSlug: EAVEC_DECK_SLUG,
    slideIndex: 0,
    status: "idle",
    speakerLabel: null,
    updatedAt: new Date().toISOString(),
  };
}

function readDisk(): EavecSlideSession | null {
  try {
    if (!existsSync(STORE_FILE)) return null;
    const raw = JSON.parse(readFileSync(STORE_FILE, "utf8")) as EavecSlideSession;
    if (!raw || typeof raw.slideIndex !== "number") return null;
    return raw;
  } catch {
    return null;
  }
}

function writeDisk(session: EavecSlideSession) {
  try {
    if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
    writeFileSync(STORE_FILE, JSON.stringify(session, null, 2), "utf8");
  } catch {
    // Single-node memory still works if disk is read-only.
  }
}

export function getEavecSlideSession(): EavecSlideSession {
  if (g.__eavecSlideSession) return g.__eavecSlideSession;
  const disk = readDisk();
  const session = disk ?? defaultSession();
  g.__eavecSlideSession = session;
  return session;
}

export function setEavecSlideSession(
  patch: Partial<EavecSlideSession>,
): EavecSlideSession {
  const prev = getEavecSlideSession();
  const deck = getHackathonDeck(patch.deckSlug ?? prev.deckSlug) ?? getHackathonDeck(EAVEC_DECK_SLUG);
  const max = Math.max(0, (deck?.slides.length ?? 1) - 1);
  const next: EavecSlideSession = {
    deckSlug: deck?.slug ?? EAVEC_DECK_SLUG,
    slideIndex: Math.max(
      0,
      Math.min(patch.slideIndex ?? prev.slideIndex, max),
    ),
    status: patch.status ?? prev.status,
    speakerLabel:
      patch.speakerLabel === undefined ? prev.speakerLabel : patch.speakerLabel,
    updatedAt: new Date().toISOString(),
  };
  g.__eavecSlideSession = next;
  writeDisk(next);
  return next;
}

export function getEavecLivePresentation(): {
  session: EavecSlideSession;
  slide: HackathonSlide | null;
  total: number;
  deckTitleFr: string;
} {
  const session = getEavecSlideSession();
  const deck = getHackathonDeck(session.deckSlug) ?? getHackathonDeck(EAVEC_DECK_SLUG);
  const total = deck?.slides.length ?? 0;
  const slide =
    deck && total > 0
      ? deck.slides[Math.min(session.slideIndex, total - 1)] ?? null
      : null;
  return {
    session,
    slide,
    total,
    deckTitleFr: deck?.titleFr ?? "e-AVEC",
  };
}
