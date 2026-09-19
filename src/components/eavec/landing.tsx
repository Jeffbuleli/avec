"use client";

import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

/** Landing - jury VUK'AFRIK + différenciation vs tontines digitales. */
export function EavecLanding() {
  const { locale } = useI18n();
  const fr = locale === "fr";

  const pillars = fr
    ? [
        {
          t: "Réunion AVEC",
          d: "Parts 1-5 · caisse sociale · rituel terrain en Fc",
          icon: "shares" as const,
        },
        {
          t: "Gouvernance",
          d: "Votes sur crédits & règles · journal vérifiable",
          icon: "vote" as const,
        },
        {
          t: "Intégrité",
          d: "Alertes caisse · vue facilitateur ONG",
          icon: "shield" as const,
        },
        {
          t: "Passport",
          d: "Historique portable · porte vers le formel",
          icon: "passport" as const,
        },
      ]
    : [
        {
          t: "AVEC meeting",
          d: "Shares 1-5 · social fund · field ritual in Fc",
          icon: "shares" as const,
        },
        {
          t: "Governance",
          d: "Votes on loans & rules · auditable ledger",
          icon: "vote" as const,
        },
        {
          t: "Integrity",
          d: "Treasury alerts · NGO facilitator view",
          icon: "shield" as const,
        },
        {
          t: "Passport",
          d: "Portable history · path to formal finance",
          icon: "passport" as const,
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

  const scenes = fr
    ? [
        {
          src: "/assets/landing/meeting-circle.jpg",
          alt: "Cercle AVEC en réunion",
          t: "Le cercle",
          d: "Membres, caisse et cahier - le rituel VSLA intact.",
        },
        {
          src: "/assets/landing/meeting-caisse.jpg",
          alt: "Caisse AVEC et téléphone",
          t: "La caisse",
          d: "Cash + Fc + MoMo - tout devient visible.",
        },
        {
          src: "/assets/landing/meeting-vote.jpg",
          alt: "Vote collectif AVEC",
          t: "Le vote",
          d: "Crédits et règles décidés ensemble, traçables.",
        },
      ]
    : [
        {
          src: "/assets/landing/meeting-circle.jpg",
          alt: "AVEC circle meeting",
          t: "The circle",
          d: "Members, cash box and ledger - the VSLA ritual intact.",
        },
        {
          src: "/assets/landing/meeting-caisse.jpg",
          alt: "AVEC cash box and phone",
          t: "The box",
          d: "Cash + Fc + MoMo - everything becomes visible.",
        },
        {
          src: "/assets/landing/meeting-vote.jpg",
          alt: "AVEC collective vote",
          t: "The vote",
          d: "Loans and rules decided together, auditable.",
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
            href="/demo"
            className="hidden rounded-full border border-[#C9A227]/40 px-3 py-2 text-xs font-bold text-[#C9A227] sm:inline-flex"
          >
            Demo
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-[#F6E8CD]/30 px-4 py-2 text-sm font-semibold transition hover:border-[#C9A227] hover:text-[#C9A227]"
          >
            {fr ? "Connexion" : "Sign in"}
          </Link>
        </div>
      </header>

      {/* Hero - brand + full-bleed meeting visual */}
      <section className="relative isolate min-h-[min(88dvh,52rem)] overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/assets/landing/meeting-circle.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_35%] opacity-45"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,45,47,0.96)_0%,rgba(15,45,47,0.78)_48%,rgba(7,26,27,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,162,39,0.2),transparent_45%)]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-20">
          <div className="eavec-landing-rise">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#C9A227]">
              e-AVEC
            </p>
            <h1 className="mt-5 max-w-xl text-[2.35rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {fr
                ? "L'OS des associations villageoises d'épargne & crédit."
                : "The operating system for village savings & credit associations."}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#F6E8CD]/78 sm:text-lg">
              {fr
                ? "Pas une tontine digitale. La méthodologie AVEC - parts, votes, caisse sociale, Passport - sécurisée en Fc."
                : "Not a digital tontine. Real AVEC methodology - shares, votes, social fund, Passport - secured in Fc."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex min-h-[52px] items-center rounded-full bg-[#F6E8CD] px-7 text-sm font-extrabold text-[#0F2D2F] shadow-[0_12px_40px_-12px_rgba(246,232,205,0.55)] transition hover:bg-white"
              >
                {fr ? "Créer une AVEC" : "Create an AVEC"}
              </Link>
              <Link
                href="/demo"
                className="inline-flex min-h-[52px] items-center rounded-full border border-[#F6E8CD]/4 px-7 text-sm font-bold transition hover:border-[#C9A227] hover:text-[#C9A227]"
              >
                {fr ? "Voir la démo" : "See the demo"}
              </Link>
            </div>
          </div>

          <div className="eavec-landing-rise eavec-landing-rise-delay hidden justify-end lg:flex">
            <HeroMark fr={fr} />
          </div>
        </div>
      </section>

      {/* Terrain scenes */}
      <section className="border-t border-[#F6E8CD]/10 bg-[#0a2224]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <SectionHead
            icon="circle"
            title={fr ? "Réalité terrain" : "Field reality"}
            detail={
              fr
                ? "La caisse AVEC reste opaque - les rapports le disent depuis des années."
                : "The AVEC cash box stays opaque - reports have said so for years."
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {scenes.map((s) => (
              <figure key={s.src} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                    sizes="(max-width:640px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="text-sm font-extrabold">{s.t}</p>
                  <p className="mt-0.5 text-xs leading-snug text-[#F6E8CD]/55">
                    {s.d}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {(fr
              ? [
                  "Cash physique · risque de détournement",
                  "Cahier fragile · pouvoir chez les « lettrés »",
                  "Pas d'historique pour FOGEC, banque ou ONG",
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
              ? "Inspiré des constats VSLA/AVEC (CARE, ICI Cocoa, FAO, World Bank / GBV responders) - pas d'une app « tontine + IA » générique."
              : "Grounded in VSLA/AVEC evidence (CARE, ICI Cocoa, FAO, World Bank / GBV responders) - not a generic « tontine + AI » app."}
          </p>
        </div>
      </section>

      {/* Diff vs tontine */}
      <section className="border-t border-[#F6E8CD]/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <SectionHead
            icon="diff"
            title={
              fr
                ? "e-AVEC n'est pas une tontine digitale de plus."
                : "e-AVEC is not another digital tontine."
            }
            detail={
              fr
                ? "Les autres digitalisent la tontine. Nous digitalisons la méthodologie AVEC."
                : "Others digitize the tontine. We digitize AVEC methodology."
            }
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#F6E8CD]/12">
            <div className="grid grid-cols-2 bg-[#F6E8CD]/08 text-[10px] font-bold uppercase tracking-wide text-[#F6E8CD]/55">
              <p className="px-4 py-3">{fr ? "Approches tontine" : "Tontine apps"}</p>
              <p className="px-4 py-3 text-[#C9A227]">e-AVEC</p>
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

      {/* Pillars - SVG left, title right, detail below */}
      <section className="border-t border-[#F6E8CD]/10 bg-[#071a1b]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <SectionHead
            icon="pillars"
            title={fr ? "Quatre piliers. Un rituel AVEC." : "Four pillars. One AVEC ritual."}
            detail={
              fr
                ? "Le même ordre qu'en réunion physique - rendu numérique."
                : "The same order as a physical meeting - made digital."
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.t}
                className="rounded-2xl border border-[#F6E8CD]/10 bg-[#0F2D2F]/40 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <PillarIcon kind={p.icon} />
                  <h3 className="text-base font-extrabold leading-none">{p.t}</h3>
                </div>
                <p className="mt-2 pl-[52px] text-sm leading-snug text-[#F6E8CD]/60">
                  {p.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ONG + image */}
      <section className="border-t border-[#F6E8CD]/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src="/assets/landing/meeting-vote.jpg"
              alt={fr ? "Facilitateur et vote AVEC" : "Facilitator and AVEC vote"}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div>
            <SectionHead
              icon="ong"
              title={
                fr
                  ? "Un portefeuille multi-groupes. Des alertes. Un PV crédible."
                  : "A multi-group portfolio. Alerts. A credible minutes trail."
              }
              detail={
                fr
                  ? "Pensé pour les programmes qui déploient des AVEC (autonomisation, résilience, protection) - pas seulement pour un groupe isolé."
                  : "Built for programs that scale AVEC groups (empowerment, resilience, protection) - not only a single isolated circle."
              }
            />
            <Link
              href="/business"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-[#C9A227]/50 px-6 text-sm font-bold text-[#C9A227] transition hover:bg-[#C9A227]/10"
            >
              {fr ? "Espace partenaires" : "Partners"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#F6E8CD]/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.14),transparent_55%)]">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:py-16">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            {fr
              ? "On ne remplace pas la confiance - on la rend vérifiable."
              : "We don't replace trust - we make it verifiable."}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex min-h-[48px] items-center rounded-full bg-[#F6E8CD] px-7 text-sm font-extrabold text-[#0F2D2F]"
            >
              {fr ? "Démarrer" : "Get started"}
            </Link>
            <Link
              href="/demo"
              className="inline-flex min-h-[48px] items-center rounded-full border border-[#C9A227]/55 px-7 text-sm font-bold text-[#C9A227]"
            >
              {fr ? "Démo Umoja" : "Umoja demo"}
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
              ? "e-AVEC n'est pas une banque · pas d'agrément BCC · McBuleli"
              : "e-AVEC is not a bank · no BCC license · McBuleli"}
          </p>
        </div>
      </section>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/10 [&_span]:text-[#F6E8CD]/55 [&_a]:text-[#C9A227]" />
    </div>
  );
}

function SectionHead({
  icon,
  title,
  detail,
}: {
  icon: "circle" | "diff" | "pillars" | "ong";
  title: string;
  detail: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <SectionIcon kind={icon} />
        <h2 className="text-xl font-black tracking-tight sm:text-2xl lg:text-[1.65rem]">
          {title}
        </h2>
      </div>
      <p className="mt-2 max-w-2xl pl-[52px] text-sm leading-relaxed text-[#F6E8CD]/65">
        {detail}
      </p>
    </div>
  );
}

function SectionIcon({ kind }: { kind: "circle" | "diff" | "pillars" | "ong" }) {
  const stroke = "#C9A227";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden className="shrink-0">
      {kind === "circle" && (
        <>
          <circle cx="20" cy="20" r="12" stroke={stroke} strokeWidth="1.8" />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return (
              <circle
                key={i}
                cx={20 + Math.cos(a) * 12}
                cy={20 + Math.sin(a) * 12}
                r="2.2"
                fill={stroke}
              />
            );
          })}
        </>
      )}
      {kind === "diff" && (
        <>
          <path d="M8 20h10M22 20h10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 14l-6 6 6 6M22 14l6 6-6 6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "pillars" && (
        <>
          <path d="M10 30V14M20 30V10M30 30V16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 30h26" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {kind === "ong" && (
        <>
          <rect x="7" y="10" width="26" height="20" rx="4" stroke={stroke} strokeWidth="1.8" />
          <path d="M12 18h16M12 24h10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function HeroMark({ fr }: { fr: boolean }) {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-[#F6E8CD]/15 bg-[#0F2D2F]/55 p-6 backdrop-blur-sm">
      <svg viewBox="0 0 280 220" className="h-auto w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="eaGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8C96A" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
          const cx = 140 + Math.cos(a) * 72;
          const cy = 100 + Math.sin(a) * 58;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="14"
              fill={i % 2 === 0 ? "url(#eaGold)" : "#F6E8CD"}
              fillOpacity={0.9}
            />
          );
        })}
        <circle cx="140" cy="100" r="36" fill="#0F2D2F" stroke="url(#eaGold)" strokeWidth="2.5" />
        <text x="140" y="96" textAnchor="middle" fill="#F6E8CD" fontSize="12" fontWeight="800" letterSpacing="0.1em">
          AVEC
        </text>
        <text x="140" y="112" textAnchor="middle" fill="#C9A227" fontSize="10" fontWeight="700">
          {fr ? "caisse visible" : "visible box"}
        </text>
      </svg>
      <p className="mt-1 text-center text-xs font-semibold text-[#F6E8CD]/55">
        {fr ? "Réunion · Vote · Passport" : "Meeting · Vote · Passport"}
      </p>
    </div>
  );
}

function PillarIcon({ kind }: { kind: "shares" | "vote" | "shield" | "passport" }) {
  const stroke = "#C9A227";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden className="shrink-0">
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
