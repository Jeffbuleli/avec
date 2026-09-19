"use client";

import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

/** Landing — jury VUK’AFRIK + différenciation vs tontines digitales (Djangui, etc.). */
export function EavecLanding() {
  const { locale } = useI18n();
  const fr = locale === "fr";

  const pillars = fr
    ? [
        {
          t: "Réunion AVEC",
          d: "Parts 1–5 · caisse sociale · rituel terrain en Fc",
          icon: "shares",
        },
        {
          t: "Gouvernance",
          d: "Votes sur crédits & règles · journal vérifiable",
          icon: "vote",
        },
        {
          t: "Intégrité",
          d: "Alertes caisse · vue facilitateur ONG",
          icon: "shield",
        },
        {
          t: "Passport",
          d: "Historique portable · porte vers le formel",
          icon: "passport",
        },
      ]
    : [
        {
          t: "AVEC meeting",
          d: "Shares 1–5 · social fund · field ritual in Fc",
          icon: "shares",
        },
        {
          t: "Governance",
          d: "Votes on loans & rules · auditable ledger",
          icon: "vote",
        },
        {
          t: "Integrity",
          d: "Treasury alerts · NGO facilitator view",
          icon: "shield",
        },
        {
          t: "Passport",
          d: "Portable history · path to formal finance",
          icon: "passport",
        },
      ];

  const diffs = fr
    ? [
        {
          them: "Tontine / likelemba digitale",
          us: "AVEC / VSLA (épargne + crédit de cycle)",
        },
        {
          them: "Tours & cagnottes",
          us: "Parts, prêts votés, fonds social, clôture",
        },
        {
          them: "Coach IA grand public",
          us: "OS de groupe + Passport institutionnel",
        },
        {
          them: "Mode déclaratif multi-pays",
          us: "Ancré RDC · Fc · MoMo · facilitateurs",
        },
      ]
    : [
        {
          them: "Digital tontine / ROSCA",
          us: "AVEC / VSLA (savings + cycle credit)",
        },
        {
          them: "Turns & collection pots",
          us: "Shares, voted loans, social fund, share-out",
        },
        {
          them: "Consumer AI coach",
          us: "Group OS + institutional Passport",
        },
        {
          them: "Multi-country declarative mode",
          us: "DRC-first · Fc · MoMo · facilitators",
        },
      ];

  return (
    <div className="eavec-landing min-h-dvh overflow-x-hidden bg-[#0F2D2F] text-[#F6E8CD]">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Image
          src="/brand/logo-wordmark-dark.png"
          alt="e-AVEC"
          width={168}
          height={42}
          className="h-10 w-auto"
          priority
          unoptimized
        />
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link
            href="/login"
            className="rounded-full border border-[#F6E8CD]/30 px-4 py-2 text-sm font-semibold transition hover:border-[#C9A227] hover:text-[#C9A227]"
          >
            {fr ? "Connexion" : "Sign in"}
          </Link>
        </div>
      </header>

      {/* Hero — brand first, one composition, full-bleed atmosphere */}
      <section className="relative isolate min-h-[min(88dvh,52rem)] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,162,39,0.22),transparent_50%),radial-gradient(ellipse_at_90%_40%,rgba(246,232,205,0.08),transparent_45%),linear-gradient(180deg,#0F2D2F_0%,#0a2224_55%,#071a1b_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-16 h-[28rem] w-[28rem] rounded-full bg-[#C9A227]/10 blur-3xl eavec-landing-orb"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-20 lg:pt-14">
          <div className="eavec-landing-rise">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#C9A227]">
              e-AVEC
            </p>
            <h1 className="mt-5 max-w-xl text-[2.35rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.35rem]">
              {fr
                ? "L’OS des associations villageoises d’épargne & crédit."
                : "The operating system for village savings & credit associations."}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#F6E8CD]/72 sm:text-lg">
              {fr
                ? "Pas une tontine digitale. La méthodologie AVEC — parts, votes, caisse sociale, Passport — sécurisée en Fc."
                : "Not a digital tontine. Real AVEC methodology — shares, votes, social fund, Passport — secured in Fc."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex min-h-[52px] items-center rounded-full bg-[#F6E8CD] px-7 text-sm font-extrabold text-[#0F2D2F] shadow-[0_12px_40px_-12px_rgba(246,232,205,0.55)] transition hover:bg-white"
              >
                {fr ? "Créer une AVEC" : "Create an AVEC"}
              </Link>
              <Link
                href="/login?next=%2Fapp%2Fwallet%2Fgroups"
                className="inline-flex min-h-[52px] items-center rounded-full border border-[#F6E8CD]/35 px-7 text-sm font-bold transition hover:border-[#C9A227] hover:text-[#C9A227]"
              >
                {fr ? "Rejoindre" : "Join"}
              </Link>
            </div>
          </div>

          <div className="eavec-landing-rise eavec-landing-rise-delay flex justify-center lg:justify-end">
            <HeroVisual fr={fr} />
          </div>
        </div>
      </section>

      {/* Problem — org reports */}
      <section className="border-t border-[#F6E8CD]/10 bg-[#0a2224]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#C9A227]/90">
            {fr ? "Réalité terrain" : "Field reality"}
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight sm:text-3xl">
            {fr
              ? "La caisse AVEC reste opaque — les rapports le disent depuis des années."
              : "The AVEC cash box stays opaque — reports have said so for years."}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {(fr
              ? [
                  "Cash physique · risque de détournement",
                  "Cahier fragile · pouvoir chez les « lettrés »",
                  "Pas d’historique pour FOGEC, banque ou ONG",
                ]
              : [
                  "Physical cash · diversion risk",
                  "Fragile ledgers · power with the literate few",
                  "No history for FOGEC, banks or NGOs",
                ]
            ).map((line) => (
              <li
                key={line}
                className="border-l-2 border-[#C9A227]/70 pl-4 text-sm leading-snug text-[#F6E8CD]/75"
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[#F6E8CD]/45">
            {fr
              ? "Inspiré des constats VSLA/AVEC (CARE, ICI Cocoa, FAO, World Bank / GBV responders) — pas d’une app “tontine + IA” générique."
              : "Grounded in VSLA/AVEC evidence (CARE, ICI Cocoa, FAO, World Bank / GBV responders) — not a generic “tontine + AI” app."}
          </p>
        </div>
      </section>

      {/* Diff vs tontine */}
      <section className="border-t border-[#F6E8CD]/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#C9A227]">
            {fr ? "Différence" : "Difference"}
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-black tracking-tight sm:text-3xl">
            {fr
              ? "e-AVEC n’est pas une tontine digitale de plus."
              : "e-AVEC is not another digital tontine."}
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#F6E8CD]/12">
            <div className="grid grid-cols-2 bg-[#F6E8CD]/08 text-[10px] font-bold uppercase tracking-wide text-[#F6E8CD]/55">
              <p className="px-4 py-3">{fr ? "Approches tontine" : "Tontine apps"}</p>
              <p className="px-4 py-3 text-[#C9A227]">{fr ? "e-AVEC" : "e-AVEC"}</p>
            </div>
            {diffs.map((row) => (
              <div
                key={row.them}
                className="grid grid-cols-2 border-t border-[#F6E8CD]/10 text-sm"
              >
                <p className="px-4 py-3.5 text-[#F6E8CD]/50">{row.them}</p>
                <p className="px-4 py-3.5 font-semibold text-[#F6E8CD]">
                  {row.us}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-[#F6E8CD]/10 bg-[#071a1b]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#C9A227]">
            {fr ? "Produit" : "Product"}
          </p>
          <h2 className="mt-3 max-w-lg text-2xl font-black tracking-tight sm:text-3xl">
            {fr
              ? "Quatre piliers. Un rituel AVEC."
              : "Four pillars. One AVEC ritual."}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <article key={p.t} className="group">
                <PillarIcon kind={p.icon} />
                <h3 className="mt-4 text-base font-extrabold">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-snug text-[#F6E8CD]/60">
                  {p.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ONG */}
      <section className="border-t border-[#F6E8CD]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#C9A227]">
              {fr ? "ONG & facilitateurs" : "NGOs & facilitators"}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              {fr
                ? "Un portefeuille multi-groupes. Des alertes. Un PV crédible."
                : "A multi-group portfolio. Alerts. A credible minutes trail."}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#F6E8CD]/65">
              {fr
                ? "Pensé pour les programmes qui déploient des AVEC (autonomisation, résilience, protection) — pas seulement pour un groupe isolé."
                : "Built for programs that scale AVEC groups (empowerment, resilience, protection) — not only a single isolated circle."}
            </p>
          </div>
          <Link
            href="/business"
            className="inline-flex min-h-[48px] shrink-0 items-center rounded-full border border-[#C9A227]/50 px-6 text-sm font-bold text-[#C9A227] transition hover:bg-[#C9A227]/10"
          >
            {fr ? "Espace partenaires" : "Partners"}
          </Link>
        </div>
      </section>

      {/* CTA close */}
      <section className="border-t border-[#F6E8CD]/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.14),transparent_55%)]">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            {fr
              ? "On ne remplace pas la confiance — on la rend vérifiable."
              : "We don’t replace trust — we make it verifiable."}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex min-h-[48px] items-center rounded-full bg-[#F6E8CD] px-7 text-sm font-extrabold text-[#0F2D2F]"
            >
              {fr ? "Démarrer" : "Get started"}
            </Link>
            <Link
              href="/live"
              className="inline-flex min-h-[48px] items-center rounded-full border border-[#F6E8CD]/30 px-7 text-sm font-bold"
            >
              {fr ? "Présentation LIVE" : "LIVE presentation"}
            </Link>
          </div>
          <p className="mt-10 text-xs text-[#F6E8CD]/40">
            {fr
              ? "e-AVEC n’est pas une banque · pas d’agrément BCC · McBuleli"
              : "e-AVEC is not a bank · no BCC license · McBuleli"}
          </p>
        </div>
      </section>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/10 [&_span]:text-[#F6E8CD]/55 [&_a]:text-[#C9A227]" />
    </div>
  );
}

function HeroVisual({ fr }: { fr: boolean }) {
  return (
    <div className="relative w-full max-w-md">
      <svg
        viewBox="0 0 420 380"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="eaGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F6E8CD" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="eaGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8C96A" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
        </defs>
        <rect
          x="24"
          y="24"
          width="372"
          height="332"
          rx="36"
          fill="url(#eaGlow)"
          stroke="#F6E8CD"
          strokeOpacity="0.12"
        />
        {/* AVEC circle of members */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
          const cx = 210 + Math.cos(a) * 92;
          const cy = 175 + Math.sin(a) * 78;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="18"
              fill={i % 2 === 0 ? "url(#eaGold)" : "#F6E8CD"}
              fillOpacity={i % 2 === 0 ? 1 : 0.85}
            />
          );
        })}
        <circle cx="210" cy="175" r="46" fill="#0F2D2F" stroke="url(#eaGold)" strokeWidth="3" />
        <text
          x="210"
          y="170"
          textAnchor="middle"
          fill="#F6E8CD"
          fontSize="13"
          fontWeight="800"
          letterSpacing="0.12em"
        >
          AVEC
        </text>
        <text
          x="210"
          y="188"
          textAnchor="middle"
          fill="#C9A227"
          fontSize="11"
          fontWeight="700"
        >
          {fr ? "caisse visible" : "visible box"}
        </text>
        <text
          x="210"
          y="320"
          textAnchor="middle"
          fill="#F6E8CD"
          fillOpacity="0.45"
          fontSize="12"
          fontWeight="600"
        >
          {fr ? "Réunion · Vote · Passport" : "Meeting · Vote · Passport"}
        </text>
      </svg>
    </div>
  );
}

function PillarIcon({ kind }: { kind: string }) {
  const stroke = "#C9A227";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      {kind === "shares" && (
        <>
          <rect x="6" y="10" width="28" height="22" rx="6" stroke={stroke} strokeWidth="1.8" />
          <path d="M12 18h16M12 24h10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {kind === "vote" && (
        <>
          <rect x="8" y="8" width="24" height="24" rx="6" stroke={stroke} strokeWidth="1.8" />
          <path d="M14 20l4 4 8-9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "shield" && (
        <path
          d="M20 6l12 5v9c0 8-5.5 13-12 15-6.5-2-12-7-12-15V11l12-5z"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      {kind === "passport" && (
        <>
          <rect x="10" y="5" width="20" height="30" rx="4" stroke={stroke} strokeWidth="1.8" />
          <circle cx="20" cy="16" r="4" stroke={stroke} strokeWidth="1.6" />
          <path d="M14 26h12M14 30h8" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
