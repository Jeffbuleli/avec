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
          t: "Transfert interne",
          d: "Envoi Fc entre utilisateurs e-AVEC — gratuit pour faire grandir le réseau.",
          p: "0 Fc",
        },
        {
          t: "AVEC / coopérative",
          d: "OS groupe : parts, caisse, votes, clôture, Passport.",
          p: "1 000 Fc / mois / groupe",
        },
        {
          t: "ONG / facilitateur",
          d: "Console multi-groupes + alertes intégrité + export PV.",
          p: "10 000 Fc / mois / ONG",
        },
        {
          t: "Dépôt / retrait MoMo",
          d: "Fc via partenaires (PawaPay…). Rails agréés — pas d’agrément BCC revendiqué.",
          p: "3,5 %",
        },
        {
          t: "Marché",
          d: "Achat communauté — commission facturée à l’acheteur.",
          p: "1 % / transaction",
        },
        {
          t: "Partenaire crédit (FOGEC, IMF…)",
          d: "Passport avec consentement + score fiabilité.",
          p: "API / consultation",
        },
      ]
    : [
        {
          t: "Internal transfer",
          d: "Send Fc between e-AVEC users — free to grow the network.",
          p: "0 Fc",
        },
        {
          t: "AVEC / cooperative",
          d: "Group OS: shares, treasury, votes, share-out, Passport.",
          p: "1,000 Fc / month / group",
        },
        {
          t: "NGO / facilitator",
          d: "Multi-group console + integrity alerts + minutes export.",
          p: "10,000 Fc / month / NGO",
        },
        {
          t: "MoMo deposit / withdraw",
          d: "Fc via partners (PawaPay…). Licensed rails — no BCC banking license claimed.",
          p: "3.5%",
        },
        {
          t: "Market",
          d: "Community purchases — fee charged to the buyer.",
          p: "1% / transaction",
        },
        {
          t: "Credit partner (FOGEC, MFI…)",
          d: "Passport with consent + reliability score.",
          p: "API / lookup",
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
            ? "Infrastructure numérique pour AVEC et ONG. Transferts internes à 0 Fc pour la viralité ; abo + MoMo + Marché pour la marge. Rails fiat via partenaires agréés — pas d’agrément BCC revendiqué."
            : "Digital infrastructure for AVEC groups and NGOs. Free internal transfers for growth; subscription + MoMo + Market for margin. Fiat rails via licensed partners — no BCC banking license claimed."}
        </p>

        <div className="mt-6 rounded-2xl border border-[#C9A227]/35 bg-[#C9A227]/10 p-4 text-sm leading-relaxed text-[#F6E8CD]/90">
          {fr ? (
            <>
              <p className="font-extrabold text-[#C9A227]">Scénario jury (ordre de grandeur)</p>
              <p className="mt-2">
                100 AVEC × 1 000 Fc + 5 ONG × 10 000 Fc + MoMo 50 M Fc × 3,5 % + Marché 20 M Fc × 1 % ≈{" "}
                <span className="font-black text-[#F6E8CD]">2,1 M Fc / mois</span>
                {" "}— transferts internes à 0 Fc comme carburant d’usage.
              </p>
            </>
          ) : (
            <>
              <p className="font-extrabold text-[#C9A227]">Jury scenario (order of magnitude)</p>
              <p className="mt-2">
                100 AVEC × 1,000 Fc + 5 NGOs × 10,000 Fc + MoMo 50M Fc × 3.5% + Market 20M Fc × 1% ≈{" "}
                <span className="font-black text-[#F6E8CD]">2.1M Fc / month</span>
                {" "}— internal transfers at 0 Fc as growth fuel.
              </p>
            </>
          )}
        </div>

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
