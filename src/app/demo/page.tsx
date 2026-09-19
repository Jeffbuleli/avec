"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

type DemoPayload = {
  ok: boolean;
  seeded: boolean;
  groupId?: string;
  groupName?: string;
  inviteCode?: string;
  adminEmail?: string;
  passwordHint?: string;
  openVote?: { title: string; status: string } | null;
  passport?: { partnerLabel: string; scopes: string } | null;
  steps?: {
    t: string;
    labelFr: string;
    labelEn: string;
    path: string;
    sayFr?: string;
    sayEn?: string;
  }[];
  loginAdminPath?: string;
  message?: string;
};

const FALLBACK_STEPS = [
  {
    t: "0-15 s",
    labelFr: "Vue - caisse & cycle",
    labelEn: "Overview - treasury & cycle",
    path: "/login",
    sayFr: "Montrer la caisse visible et le cycle en cours.",
    sayEn: "Show the visible treasury and active cycle.",
  },
  {
    t: "15-35 s",
    labelFr: "Réunion - parts 1-5",
    labelEn: "Meeting - shares 1-5",
    path: "/login",
    sayFr: "Cotiser comme en réunion physique.",
    sayEn: "Contribute exactly like a physical meeting.",
  },
  {
    t: "35-60 s",
    labelFr: "Caisse - crédits & vote",
    labelEn: "Treasury - loans & vote",
    path: "/login",
    sayFr: "Ouvrir un crédit et le vote collectif.",
    sayEn: "Open a loan and the collective vote.",
  },
  {
    t: "60-90 s",
    labelFr: "Passport & insights",
    labelEn: "Passport & insights",
    path: "/login",
    sayFr: "Historique portable + disclaimer BCC.",
    sayEn: "Portable history + BCC disclaimer.",
  },
];

