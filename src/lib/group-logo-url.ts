import { normalizePublicMediaUrl } from "@/lib/media-url-config";

/** Validate logo URL before persisting (R2/CDN link or legacy data URL). */
export function validateGroupLogoUrl(
  raw: string | null | undefined,
): { ok: true; value: string | null } | { ok: false; error: string } {
  if (raw == null || raw === "") return { ok: true, value: null };
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: null };

  if (trimmed.startsWith("data:")) {
    if (trimmed.length > 600_000) return { ok: false, error: "group_logo_too_large" };
    return { ok: true, value: trimmed };
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (trimmed.length > 2000) return { ok: false, error: "group_logo_too_large" };
    return { ok: true, value: normalizePublicMediaUrl(trimmed) ?? trimmed };
  }

  return { ok: false, error: "group_logo_invalid_url" };
}

/** Group / discover logos may be data URLs or R2/CDN links. */
export function resolveGroupLogoSrc(
  url: string | null | undefined,
): string | null {
  if (typeof url !== "string" || !url.trim()) return null;
  const trimmed = url.trim();
  if (trimmed.startsWith("data:") || trimmed.startsWith("/")) return trimmed;
  return normalizePublicMediaUrl(trimmed) ?? trimmed;
}
