"use client";

import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

export default function BusinessPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";

  const rows = fr
    ? [
        {
          t: "AVEC / coopérative",
          d: "OS groupe : parts, caisse, votes, clôture.",
          p: "À partir de 5 USD / mois / groupe",
        },
        {
          t: "ONG / projet (FAO, COOPI…)",
          d: "Console facilitateur multi-groupes + export PV.",
          p: "Licence zone / projet",
        },
        {
          t: "Partenaire crédit (FOGEC, IMF…)",
          d: "Passport avec consentement + score fiabilité.",
          p: "API / consultation",
        },
        {
          t: "Mobile Money",
          d: "Dépôts / retraits Fc via partenaires (PawaPay…).",
          p: "Commission corridor",
        },
      ]
    : [
        {
          t: "AVEC / cooperative",
          d: "Group OS: shares, treasury, votes, share-out.",
          p: "From 5 USD / month / group",
        },
        {
          t: "NGO / project (FAO, COOPI…)",
          d: "Multi-group facilitator console + minutes export.",
          p: "Zone / project license",
        },
        {
          t: "Credit partner (FOGEC, MFI…)",
          d: "Passport with consent + reliability score.",
          p: "API / lookup fee",
        },
        {
          t: "Mobile Money",
          d: "Fc deposits / withdrawals via partners (PawaPay…).",
          p: "Corridor commission",
        },
      ];

  return (
    <div className="min-h-dvh bg-[#0F2D2F] text-[#F6E8CD]">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
        <Link href="/">
          <Image
            src="/brand/logo-wordmark-dark.png"
            alt="e-AVEC"
            width={140}
            height={36}
            className="h-9 w-auto"
            unoptimized
          />
        </Link>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link
            href="/demo"
            className="rounded-full border border-[#C9A227]/50 px-3 py-1.5 text-xs font-bold text-[#C9A227]"
          >
            Demo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
          Business model
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
          {fr
            ? "Comment e-AVEC gagne de l’argent — sans être une banque"
            : "How e-AVEC makes money — without being a bank"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#F6E8CD]/80">
          {fr
            ? "Infrastructure numérique pour AVEC et ONG. Les flux fiat passent par partenaires agréés. Pas d’agrément BCC revendiqué."
            : "Digital infrastructure for AVEC groups and NGOs. Fiat rails via licensed partners. No BCC banking license claimed."}
        </p>

        <div className="mt-8 space-y-3">
          {rows.map((r) => (
            <article
              key={r.t}
              className="rounded-2xl border border-[#F6E8CD]/12 bg-[linear-gradient(180deg,rgba(246,232,205,0.1),rgba(246,232,205,0.03))] p-5"
            >
              <h2 className="text-lg font-bold">{r.t}</h2>
              <p className="mt-1 text-sm text-[#F6E8CD]/75">{r.d}</p>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-[#C9A227]">
                {r.p}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/register"
            className="inline-flex min-h-[48px] items-center rounded-full bg-[#F6E8CD] px-5 text-sm font-extrabold text-[#0F2D2F]"
          >
            {fr ? "Créer une AVEC" : "Create an AVEC"}
          </Link>
          <Link
            href="/demo"
            className="inline-flex min-h-[48px] items-center rounded-full border border-[#F6E8CD]/40 px-5 text-sm font-bold"
          >
            {fr ? "Voir la démo" : "See demo"}
          </Link>
          <a
            href="mailto:hi@mcbuleli.org?subject=e-AVEC%20partenariat%20ONG"
            className="inline-flex min-h-[48px] items-center rounded-full border border-[#C9A227]/50 px-5 text-sm font-bold text-[#C9A227]"
          >
            {fr ? "Parler partenariat" : "Talk partnership"}
          </a>
        </div>
      </main>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/10 [&_span]:text-[#F6E8CD]/55 [&_a]:text-[#C9A227]" />
    </div>
  );
}