export default function DemoPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [data, setData] = useState<DemoPayload | null>(null);

  useEffect(() => {
    void fetch("/api/demo/umoja", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: DemoPayload) => setData(j))
      .catch(() =>
        setData({ ok: false, seeded: false, message: "network" }),
      );
  }, []);

  const steps = data?.steps?.length ? data.steps : FALLBACK_STEPS;
  const ready = Boolean(data?.seeded);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#0F2D2F] text-[#F6E8CD]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Link href="/" className="inline-flex items-center gap-2">
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
            href="/"
            className="rounded-full border border-[#F6E8CD]/55 px-3 py-1.5 text-xs font-semibold text-[#F6E8CD]"
          >
            {fr ? "Accueil" : "Home"}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-[#F6E8CD]/10">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/assets/landing/meeting-caisse.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,45,47,0.94),rgba(7,26,27,0.98))]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8C96A]">
            VUK&apos;AFRIK · Sandbox
          </p>
          <div className="mt-4 flex items-center gap-3">
            <DemoIcon kind="play" />
            <h1 className="text-3xl font-black leading-tight text-[#F6E8CD] sm:text-4xl">
              {fr ? "Démo 90 secondes - AVEC Umoja" : "90-second demo - AVEC Umoja"}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl pl-[52px] text-sm leading-relaxed text-[#F6E8CD]/90 sm:text-base">
            {fr
              ? "Sandbox guidée pour le jury : problème AVEC (caisse opaque) - solution e-AVEC (réunion, vote, Passport). Données fictives, pas une banque."
              : "Guided jury sandbox: AVEC problem (opaque cash box) - e-AVEC solution (meeting, vote, Passport). Fictional data, not a bank."}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-5 pb-20 pt-10">
        {/* What / why */}
        <section className="grid gap-4 sm:grid-cols-3">
          {(fr
            ? [
                {
                  icon: "why" as const,
                  t: "Pourquoi Umoja",
                  d: "Groupe seedé avec parts, prêts, vote ouvert et consentement Passport - prêt en 90 s.",
                },
                {
                  icon: "safe" as const,
                  t: "Sandbox isolée",
                  d: "Comptes @eavec.demo uniquement. Aucun impact sur les groupes réels.",
                },
                {
                  icon: "vs" as const,
                  t: "Pas une tontine",
                  d: "On montre parts 1-5, gouvernance et Passport - pas un tour de likelemba.",
                },
              ]
            : [
                {
                  icon: "why" as const,
                  t: "Why Umoja",
                  d: "Seeded group with shares, loans, open vote and Passport consent - ready in 90s.",
                },
                {
                  icon: "safe" as const,
                  t: "Isolated sandbox",
                  d: "@eavec.demo accounts only. No impact on real groups.",
                },
                {
                  icon: "vs" as const,
                  t: "Not a tontine",
                  d: "We show shares 1-5, governance and Passport - not a ROSCA turn.",
                },
              ]
          ).map((card) => (
            <article
              key={card.t}
              className="rounded-2xl border border-[#F6E8CD]/12 bg-[#0a2224] p-4"
            >
              <div className="flex items-center gap-3">
                <DemoIcon kind={card.icon} />
                <h2 className="text-sm font-extrabold">{card.t}</h2>
              </div>
              <p className="mt-2 pl-[52px] text-sm leading-relaxed text-[#F6E8CD]/88">
                {card.d}
              </p>
            </article>
          ))}
        </section>

        {/* Login panel */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-[#F6E8CD]/15 bg-[#0a2224]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative hidden min-h-[220px] lg:block">
              <Image
                src="/assets/landing/meeting-circle.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="40vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a2224]" />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <DemoIcon kind="key" />
                <h2 className="text-base font-extrabold">
                  {fr ? "Connexion jury" : "Jury login"}
                </h2>
              </div>
              <p className="mt-2 pl-[52px] text-sm text-[#F6E8CD]/88">
                {fr
                  ? "Un clic ouvre l'admin Umoja sur la Vue."
                  : "One click opens Umoja admin on Overview."}
              </p>

              {!data ? (
                <p className="mt-5 text-sm text-[#F6E8CD]/90">…</p>
              ) : !ready ? (
                <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
                  {fr
                    ? "Sandbox pas encore seedée. Sur le serveur : npm run seed:eavec-umoja"
                    : "Sandbox not seeded yet. On server: npm run seed:eavec-umoja"}
                </div>
              ) : (
                <div className="mt-5 space-y-3 text-sm">
                  <Cred
                    label={fr ? "Email" : "Email"}
                    value={data.adminEmail ?? ""}
                  />
                  <Cred
                    label={fr ? "Mot de passe" : "Password"}
                    value={data.passwordHint ?? ""}
                  />
                  <Cred
                    label={fr ? "Groupe" : "Group"}
                    value={`${data.groupName ?? ""} (${data.inviteCode ?? ""})`}
                  />
                  {data.openVote ? (
                    <p className="text-[#F6E8CD]/90">
                      {fr ? "Vote ouvert :" : "Open vote:"} {data.openVote.title}
                    </p>
                  ) : null}
                  {data.passport ? (
                    <p className="text-[#F6E8CD]/90">
                      Passport → {data.passport.partnerLabel}
                    </p>
                  ) : null}
                  {data.loginAdminPath ? (
                    <Link
                      href={data.loginAdminPath}
                      className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#F6E8CD] px-5 text-sm font-extrabold text-[#0F2D2F] sm:w-auto"
                    >
                      {fr ? "Lancer la démo (admin)" : "Launch demo (admin)"}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Script */}
        <section className="mt-10">
          <div className="flex items-center gap-3">
            <DemoIcon kind="script" />
            <h2 className="text-base font-extrabold">
              {fr ? "Script 90 s" : "90s script"}
            </h2>
          </div>
          <p className="mt-2 pl-[52px] text-sm text-[#F6E8CD]/88">
            {fr
              ? "Chaque étape ouvre l'onglet exact - dire la phrase, montrer l'écran, passer."
              : "Each step opens the exact tab - say the line, show the screen, move on."}
          </p>
          <ol className="mt-6 space-y-3">
            {steps.map((step, i) => (
              <li
                key={`${step.t}-${i}`}
                className="rounded-2xl border border-[#F6E8CD]/12 bg-[linear-gradient(180deg,rgba(246,232,205,0.08),rgba(246,232,205,0.02))] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/25 text-xs font-extrabold text-[#E8C96A]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#E8C96A]">
                          {step.t}
                        </p>
                        <p className="text-sm font-semibold text-[#F6E8CD]">
                          {fr ? step.labelFr : step.labelEn}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 pl-11 text-sm leading-relaxed text-[#F6E8CD]/88">
                      {fr
                        ? step.sayFr ??
                          "Montrer l'écran, une phrase, passer."
                        : step.sayEn ??
                          "Show the screen, one sentence, move on."}
                    </p>
                  </div>
                  <Link
                    href={
                      ready && data?.adminEmail
                        ? `/login?email=${encodeURIComponent(data.adminEmail)}&next=${encodeURIComponent(step.path)}`
                        : step.path
                    }
                    className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border border-[#F6E8CD]/55 bg-[#F6E8CD]/10 px-4 text-xs font-bold text-[#F6E8CD]"
                  >
                    {fr ? "Aller" : "Go"}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Storyboard images */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <DemoIcon kind="eye" />
            <h2 className="text-base font-extrabold">
              {fr ? "Ce que le jury doit voir" : "What the jury should see"}
            </h2>
          </div>
          <p className="mt-2 pl-[52px] text-sm text-[#F6E8CD]/88">
            {fr
              ? "Trois moments du rituel AVEC - le digital épouse le terrain."
              : "Three moments of the AVEC ritual - digital mirrors the field."}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {(fr
              ? [
                  {
                    src: "/assets/landing/meeting-circle.jpg",
                    t: "Cercle",
                    d: "Membres réunis - confiance sociale.",
                  },
                  {
                    src: "/assets/landing/meeting-caisse.jpg",
                    t: "Caisse",
                    d: "Boîte + Fc + app - transparence.",
                  },
                  {
                    src: "/assets/landing/meeting-vote.jpg",
                    t: "Vote",
                    d: "Décision collective traçable.",
                  },
                ]
              : [
                  {
                    src: "/assets/landing/meeting-circle.jpg",
                    t: "Circle",
                    d: "Members gathered - social trust.",
                  },
                  {
                    src: "/assets/landing/meeting-caisse.jpg",
                    t: "Box",
                    d: "Cash box + Fc + app - transparency.",
                  },
                  {
                    src: "/assets/landing/meeting-vote.jpg",
                    t: "Vote",
                    d: "Collective decision, auditable.",
                  },
                ]
            ).map((s) => (
              <figure key={s.src} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={s.src}
                    alt={s.t}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    unoptimized
                  />
                </div>
                <figcaption className="mt-2">
                  <p className="text-sm font-extrabold text-[#F6E8CD]">{s.t}</p>
                  <p className="text-sm text-[#F6E8CD]/88">{s.d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Dual track */}
        <section className="mt-12 grid gap-4 rounded-2xl border border-[#F6E8CD]/12 bg-[#071a1b] p-5 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <DemoIcon kind="sandbox" />
              <h3 className="text-sm font-extrabold">
                {fr ? "Cette page = sandbox" : "This page = sandbox"}
              </h3>
            </div>
            <p className="mt-2 pl-[52px] text-sm leading-relaxed text-[#F6E8CD]/88">
              {fr
                ? "/demo prépare le jury avec Umoja. Idéal pour répéter le pitch 90 s."
                : "/demo prepares the jury with Umoja. Ideal to rehearse the 90s pitch."}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <DemoIcon kind="prod" />
              <h3 className="text-sm font-extrabold">
                {fr ? "Pratique = production" : "Practice = production"}
              </h3>
            </div>
            <p className="mt-2 pl-[52px] text-sm leading-relaxed text-[#F6E8CD]/88">
              {fr
                ? "En session pratique VUK, préférer un groupe réel sur e-avec.org (pas le sandbox)."
                : "In VUK practice sessions, prefer a real group on e-avec.org (not the sandbox)."}
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/live"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#F6E8CD]/55 px-5 text-xs font-bold text-[#F6E8CD]"
          >
            LIVE
          </Link>
          <Link
            href="/mc"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#F6E8CD]/55 px-5 text-xs font-bold text-[#F6E8CD]"
          >
            MC
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#F6E8CD] px-5 text-xs font-extrabold text-[#0F2D2F]"
          >
            {fr ? "Créer mon AVEC" : "Create my AVEC"}
          </Link>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-[#F6E8CD]/80">
          {fr
            ? "e-AVEC n'est pas une banque et ne revendique aucun agrément BCC. Données sandbox Umoja uniquement."
            : "e-AVEC is not a bank and claims no BCC license. Umoja sandbox data only."}
        </p>
      </main>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/15 text-[#F6E8CD]/80 [&_p]:text-[#F6E8CD]/80 [&_a]:text-[#E8C96A]" />
    </div>
  );
}

function Cred({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[#F6E8CD]">
      <span className="font-semibold text-[#E8C96A]">{label} · </span>
      <code className="rounded bg-[#F6E8CD]/12 px-1.5 py-0.5 text-[13px] font-semibold text-[#F6E8CD]">
        {value}
      </code>
    </p>
  );
}

function DemoIcon({
  kind,
}: {
  kind:
    | "play"
    | "why"
    | "safe"
    | "vs"
    | "key"
    | "script"
    | "eye"
    | "sandbox"
    | "prod";
}) {
  const stroke = "#E8C96A";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden className="shrink-0">
      {kind === "play" && (
        <path d="M14 10l16 10-16 10V10z" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
      )}
      {kind === "why" && (
        <>
          <circle cx="20" cy="20" r="12" stroke={stroke} strokeWidth="1.8" />
          <path d="M20 17v8M20 13.5v.5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {kind === "safe" && (
        <path
          d="M20 6l12 5v9c0 8-5.5 13-12 15-6.5-2-12-7-12-15V11l12-5z"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      {kind === "vs" && (
        <>
          <path d="M8 20h10M22 20h10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 14l-6 6 6 6M22 14l6 6-6 6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "key" && (
        <>
          <circle cx="15" cy="18" r="6" stroke={stroke} strokeWidth="1.8" />
          <path d="M20 18h12v4h-4v4h-4v-4h-2" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "script" && (
        <>
          <rect x="10" y="6" width="20" height="28" rx="3" stroke={stroke} strokeWidth="1.8" />
          <path d="M15 14h10M15 20h10M15 26h6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === "eye" && (
        <>
          <path d="M6 20s5-8 14-8 14 8 14 8-5 8-14 8S6 20 6 20z" stroke={stroke} strokeWidth="1.8" />
          <circle cx="20" cy="20" r="3.5" stroke={stroke} strokeWidth="1.6" />
        </>
      )}
      {kind === "sandbox" && (
        <rect x="8" y="10" width="24" height="20" rx="4" stroke={stroke} strokeWidth="1.8" />
      )}
      {kind === "prod" && (
        <>
          <path d="M8 28V14l12-6 12 6v14" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M16 28v-8h8v8" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
