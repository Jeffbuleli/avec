/** Canonical production origin (apex). Set NEXT_PUBLIC_APP_URL=https://e-avec.org on the VPS. */
export const CANONICAL_PRODUCTION_ORIGIN = "https://e-avec.org";

/** McBuleli wallet (same VPS + same Postgres) for USDT deposit / withdraw. */
export const MCBULELI_ORIGIN = (
  process.env.NEXT_PUBLIC_MCBULELI_ORIGIN?.trim().replace(/\/$/, "") ||
  "https://mcbuleli.org"
);

export function getMcbuleliWalletUrl(path = "/app/wallet"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${MCBULELI_ORIGIN}${p}`;
}

/**
 * Public site origin for invite links, OG metadata, avatars.
 * Priority: NEXT_PUBLIC_APP_URL → canonical prod.
 */
export function getAppOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    return CANONICAL_PRODUCTION_ORIGIN;
  }

  return "";
}

/** OG / Twitter / favicon absolute URLs — prefer canonical domain in production. */
export function getMetadataOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    return CANONICAL_PRODUCTION_ORIGIN;
  }

  return "";
}

export function getAppAbsoluteUrl(path: string): string {
  const origin = getAppOrigin() || CANONICAL_PRODUCTION_ORIGIN;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

/** Client-safe canonical host for PWA install prompts. */
export function canonicalAppHostname(): string {
  return new URL(CANONICAL_PRODUCTION_ORIGIN).hostname;
}
