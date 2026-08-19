"use client";

import { resolveGroupLogoSrc } from "@/lib/group-logo-url";

export function GroupLogoImg({
  url,
  className = "h-full w-full object-cover",
}: {
  url: string | null | undefined;
  className?: string;
}) {
  const src = resolveGroupLogoSrc(url);
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={className} />
  );
}
