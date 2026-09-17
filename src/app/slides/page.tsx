import Link from "next/link";
import { HK_SLIDES_LIGHT_CLASS } from "@/lib/hackathon/slides-light";

export const dynamic = "force-dynamic";

export default function EavecSlidesHubPage() {
  return (
    <div
      className={`hackathon-theme ${HK_SLIDES_LIGHT_CLASS} min-h-dvh bg-[var(--hk-page,#fafaf8)] text-[var(--hk-text,#222)]`}
      data-hk-theme="light"
    >
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-5 py-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--hk-accent,#1f6b43)]">
          VUK’AFRIK · e-AVEC
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Slides
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--hk-muted,#8a8a8a)]">
          Comme Silikin : le projecteur sur <strong>LIVE</strong>, la télécommande
          sur <strong>MC</strong>.
        </p>

        <div className="mt-10 grid gap-3">
          <Link
            href="/slides/live"
            className="rounded-3xl bg-[#071210] px-6 py-8 text-center shadow-lg transition active:scale-[0.99]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              Projecteur
            </p>
            <p className="mt-2 text-3xl font-black text-white">LIVE</p>
            <p className="mt-2 text-xs text-white/55">
              Affiche la slide On Air · à laisser sur l’écran salle
            </p>
          </Link>

          <Link
            href="/slides/mc"
            className="rounded-3xl border-2 border-[color:var(--hk-accent,#1f6b43)] bg-white px-6 py-8 text-center shadow-sm transition active:scale-[0.99]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--hk-accent,#1f6b43)]">
              Télécommande
            </p>
            <p className="mt-2 text-3xl font-black text-[color:var(--hk-text,#222)]">
              MC
            </p>
            <p className="mt-2 text-xs text-[color:var(--hk-muted,#8a8a8a)]">
              Passer On Air · suivant / précédent · notes speaker
            </p>
          </Link>
        </div>

        <p className="mt-10 text-center text-[11px] text-[color:var(--hk-muted,#8a8a8a)]">
          Produit pratique ·{" "}
          <Link href="/" className="font-semibold underline">
            e-avec.org
          </Link>
          {" · "}
          pas une banque
        </p>
      </main>
    </div>
  );
}
