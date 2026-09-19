"use client";

import Image from "next/image";

/** Framed portrait for Live team slides. */
export function LivePortraitFrame({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md";
}) {
  const box =
    size === "sm"
      ? "aspect-[4/5] w-full max-w-[200px]"
      : "aspect-[4/5] w-full max-w-[260px]";

  return (
    <div className={`relative mx-auto ${box}`}>
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-[#F6E8CD] via-[#C9A227] to-[#0F2D2F] opacity-90 blur-[1px]"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-[#C9A227]/40 bg-[#0F2D2F] p-[2px] shadow-[0_20px_48px_-20px_rgba(15,45,47,0.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-[#141414]">
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            sizes="260px"
            className="object-cover object-[center_15%]"
            priority
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
          />
        </div>
      </div>
    </div>
  );
}
