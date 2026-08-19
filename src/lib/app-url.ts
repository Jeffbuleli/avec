/** Canonical production origin (apex). Set NEXT_PUBLIC_APP_URL=https://e-avec.org on the VPS. */
export const CANONICAL_PRODUCTION_ORIGIN = "https://e-avec.org";

/** McBuleli wallet (same VPS + same Postgres) for USDT deposit / withdraw. */
function isUnsafeDevHost(host: string, port: string): boolean {
  return (
    host === "0.0.0.0" ||
    host === "127.0.0.1" ||
    host === "localhost" ||
    host.endsWith(".local") ||
    port === "3001"
  );
}

function resolveSafeOrigin(raw: string | undefined, fallback: string): string {
  const candidate = raw?.trim().replace(/\/$/, "");
  if (!candidate) return fallback;
  try {
    const url = new URL(candidate);
    const host = url.hostname.toLowerCase();
    if (isUnsafeDevHost(host, url.port)) {
      return fallback;
    }
    return url.origin;
  } catch {
    return fallback;
  }
}

/** Client runtime guard - catches stale PWA installs on dev hosts. */
export function resolveCanonicalRedirect(): string | null {
  if (typeof window === "undefined") return null;
  const { hostname, port, pathname, search } = window.location;
  const host = hostname.toLowerCase();
  if (host === "e-avec.org" || host === "www.e-avec.org") return null;
  if (host.endsWith(".onrender.com") || host === "localhost") return null;
  if (isUnsafeDevHost(host, port)) {
    return `https://e-avec.org${pathname}${search}`;
  }
  return null;
}

export const MCBULELI_ORIGIN = resolveSafeOrigin(
  process.env.NEXT_PUBLIC_MCBULELI_ORIGIN,
  "https://mcbuleli.org",
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
  const fromEnv = resolveSafeOrigin(
    process.env.NEXT_PUBLIC_APP_URL,
    CANONICAL_PRODUCTION_ORIGIN,
  );
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    return CANONICAL_PRODUCTION_ORIGIN;
  }

  return "";
}

/** OG / Twitter / favicon absolute URLs — prefer canonical domain in production. */
export function getMetadataOrigin(): string {
  return getAppOrigin();
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
