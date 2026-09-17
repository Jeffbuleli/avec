"use client";

import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

export function EavecLanding() {
  const { locale } = useI18n();
  const fr = locale === "fr";

  const problems = fr
    ? [
        {
          t: "Caisse opaque",
          d: "Cahier papier, cash physique, litiges à chaque réunion.",
        },
        {
          t: "Risque de détournement",
          d: "Sans journal partagé, la confiance du groupe s’érode.",
        },
        {
          t: "Historique qui meurt",
          d: "Fin de cycle = zéro preuve pour un crédit ou un partenaire.",
        },
      ]
    : [
        {
          t: "Opaque cash box",
          d: "Paper ledgers, physical cash, disputes every meeting.",
        },
        {
          t: "Misappropriation risk",
          d: "Without a shared ledger, group trust erodes.",
        },
        {
          t: "History that dies",
          d: "Cycle end = no proof for credit or partners.",
        },
      ];

  const solutions = fr
    ? [
        {
          t: "Réunions & parts",
          d: "1 à 5 parts par réunion, valeur fixe, caisse sociale — en Fc.",
        },
        {
          t: "Gouvernance tracée",
          d: "Rôles, votes et crédits internes au centime près.",
        },
        {
          t: "Passport & Mobile Money",
          d: "Historique portable (consentement) + dépôt Orange / M-Pesa / Airtel.",
        },
      ]
    : [
        {
          t: "Meetings & shares",
          d: "1 to 5 shares per meeting, fixed value, social fund — in Fc.",
        },
        {
          t: "Traced governance",
          d: "Roles, votes and internal loans tracked to the cent.",
        },
        {
          t: "Passport & Mobile Money",
          d: "Portable history (consent) + Orange / M-Pesa / Airtel deposits.",
        },
      ];

  return (
    <div className="min-h-dvh bg-[#0F2D2F] text-[#F6E8CD]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Image
          src="/brand/logo-wordmark-dark.png"
          alt="e-AVEC"
          width={160}
          height={40}
          className="h-10 w-auto"
          priority
          unoptimized
        />
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link
            href="/demo"
            className="hidden rounded-full border border-[#C9A227]/50 px-3 py-1.5 text-xs font-bold text-[#C9A227] sm:inline-flex"
          >
            Demo
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-[#F6E8CD]/30 px-4 py-2 text-sm font-semibold text-[#F6E8CD] hover:bg-[#F6E8CD]/10"
          >
            {fr ? "Connexion" : "Sign in"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20 pt-8 sm:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C9A227]">
              {fr
                ? "Inclusion financière · AVEC digitales"
                : "Financial inclusion · Digital AVEC"}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {fr
                ? "Sécurisez la caisse AVEC. Gardez la confiance du groupe."
                : "Secure the AVEC cash box. Keep the group’s trust."}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F6E8CD]/80">
              {fr
                ? "En RDC, les AVEC financent le petit commerce et l’entraide — mais le cahier et le cash restent fragiles. e-AVEC digitalise parts, votes, crédits et historique portable, avec Mobile Money en Fc."
                : "In DRC, AVEC groups fund small trade and solidarity — but paper and cash stay fragile. e-AVEC digitizes shares, votes, loans and a portable history, with Mobile Money in Fc."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex min-h-[50px] items-center rounded-full bg-[#F6E8CD] px-6 text-sm font-extrabold text-[#0F2D2F] shadow-[0_16px_40px_rgba(201,162,39,0.22)] hover:bg-white"
              >
                {fr ? "Créer une AVEC" : "Create an AVEC"}
              </Link>
              <Link
                href="/demo"
                className="inline-flex min-h-[50px] items-center rounded-full border border-[#C9A227]/55 bg-[#C9A227]/15 px-6 text-sm font-bold text-[#F6E8CD] hover:bg-[#C9A227]/25"
              >
                {fr ? "Démo jury 90 s" : "90s jury demo"}
              </Link>
              <Link
                href="/business"
                className="inline-flex min-h-[50px] items-center rounded-full border border-[#F6E8CD]/40 bg-white/5 px-6 text-sm font-bold text-[#F6E8CD] backdrop-blur hover:bg-[#F6E8CD]/10"
              >
                Business
              </Link>
              <Link
                href="/login?next=%2Fapp%2Fwallet%2Fgroups"
                className="inline-flex min-h-[50px] items-center rounded-full border border-[#F6E8CD]/40 bg-white/5 px-6 text-sm font-bold text-[#F6E8CD] backdrop-blur hover:bg-[#F6E8CD]/10"
              >
                {fr ? "Rejoindre un groupe" : "Join a group"}
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-[2rem] border border-[#F6E8CD]/15 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.16),transparent_45%),#0a2224] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={280}
                height={280}
                className="h-56 w-56 object-contain sm:h-72 sm:w-72"
                unoptimized
              />
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C9A227]">
            {fr ? "Le problème sur le terrain" : "The field problem"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {problems.map((card) => (
              <article
                key={card.t}
                className="rounded-[1.6rem] border border-rose-300/20 bg-[linear-gradient(180deg,rgba(190,80,80,0.18),rgba(246,232,205,0.04))] p-5"
              >
                <div className="mb-3 h-1.5 w-12 rounded-full bg-rose-300/80" />
                <h3 className="text-lg font-bold">{card.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F6E8CD]/75">
                  {card.d}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C9A227]">
            {fr ? "La solution e-AVEC" : "The e-AVEC solution"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {solutions.map((card) => (
              <article
                key={card.t}
                className="rounded-[1.6rem] border border-[#F6E8CD]/12 bg-[linear-gradient(180deg,rgba(246,232,205,0.12),rgba(246,232,205,0.04))] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur"
              >
                <div className="mb-3 h-1.5 w-12 rounded-full bg-[#C9A227]" />
                <h3 className="text-lg font-bold">{card.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F6E8CD]/75">
                  {card.d}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside
          className="mt-12 rounded-2xl border border-[#F6E8CD]/15 bg-[#0a2224]/80 px-5 py-4 text-sm leading-relaxed text-[#F6E8CD]/70"
          role="note"
        >
          <p className="font-bold text-[#C9A227]">
            {fr ? "Précision réglementaire" : "Regulatory note"}
          </p>
          <p className="mt-2">
            {fr
              ? "e-AVEC n’est pas une banque et ne revendique aucun agrément de la Banque Centrale du Congo. Nous fournissons un outil numérique pour que le groupe gère sa propre caisse, ses votes et son historique — avec traçabilité et Mobile Money via partenaires."
              : "e-AVEC is not a bank and claims no license from the Central Bank of Congo. We provide digital tools so the group manages its own treasury, votes and history — with auditability and Mobile Money via partners."}
          </p>
        </aside>
      </main>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/10 [&_span]:text-[#F6E8CD]/55 [&_a]:text-[#C9A227]" />
    </div>
  );
}
