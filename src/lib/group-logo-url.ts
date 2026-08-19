import { normalizePublicMediaUrl } from "@/lib/media-url-config";

/** Group / discover logos may be data URLs or R2/CDN links. */
export function resolveGroupLogoSrc(
  url: string | null | undefined,
): string | null {
  if (typeof url !== "string" || !url.trim()) return null;
  const trimmed = url.trim();
  if (trimmed.startsWith("data:") || trimmed.startsWith("/")) return trimmed;
  return normalizePublicMediaUrl(trimmed) ?? trimmed;
}
