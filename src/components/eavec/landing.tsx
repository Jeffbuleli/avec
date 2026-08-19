"use client";

import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

export function EavecLanding() {
  const { locale } = useI18n();
  const fr = locale === "fr";

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
            href="/login"
            className="rounded-full border border-[#F6E8CD]/30 px-4 py-2 text-sm font-semibold text-[#F6E8CD] hover:bg-[#F6E8CD]/10"
          >
            {fr ? "Connexion" : "Sign in"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20 pt-8 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C9A227]">
              {fr ? "Associations villageoises d’épargne et de crédit" : "Village savings & loan associations"}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {fr
                ? "L’AVEC numérique, pour les groupes qui épargnent ensemble."
                : "Digital AVEC for groups that save together."}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F6E8CD]/80">
              {fr
                ? "Parts, caisse sociale, crédits internes, gouvernance et clôture de cycle — en USD et CDF, avec dépôt Mobile Money pour l’inclusion financière."
                : "Shares, social fund, internal loans, governance and cycle share-out — in USD and CDF, with Mobile Money deposits for financial inclusion."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex min-h-[50px] items-center rounded-full bg-[#F6E8CD] px-6 text-sm font-extrabold text-[#0F2D2F] shadow-[0_16px_40px_rgba(201,162,39,0.22)] hover:bg-white"
              >
                {fr ? "Créer une AVEC" : "Create an AVEC"}
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

        <section className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: fr ? "Réunions & parts" : "Meetings & shares",
              d: fr
                ? "1 à 5 parts par réunion, valeur fixe, caisse sociale optionnelle."
                : "1 to 5 shares per meeting, fixed value, optional social fund.",
            },
            {
              t: fr ? "Gouvernance" : "Governance",
              d: fr
                ? "Rôles, votes, crédits internes et clôture de cycle tracés au centime."
                : "Roles, votes, internal loans and cycle closure, tracked to the cent.",
            },
            {
              t: fr ? "Mobile Money" : "Mobile Money",
              d: fr
                ? "Dépôt et retrait USD/CDF via Orange, M-Pesa et Airtel (PawaPay)."
                : "USD/CDF deposit and withdraw via Orange, M-Pesa and Airtel (PawaPay).",
            },
          ].map((card) => (
            <article
              key={card.t}
              className="rounded-[1.6rem] border border-[#F6E8CD]/12 bg-[linear-gradient(180deg,rgba(246,232,205,0.12),rgba(246,232,205,0.04))] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur"
            >
              <div className="mb-3 h-1.5 w-12 rounded-full bg-[#C9A227]" />
              <h2 className="text-lg font-bold">{card.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#F6E8CD]/75">{card.d}</p>
            </article>
          ))}
        </section>
      </main>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/10 [&_span]:text-[#F6E8CD]/55 [&_a]:text-[#C9A227]" />
    </div>
  );
}
