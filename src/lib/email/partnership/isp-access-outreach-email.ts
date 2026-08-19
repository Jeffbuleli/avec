/**
 * McBuleli ISP outreach: Starlink kits, cybercafés / hôtels, entreprises (accès).
 * 1:1 opens on what the company already offers, then how ISP makes it easy.
 */
import { EMAIL_BRAND, logoUrl } from "@/lib/email/config";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_DISPLAY_ALT,
  SUPPORT_WA_PATH,
} from "@/lib/support-contact";

const PHONES = `${SUPPORT_PHONE_DISPLAY} - ${SUPPORT_PHONE_DISPLAY_ALT}`;

export type IspAccessSegment = "starlink" | "hotspot" | "entreprise" | "broadcast";

export type IspAccessLead = {
  id: string;
  company: string;
  email: string;
  city: string;
  website: string | null;
  segment: Exclude<IspAccessSegment, "broadcast">;
  /** What they already sell / operate — first paragraph of a 1:1 email. */
  offer: string;
  /** How McBuleli ISP makes that offer easy. */
  ease: string;
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** High-fit leads from annuaire FEC / SECTEURS (emails already in our files). */
export const ISP_ACCESS_LEADS: IspAccessLead[] = [
  {
    id: "afrinet",
    company: "AFRINET",
    email: "info@afrinet.cd",
    city: "Kinshasa",
    website: "www.afrinet.cd",
    segment: "starlink",
    offer:
      "AFRINET fournit déjà l'accès Internet aux entreprises et particuliers à Kinshasa : le lien est votre métier.",
    ease:
      "McBuleli ISP s'occupe du reste : forfaits à l'heure ou au mois, vouchers, portail client et caisse Mobile Money - sans tableur, un espace par site.",
  },
  {
    id: "cielux",
    company: "Cielux Telecom RDC",
    email: "p.muland@cielux.cd",
    city: "Kinshasa",
    website: "www.cielux.cd",
    segment: "starlink",
    offer:
      "Cielux opère déjà des services télécoms en RDC : connectivité, abonnés, points d'accès.",
    ease:
      "McBuleli ISP rend la facturation simple : tickets, forfaits USD/CDF, MikroTik et caisse Mobile Money - essai 30 jours.",
  },
  {
    id: "iburst",
    company: "iBurst RDC",
    email: "shalini.moodley@iburstafrica.com",
    city: "Kinshasa",
    website: "www.iburstafrica.com",
    segment: "starlink",
    offer:
      "iBurst propose déjà l'accès Internet sans fil : vos clients veulent se connecter, vous voulez facturer proprement.",
    ease:
      "Avec McBuleli ISP, chaque forfait devient un voucher ou un abonnement, suivi en temps réel, encaissé en Mobile Money.",
  },
  {
    id: "stc",
    company: "STC",
    email: "info@stc-cd.com",
    city: "Kinshasa",
    website: "www.stc-cd.com",
    segment: "starlink",
    offer:
      "STC vend déjà des services télécoms locaux : le réseau est en place, la caisse et les tickets restent souvent manuels.",
    ease:
      "McBuleli ISP automatise forfaits, vouchers et MikroTik. Vous facturez l'accès comme un FAI, essai Pro 30 jours.",
  },
  {
    id: "standard-telecom",
    company: "Standard Telecom Congo",
    email: "sk@stelecom.cd",
    city: "Kinshasa",
    website: "www.stelecom.cd",
    segment: "starlink",
    offer:
      "Standard Telecom Congo opère un réseau d'accès : kits, lignes, abonnés.",
    ease:
      "McBuleli ISP transforme cet accès en offre vendable : 1 h / 1 jour / 30 jours, Mobile Money, contrôle de qui est en ligne.",
  },
  {
    id: "ub-telecom",
    company: "UB Telecom",
    email: "ceo@ub-telecom.com",
    city: "Kinshasa",
    website: null,
    segment: "starlink",
    offer:
      "UB Telecom fournit déjà de la connectivité : le client paie pour l'accès, pas pour un logiciel.",
    ease:
      "McBuleli ISP est l'espace FAI prêt : forfaits, vouchers, caisse USD-CDF, retrait vers votre Mobile Money. Visible en 30 minutes.",
  },
  {
    id: "dhi-telecom",
    company: "DHI Telecom",
    email: "laurent.kazadi@dhitelecom.com",
    city: "Kinshasa",
    website: null,
    segment: "starlink",
    offer:
      "DHI Telecom déploie déjà des solutions d'accès (hotspot, PPPoE, sites clients).",
    ease:
      "McBuleli ISP relie le routeur à la caisse : tickets, sessions, Mobile Money - plus de suivi sur papier.",
  },
  {
    id: "radiocom",
    company: "RADIOCOM SPRL",
    email: "info@radiocom.cd",
    city: "Kinshasa",
    website: "www.radiocom.cd",
    segment: "starlink",
    offer:
      "RADIOCOM commercialise déjà du matériel radio et télécoms : beaucoup de vos clients revendent ensuite de l'accès (Starlink, hotspot).",
    ease:
      "McBuleli ISP leur (ou à vous) donne les vouchers et la caisse : le kit connecte, le logiciel facture. Transférez ce message à un revendeur proche.",
  },
  {
    id: "microcom",
    company: "MICROCOM",
    email: "ntleon@micronet.cd",
    city: "Kinshasa",
    website: "www.micronet.cd",
    segment: "starlink",
    offer:
      "MICROCOM accompagne déjà des clients NTIC / télécoms : réseaux, accès, équipements.",
    ease:
      "McBuleli ISP est l'outil à proposer autour d'un Starlink ou d'un MikroTik : forfaits, tickets, Mobile Money, un espace par client.",
  },
  {
    id: "grand-hotel",
    company: "Grand Hotel Kinshasa",
    email: "grandhotelkinshasa@gh.cd",
    city: "Kinshasa",
    website: "www.gh.cd",
    segment: "hotspot",
    offer:
      "Le Grand Hotel accueille déjà clients, salles et événements : le Wi-Fi fait partie du service, souvent avec un mot de passe unique.",
    ease:
      "McBuleli ISP le rend simple pour la réception : tickets 1 h / 1 jour / 7 jours, encaissement Mobile Money, sessions visibles. Plus de code partagé.",
  },
  {
    id: "memling",
    company: "Hotel Memling",
    email: "memling@memling.net",
    city: "Kinshasa",
    website: "www.memling.net",
    segment: "hotspot",
    offer:
      "Le Memling offre déjà l'hospitalité et l'accès Internet aux clients : la réception gère chambres, pas les sessions Wi-Fi.",
    ease:
      "McBuleli ISP donne à la réception des vouchers à durée, une caisse USD/CDF et un suivi des connexions - comme un cybercafé, sans en être un.",
  },
  {
    id: "venus",
    company: "Hotel Venus",
    email: "reception@venushotel.cd",
    city: "Kinshasa",
    website: "www.venushotel.cd",
    segment: "hotspot",
    offer:
      "L'Hôtel Venus accueille déjà des clients qui demandent le Wi-Fi à la réception.",
    ease:
      "McBuleli ISP permet de vendre ou d'offrir l'accès à l'heure ou à la journée : un ticket, un paiement Mobile Money, c'est tout.",
  },
  {
    id: "beatrice",
    company: "Beatrice Hotel",
    email: "info@beatricehotel.com",
    city: "Kinshasa",
    website: "www.beatricehotel.com",
    segment: "hotspot",
    offer:
      "Beatrice Hotel propose déjà l'hébergement et le Wi-Fi invité : aujourd'hui souvent un seul mot de passe pour tout le monde.",
    ease:
      "McBuleli ISP remplace ça par des tickets contrôlés (durée, caisse, agent réception) - le même besoin qu'un cybercafé, en plus simple.",
  },
  {
    id: "hotel-invest",
    company: "Hotel Invest",
    email: "info@hotelinvests.com",
    city: "Kinshasa",
    website: "www.hotelinvests.com",
    segment: "hotspot",
    offer:
      "Hotel Invest gère déjà plusieurs sites d'accueil : chaque établissement a son Wi-Fi clients.",
    ease:
      "McBuleli ISP donne un espace par site, des vouchers et des agents réception. Même logique partout, caisse Mobile Money centralisable.",
  },
  {
    id: "is-rdc",
    company: "Informatic Solutions (IS RDC)",
    email: "infos@is-rdc.com",
    city: "Kinshasa",
    website: "is-rdc.com",
    segment: "entreprise",
    offer:
      "IS RDC intègre déjà des solutions IT pour des entreprises, camps et hôtels : le réseau est livré, la gestion d'accès reste souvent à part.",
    ease:
      "McBuleli ISP est l'espace FAI que vous pouvez proposer à vos clients : forfaits, vouchers, MikroTik, essai 30 jours. Ou l'utiliser sur vos propres sites.",
  },
  {
    id: "kinshasa-digital",
    company: "Kinshasa Digital",
    email: "info@kinshasadigital.com",
    city: "Kinshasa",
    website: "www.kinshasadigital.com",
    segment: "entreprise",
    offer:
      "Kinshasa Digital anime déjà l'écosystème digital local : FAI, revendeurs Starlink, hôtels et PME passent par votre réseau.",
    ease:
      "McBuleli ISP leur simplifie la vente d'accès (tickets, caisse, MikroTik). Transférez ce message à un proche qui revend déjà de la connectivité.",
  },
  {
    id: "jobantech",
    company: "JOBANTECH",
    email: "promed@jobantech.cd",
    city: "Kinshasa",
    website: null,
    segment: "entreprise",
    offer:
      "JOBANTECH déploie déjà de l'IT sur des sites clients : réseaux, postes, accès Internet.",
    ease:
      "McBuleli ISP ajoute la couche manquante : qui se connecte, combien de temps, comment on encaisse. MikroTik + caisse, sans Excel.",
  },
  {
    id: "delta-protection",
    company: "Delta Protection",
    email: "alain.timsit@deltaprotection.cd",
    city: "Kinshasa",
    website: "www.deltaprotection.cd",
    segment: "entreprise",
    offer:
      "Delta Protection sécurise déjà des sites : staff, visiteurs et sous-traitants passent par vos accès.",
    ease:
      "McBuleli ISP gère le Wi-Fi comme le contrôle d'accès : durée, vouchers, pas de SSID ouvert. Utile au poste de garde comme au bureau.",
  },
];

const SEGMENT_KICKER: Record<Exclude<IspAccessSegment, "broadcast">, string> = {
  starlink: "Kits Starlink & FAI",
  hotspot: "Cybercafé, hôtel, salle",
  entreprise: "Entreprises & accès",
};

const BROADCAST_OFFER =
  "En RDC, beaucoup vendent déjà des kits Starlink, tiennent un cybercafé ou un hôtel, ou doivent gérer l'accès Internet en entreprise. C'est votre métier : connecter les gens.";

const BROADCAST_EASE =
  "McBuleli ISP rend ça très simple : un espace par entreprise, des forfaits, des vouchers, MikroTik et la caisse Mobile Money. Essai 30 jours. Vous pouvez l'utiliser, le proposer à un client, ou transférer ce message à un proche qui revend déjà de l'accès.";

export function ispAccessSubject(segment: IspAccessSegment, company?: string): string {
  const name = company?.trim();
  if (segment === "broadcast") {
    return "McBuleli ISP - facturer l'accès (Starlink, cybercafé, entreprise)";
  }
  if (segment === "starlink") {
    return name
      ? `${name} : facturer l'accès que vous vendez déjà`
      : "Facturer l'accès autour de Starlink";
  }
  if (segment === "hotspot") {
    return name
      ? `${name} : Wi-Fi invité sans mot de passe unique`
      : "Wi-Fi invité pour hôtel et cybercafé";
  }
  return name
    ? `${name} : gérer les accès Internet de vos sites`
    : "Gérer les accès Internet en entreprise";
}

function cardRow(inner: string): string {
  return `<tr><td style="padding:14px 16px;background:${EMAIL_BRAND.mint};border:1px solid ${EMAIL_BRAND.border};border-radius:12px;font-size:14px;line-height:1.5;color:${EMAIL_BRAND.text};">${inner}</td></tr>`;
}

function cardGap(): string {
  return `<tr><td style="height:10px;font-size:0;line-height:0;">&nbsp;</td></tr>`;
}

function howItWorksTable(): string {
  const rows = [
    ["1. Espace", "Inscription sur isp.mcbuleli.org - essai Pro 30 jours."],
    ["2. Forfaits", "1 h / 1 jour / 7 jours / 30 jours, USD ou CDF."],
    ["3. Accès", "Vouchers, tickets, portail client, script MikroTik."],
    [
      "4. Réabonnement",
      "Par Mobile Money (Airtel, Orange et M-Pesa).",
    ],
  ];
  return rows
    .map(
      ([k, v], i) =>
        `${cardRow(`<strong>${esc(k)}</strong> - ${esc(v)}`)}${
          i < rows.length - 1 ? cardGap() : ""
        }`,
    )
    .join("");
}

function broadcastAudienceCards(): string {
  const cards = [
    ["Starlink & FAI", "Le kit connecte. McBuleli ISP facture forfaits et vouchers."],
    ["Cybercafé & hôtel", "Tickets à durée, agent à la réception, plus de mot de passe unique."],
    ["Entreprise", "Staff, visiteurs, sites : qui se connecte, combien de temps."],
  ];
  return `<p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">Pour qui</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 18px;">
                ${cards
                  .map(
                    ([t, d], i) =>
                      `${cardRow(`<strong>${esc(t)}</strong><br />${esc(d)}`)}${
                        i < cards.length - 1 ? cardGap() : ""
                      }`,
                  )
                  .join("")}
              </table>`;
}

export function buildIspAccessOutreachEmail(args: {
  segment: IspAccessSegment;
  company?: string;
  offer?: string;
  ease?: string;
  greeting?: string;
}): { subject: string; preheader: string; html: string; text: string } {
  const company = args.company?.trim() || "";
  const subject = ispAccessSubject(args.segment, company || undefined);
  const logo = logoUrl();
  const year = new Date().getFullYear();
  const isBroadcast = args.segment === "broadcast";
  const kicker = isBroadcast
    ? "Starlink - cybercafé - entreprise"
    : SEGMENT_KICKER[args.segment as Exclude<IspAccessSegment, "broadcast">];
  const greeting =
    args.greeting?.trim() ||
    (company ? `Bonjour l'équipe ${company},` : "Bonjour,");
  const offer = args.offer?.trim() || (isBroadcast ? BROADCAST_OFFER : "");
  const ease = args.ease?.trim() || (isBroadcast ? BROADCAST_EASE : "");
  const preheader = isBroadcast
    ? "Vous vendez déjà l'accès. McBuleli ISP facture : forfaits, vouchers, MikroTik. Réabonnement Mobile Money. Essai 30 jours."
    : `${company || "Votre offre"} + McBuleli ISP : forfaits, vouchers, réabonnement Mobile Money. Essai 30 jours.`;
  const signup = "https://isp.mcbuleli.org/signup";
  const wifiZone = "https://isp.mcbuleli.org/wifi-zone";
  const site = "https://isp.mcbuleli.org";
  const audienceBlock = isBroadcast ? broadcastAudienceCards() : "";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.mint};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${EMAIL_BRAND.mint};padding:28px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:${EMAIL_BRAND.white};border-radius:16px;border:1px solid ${EMAIL_BRAND.border};overflow:hidden;">
          <tr>
            <td style="padding:22px 28px 8px;border-bottom:1px solid ${EMAIL_BRAND.border};">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${esc(logo)}" width="44" height="44" alt="McBuleli" style="display:block;border:0;border-radius:50%;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:17px;font-weight:800;color:${EMAIL_BRAND.primary};letter-spacing:-0.02em;">McBuleli ISP</p>
                    <p style="margin:2px 0 0;font-size:12px;color:${EMAIL_BRAND.muted};">${esc(kicker)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">${esc(greeting)}</p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">${esc(offer)}</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">${esc(ease)}</p>

              ${audienceBlock}

              <p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Comment ça marche
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 18px;">
                ${howItWorksTable()}
              </table>

              <p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Tarifs
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 18px;">
                ${cardRow(
                  `Essential <strong>10 USD / mois</strong> - Pro <strong>15 USD / mois</strong> - Premium sur devis.<br />Annuaire public : <a href="${esc(wifiZone)}" style="color:${EMAIL_BRAND.primary};font-weight:700;text-decoration:none;">isp.mcbuleli.org/wifi-zone</a>`,
                )}
              </table>

              <p style="margin:0 0 22px;text-align:center;">
                <a href="${esc(signup)}" style="display:inline-block;background:${EMAIL_BRAND.primary};color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 26px;border-radius:12px;">
                  Essai gratuit 30 jours
                </a>
              </p>
              <p style="margin:0 0 6px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">Cordialement,</p>
              <p style="margin:0;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">
                <strong>McBuleli Team</strong><br />
                Mme Patty B.<br />
                <a href="mailto:${SUPPORT_EMAIL}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">${SUPPORT_EMAIL}</a><br />
                ${esc(PHONES)}<br />
                WhatsApp :
                <a href="${esc(SUPPORT_WA_PATH)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">écrire sur WhatsApp</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid ${EMAIL_BRAND.border};text-align:center;">
              <p style="margin:0;font-size:11px;color:${EMAIL_BRAND.muted};">
                © ${year} McBuleli - RCCM : CD/KNG/RCCM/26-A-00382<br />
                <a href="${esc(site)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">isp.mcbuleli.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    greeting,
    "",
    offer,
    "",
    ease,
    "",
    ...(isBroadcast
      ? [
          "Pour qui",
          "- Starlink & FAI : le kit connecte. McBuleli ISP facture forfaits et vouchers.",
          "- Cybercafé & hôtel : tickets à durée, agent à la réception, plus de mot de passe unique.",
          "- Entreprise : staff, visiteurs, sites - qui se connecte, combien de temps.",
          "",
        ]
      : []),
    "Comment ça marche",
    "1. Espace - inscription sur https://isp.mcbuleli.org - essai Pro 30 jours.",
    "2. Forfaits - 1 h / 1 jour / 7 jours / 30 jours, USD ou CDF.",
    "3. Accès - vouchers, tickets, portail client, MikroTik.",
    "4. Réabonnement - par Mobile Money (Airtel, Orange et M-Pesa).",
    "",
    "Tarifs : Essential 10 USD/mois - Pro 15 USD/mois - Premium sur devis.",
    `Annuaire : ${wifiZone}`,
    `Essai : ${signup}`,
    "",
    "Cordialement,",
    "McBuleli Team",
    "Mme Patty B.",
    SUPPORT_EMAIL,
    PHONES,
    `WhatsApp : ${SUPPORT_WA_PATH}`,
    site,
  ].join("\n");

  return { subject, preheader, html, text };
}

