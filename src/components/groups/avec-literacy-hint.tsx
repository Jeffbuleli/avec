"use client";

/** Short Lingala / Swahili gloss under critical CTAs (field literacy). */
export function AvecLiteracyHint({
  fr,
  ln,
  sw,
}: {
  fr: string;
  ln: string;
  sw: string;
}) {
  return (
    <p className="mt-1.5 text-center text-[10px] leading-snug text-[color:var(--fd-muted)]">
      <span className="font-semibold text-[color:var(--fd-text)]/70">{fr}</span>
      <span className="mx-1 opacity-40">·</span>
      <span lang="ln">{ln}</span>
      <span className="mx-1 opacity-40">·</span>
      <span lang="sw">{sw}</span>
    </p>
  );
}
