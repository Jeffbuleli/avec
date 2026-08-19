"use client";

import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/components/i18n-provider";
import { getMcbuleliWalletUrl } from "@/lib/app-url";

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
                ? "Parts, caisse sociale, crédits internes, gouvernance et clôture de cycle — sur e-avec.org. Le portefeuille USDT reste chez McBuleli, sur le même serveur et la même base."
                : "Shares, social fund, internal loans, governance and cycle share-out — on e-avec.org. The USDT wallet stays with McBuleli, on the same server and database."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex min-h-[48px] items-center rounded-full bg-[#F6E8CD] px-6 text-sm font-extrabold text-[#0F2D2F] hover:bg-white"
              >
                {fr ? "Créer une AVEC" : "Create an AVEC"}
              </Link>
              <Link
                href="/login?next=%2Fapp%2Fwallet%2Fgroups"
                className="inline-flex min-h-[48px] items-center rounded-full border border-[#F6E8CD]/40 px-6 text-sm font-bold text-[#F6E8CD] hover:bg-[#F6E8CD]/10"
              >
                {fr ? "Rejoindre un groupe" : "Join a group"}
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-3xl border border-[#F6E8CD]/15 bg-[#0a2224] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
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
              t: fr ? "Caisse USDT" : "USDT treasury",
              d: fr
                ? "Alimentez via McBuleli. Les AVEC partagent la même base Postgres."
                : "Fund via McBuleli. AVEC groups share the same Postgres database.",
            },
          ].map((card) => (
            <article
              key={card.t}
              className="rounded-2xl border border-[#F6E8CD]/15 bg-[#F6E8CD]/5 p-5"
            >
              <h2 className="text-lg font-bold">{card.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#F6E8CD]/75">{card.d}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-[#F6E8CD]/10 px-5 py-8 text-center text-xs text-[#F6E8CD]/55">
        e-AVEC · {fr ? "propulsé par" : "powered by"}{" "}
        <a href={getMcbuleliWalletUrl("/")} className="font-semibold text-[#C9A227] hover:underline">
          McBuleli
        </a>
      </footer>
    </div>
  );
}
