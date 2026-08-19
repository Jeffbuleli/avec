/**
 * Kit diffusion affiche Hackathon AI Kinshasa - partenaires et ambassadeurs.
 * Tirets ASCII "-" dans URLs et libelles structurels.
 */
import { EMAIL_BRAND, logoUrl, partnershipPublicBaseUrl } from "@/lib/email/config";
import {
  HACKATHON_DATES_LABEL_FR,
  HACKATHON_HOURS_COMPACT_FR,
  HACKATHON_VENUE_SHORT,
} from "@/lib/hackathon/event-content";
import { partnerShareUrl } from "@/lib/hackathon/promo";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONES_DISPLAY,
  SUPPORT_WA_PATH,
} from "@/lib/support-contact";

const FONT = "'Poppins',Arial,Helvetica,sans-serif";
const RCCM = "CD/KNG/RCCM/26-A-00382";

export type AfficheDiffusionRecipient = {
  id: string;
  orgName: string;
  to: string;
  cc?: string[];
  code: string;
  /** CC hi@ on ambassador sends */
  ccHi?: boolean;
  kind: "partner" | "ambassador" | "media";
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Partenaires org (hors Silikin Village). */
export const AFFICHE_DIFFUSION_PARTNERS: AfficheDiffusionRecipient[] = [
  {
    id: "ilokwe",
    orgName: "ILOKWE GROUP",
    to: "ilokwegroup@gmail.com",
    code: "ILOKWE",
    kind: "partner",
  },
  {
    id: "kilelo",
    orgName: "Kilelo",
    to: "support@kileloapp.com",
    code: "KILELO",
    kind: "partner",
  },
  {
    id: "kimia",
    orgName: "KIMIA Service",
    to: "kimiaservice896@gmail.com",
    code: "KIMIA",
    kind: "partner",
  },
  {
    id: "sanja",
    orgName: "SanJa Service",
    to: "josephtokombe@icloud.com",
    code: "SANJA",
    kind: "partner",
  },
  {
    id: "rdpi",
    orgName: "RDPI Think Tank",
    to: "info@rdpithinktank.org",
    cc: ["maristote@rdpithinktank.org"],
    code: "RDPI",
    kind: "partner",
  },
  {
    id: "montana-pay",
    orgName: "MontanaPay",
    to: "montanadelly7@gmail.com",
    code: "MONTANAPAY",
    kind: "partner",
  },
  {
    id: "tyts",
    orgName: "TYTS",
    to: "nsomoneaaron2@gmail.com",
    code: "TYTS",
    kind: "partner",
  },
  {
    id: "ia-academie",
    orgName: "IA Academie RDC / CHK",
    to: "contact@ia-academie.cd",
    cc: ["contact@ch-kin.com"],
    code: "IAACADEMIE",
    kind: "partner",
  },
  {
    id: "e-com-sas",
    orgName: "e-COM SAS",
    to: "contact@e-comsas.com",
    cc: ["jean.andre@e-comsas.com"],
    code: "ECOMSAS",
    kind: "partner",
  },
  {
    id: "cesar-group",
    orgName: "Cesar Group",
    to: "cesargrouprdc@gmail.com",
    cc: ["contact@cesargroup-rdc.com"],
    code: "CESAR",
    kind: "partner",
  },
  {
    id: "bienv",
    orgName: "Bienv Photography 243",
    to: "bienvngonda862@gmail.com",
    code: "BIENV_PHOTO_243",
    kind: "partner",
  },
  {
    id: "hope-services",
    orgName: "Hope Services",
    to: "hopeservicesrdc0@gmail.com",
    code: "HOPESERVICES",
    kind: "partner",
  },
  {
    id: "offre-emploi",
    orgName: "Offre d'emploi RDC",
    to: "contact@offredemploirdc.com",
    code: "OFFREEMPLOIRDC",
    kind: "partner",
  },
];

/** Ambassadeurs actifs (CC hi@). */
export const AFFICHE_DIFFUSION_AMBASSADORS: AfficheDiffusionRecipient[] = [
  {
    id: "coordhec",
    orgName: "Ambassadeur COORDHEC",
    to: "gdllks66@gmail.com",
    code: "COORDHEC",
    ccHi: true,
    kind: "ambassador",
  },
  {
    id: "ista-kin",
    orgName: "Ambassadeur ISTA Kinshasa",
    to: "coordinationestudiantinedeista@gmail.com",
    code: "ISTA-KIN",
    ccHi: true,
    kind: "ambassador",
  },
  {
    id: "aleluyaprod12",
    orgName: "Aleluya Prod",
    to: "aleluyaprod12@gmail.com",
    code: "ALELUYAPROD12",
    ccHi: true,
    kind: "media",
  },
  {
    id: "kinideenews",
    orgName: "KinIdee News",
    to: "kinideenews@gmail.com",
    code: "KINIDEENEWS",
    ccHi: true,
    kind: "media",
  },
  {
    id: "manginga3",
    orgName: "Mangina Carlos",
    to: "mangingacarlos@gmail.com",
    code: "MANGINGA3",
    ccHi: true,
    kind: "media",
  },
  {
    id: "ansella",
    orgName: "AnsellA / Kuettu",
    to: "anselmk4@gmail.com",
    cc: ["ansel@kuettu.com"],
    code: "ANSELLA",
    ccHi: true,
    kind: "media",
  },
  {
    id: "envolconcept",
    orgName: "Envol Concept",
    to: "japhetnm@gmail.com",
    code: "ENVOLCONCEPT",
    ccHi: true,
    kind: "media",
  },
];

export function buildHackathonAfficheDiffusionEmail(args: {
  orgName: string;
  code: string;
  kind: AfficheDiffusionRecipient["kind"];
}): { subject: string; html: string; text: string; shareUrl: string } {
  const year = new Date().getFullYear();
  const base = partnershipPublicBaseUrl();
  const shareUrl = partnerShareUrl(args.code);
  const dates = HACKATHON_DATES_LABEL_FR.replace(/\u2013/g, "-")
    .replace(/\u2014/g, "-")
    .replace(/Août/i, "AOÛT");
  const hours = HACKATHON_HOURS_COMPACT_FR.replace(/\u2013/g, "-").replace(/\u2014/g, "-");
  const venue = HACKATHON_VENUE_SHORT;

  const subject =
    "HACKATHON AI KINSHASA - Affiche Officielle (AFFICHE TYPE) a diffuser";

  const adaptNote =
    args.kind === "partner"
      ? "Voici notre AFFICHE TYPE (Affiche Officielle). Vous pouvez la diffuser telle quelle, ou creer une variante selon la charte graphique de votre entreprise, tant que les informations clefs et votre QR promo restent lisibles."
      : "Voici notre AFFICHE TYPE (Affiche Officielle). Vous pouvez la diffuser telle quelle, ou l'adapter a votre charte (reseaux, campus, communaute), tant que le titre, les dates, le lieu et votre QR promo restent clairs.";

  const text = [
    `Bonjour ${args.orgName},`,
    "",
    "Voici notre AFFICHE TYPE - Affiche Officielle du HACKATHON AI KINSHASA.",
    "Build with AI. Create Real Solutions. - VIBE CODING",
    "",
    "Pieces jointes :",
    "- Affiche Officielle / AFFICHE TYPE (fichier principal a diffuser)",
    "- Logo McBuleli",
    "- Pack logos partenaires (hors Silikin Village et Binance)",
    `- QR code personnel promo ${args.code}`,
    "",
    adaptNote,
    "",
    "Informations a conserver sur vos visuels :",
    `- HACKATHON AI KINSHASA`,
    `- VIBE CODING`,
    `- 28-29 AOÛT 2026 - 08H00 - 17H00 - ${venue} - Kinshasa`,
    `- Lien inscription : ${shareUrl}`,
    "",
    "Regles de typo : utiliser le tiret ASCII \"-\" (pas de tiret long).",
    "",
    `Votre code promo : ${args.code}`,
    `Lien a partager : ${shareUrl}`,
    "",
    "Merci de relayer aupres de votre reseau. Contact :",
    `${SUPPORT_EMAIL} | ${SUPPORT_PHONES_DISPLAY}`,
    `WhatsApp : ${SUPPORT_WA_PATH}`,
    "",
    `${base}/hackathon`,
    "",
    `(c) ${year} McBuleli - RCCM : ${RCCM}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f1;font-family:${FONT};color:${EMAIL_BRAND.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f1;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${EMAIL_BRAND.border};">
          <tr>
            <td style="padding:22px 24px 8px;text-align:center;background:#eaf6ee;">
              <img src="${esc(logoUrl())}" alt="McBuleli" width="56" height="56" style="display:inline-block;border-radius:14px;" />
              <p style="margin:12px 0 0;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.primary};">Diffusion Hackathon</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 4px;">
              <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:700;color:${EMAIL_BRAND.text};">AFFICHE TYPE - Affiche Officielle</h1>
              <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">Bonjour <strong>${esc(args.orgName)}</strong>,</p>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.muted};">
                Voici notre <strong style="color:${EMAIL_BRAND.text};">AFFICHE TYPE</strong> (Affiche Officielle) du HACKATHON AI KINSHASA.
                En pieces jointes : le fichier principal a diffuser, le logo McBuleli, le pack logos partenaires et <strong style="color:${EMAIL_BRAND.text};">votre QR code promo ${esc(args.code)}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL_BRAND.mint};border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${EMAIL_BRAND.primary};">VIBE CODING</p>
                    <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:${EMAIL_BRAND.text};">
                      <strong>HACKATHON AI KINSHASA</strong><br />
                      Build with AI. Create Real Solutions.
                    </p>
                    <p style="margin:10px 0 0;font-size:13px;line-height:1.5;color:${EMAIL_BRAND.muted};">
                      ${esc(dates)} - ${esc(hours)}<br />
                      ${esc(venue)} - Kinshasa
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 4px;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.text};"><strong>Liberte creative :</strong> ${esc(adaptNote)}</p>
              <p style="margin:10px 0 0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND.muted};">
                Conservez au minimum le titre, VIBE CODING, les dates, le lieu et votre QR. Utilisez le tiret ASCII <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;">-</code> (pas de tiret long).
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 6px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${EMAIL_BRAND.border};border-radius:12px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${EMAIL_BRAND.primary};">Votre code promo</p>
                    <p style="margin:6px 0 0;font-size:22px;font-weight:700;letter-spacing:0.04em;color:${EMAIL_BRAND.primary};font-family:ui-monospace,Menlo,monospace;">${esc(args.code)}</p>
                    <p style="margin:10px 0 0;font-size:12px;line-height:1.5;color:${EMAIL_BRAND.muted};word-break:break-all;">
                      <a href="${esc(shareUrl)}" style="color:${EMAIL_BRAND.primary};">${esc(shareUrl)}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 22px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND.muted};">
                Merci de relayer aupres de votre reseau. Questions : <a href="mailto:${esc(SUPPORT_EMAIL)}" style="color:${EMAIL_BRAND.primary};">${esc(SUPPORT_EMAIL)}</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:${EMAIL_BRAND.muted};">(c) ${year} McBuleli - RCCM : ${esc(RCCM)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text, shareUrl };
}
