/**
 * Dr Michel Muvudi - partenariat principal McBuleli Hackathon.
 * Contact : drmuvudi@yahoo.fr · https://www.facebook.com/MichelMuvudiOfficiel
 */
import { EMAIL_BRAND, logoUrl, partnershipPublicBaseUrl } from "@/lib/email/config";
import {
  HACKATHON_DATES_LABEL_FR,
  HACKATHON_HOURS_LABEL_FR,
  HACKATHON_VENUE_SHORT,
} from "@/lib/hackathon/event-content";
import { SUPPORT_EMAIL, SUPPORT_PHONES_DISPLAY, SUPPORT_WA_PATH } from "@/lib/support-contact";

export const MICHEL_MUVUDI_EMAIL = "drmuvudi@yahoo.fr";
export const MICHEL_MUVUDI_FACEBOOK =
  "https://www.facebook.com/MichelMuvudiOfficiel";

export type MichelMuvudiEmailCopy = {
  subject: string;
  preheader: string;
  html: string;
  text: string;
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bulletRows(items: string[]): string {
  return items
    .map(
      (item) =>
        `<tr><td style="padding:8px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">${esc(item)}</td></tr>`,
    )
    .join('<tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>');
}

export function buildMichelMuvudiPartnershipEmail(): MichelMuvudiEmailCopy {
  const hackathonUrl = `${partnershipPublicBaseUrl()}/hackathon`;
  const logo = logoUrl();
  const year = new Date().getFullYear();

  const subject =
    "Partenariat principal McBuleli Hackathon - parole & transformation idée → entreprise";
  const preheader =
    "Solutions réelles pour la RDC - Silikin Village, 28-29 août 2026. Rôle sur mesure : montrer aux développeurs comment passer du prototype à l'entreprise.";

  const expectedFromPartner = [
    "Allocution ou keynote d'ouverture : de l'idée à l'entreprise (leadership, capital humain, passage à l'action)",
    "Session courte avec les équipes : structurer un projet, clarifier le modèle et préparer le pitch",
    "Mentorat sur employabilité, concrétisation et impact socio-économique des prototypes",
    "Option relais auprès du réseau CIDE / jeunes talents pour compléter les équipes",
  ];

  const partnerGains = [
    "Visibilité nationale auprès de jeunes builders, partenaires confirmés et médias à Silikin Village",
    "Ancrage comme référence entrepreneuriat & capital humain dans l'écosystème tech congolais",
    "Accès direct aux prototypes à impact (FinTech, AgroTech, Santé-Éducation, GovTech & cybersécurité)",
    "Synergie avec une initiative orientée solutions réelles aux problèmes concrets en RDC",
  ];

  const text = [
    "Bonjour Docteur Michel Muvudi,",
    "",
    "Nous organisons le McBuleli Hackathon à Kinshasa : un programme intensif où des équipes de développeurs, designers et entrepreneurs construisent des prototypes utiles pour répondre à de vrais problèmes en RDC - pas des démos isolées, mais des pistes de solutions concrètes.",
    "",
    `Dates : ${HACKATHON_DATES_LABEL_FR} · ${HACKATHON_HOURS_LABEL_FR}`,
    `Lieu : ${HACKATHON_VENUE_SHORT}, Kinshasa`,
    `Programme : ${hackathonUrl}`,
    "",
    "Votre parcours nous semble particulièrement aligné avec cette ambition :",
    "- Gestionnaire principal en santé à la Banque mondiale, avec plus de 20 ans d'expérience en systèmes de santé et politiques publiques ;",
    "- Fondateur du Groupe CIDE Solidarité, qui forme des milliers de jeunes au leadership, à l'entrepreneuriat et au capital humain ;",
    "- Coach, conférencier et auteur, notamment autour de « Ma vie, ma première entreprise et mon capital » et des Économies Positives et Solidaires (EPSO).",
    "",
    "C'est pourquoi nous vous proposons un rôle de PARTENAIRE PRINCIPAL - parole & transformation entrepreneuriale :",
    "",
    "CE QUE NOUS VOUS PROPOSONS",
    ...expectedFromPartner.map((item) => `• ${item}`),
    "",
    "CE QUE VOUS Y GAGNEZ",
    ...partnerGains.map((item) => `• ${item}`),
    "",
    "Les équipes travailleront sur 4 défis : FinTech & inclusion · AgroTech & économie réelle · Santé & éducation · GovTech, médias & cybersécurité.",
    "",
    "Nous serions honorés de vous compter parmi les voix qui ouvrent l'événement et montrent aux participants comment transformer une idée en entreprise viable.",
    "",
    "Seriez-vous disponible pour un court échange (20-30 min) afin de caler le format (keynote, atelier, mentorat) et le calendrier ?",
    "",
    "Cordialement,",
    "McBuleli Team",
    "Mme Patty B.",
    SUPPORT_EMAIL,
    SUPPORT_PHONES_DISPLAY,
    `WhatsApp : ${SUPPORT_WA_PATH}`,
    hackathonUrl,
  ].join("\n");

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
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:${EMAIL_BRAND.white};border-radius:16px;border:1px solid ${EMAIL_BRAND.border};overflow:hidden;">
          <tr>
            <td style="padding:22px 28px 8px;border-bottom:1px solid ${EMAIL_BRAND.border};">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${esc(logo)}" width="44" height="44" alt="McBuleli" style="display:block;border:0;border-radius:50%;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:17px;font-weight:800;color:${EMAIL_BRAND.primary};letter-spacing:-0.02em;">McBuleli</p>
                    <p style="margin:2px 0 0;font-size:12px;color:${EMAIL_BRAND.muted};">Hackathon IA · Partenariat principal</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">Bonjour Docteur Michel Muvudi,</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Nous organisons le <strong style="color:${EMAIL_BRAND.text};">McBuleli Hackathon</strong> à Kinshasa :
                un programme intensif où des équipes de développeurs, designers et entrepreneurs construisent des
                <strong style="color:${EMAIL_BRAND.text};">prototypes utiles pour répondre à de vrais problèmes en RDC</strong>
                - pas des démos isolées, mais des pistes de solutions concrètes.
              </p>

              <p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Programme
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 10px;">
                <tr><td style="padding:8px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};"><strong>${esc(HACKATHON_DATES_LABEL_FR)}</strong> - Bootcamp Vibe Coding, build produit &amp; Demo Day (${esc(HACKATHON_HOURS_LABEL_FR)})</td></tr>
              </table>
              <p style="margin:0 0 16px;font-size:13px;line-height:1.45;color:${EMAIL_BRAND.muted};">
                Lieu : ${esc(HACKATHON_VENUE_SHORT)}, Kinshasa ·
                <strong style="color:${EMAIL_BRAND.text};">4 défis</strong> :
                FinTech &amp; inclusion · AgroTech · Santé &amp; éducation · GovTech, médias &amp; cybersécurité.
              </p>

              <p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Pourquoi vous contacter
              </p>
              <p style="margin:0 0 14px;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Votre parcours nous semble particulièrement aligné avec cette ambition :
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 16px;">
                <tr><td style="padding:8px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">Gestionnaire principal en santé à la <strong>Banque mondiale</strong> (Kinshasa) - systèmes de santé &amp; politiques publiques</td></tr>
                <tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>
                <tr><td style="padding:8px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">Fondateur du <strong>Groupe CIDE Solidarité</strong> - formation de milliers de jeunes (leadership, entrepreneuriat, capital humain)</td></tr>
                <tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>
                <tr><td style="padding:8px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">Coach, conférencier &amp; auteur - <em>Ma vie, ma première entreprise et mon capital</em> · formations EPSO</td></tr>
              </table>

              <p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Rôle proposé : Partenaire principal
              </p>
              <p style="margin:0 0 14px;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.text};">
                <strong>Parole &amp; transformation entrepreneuriale</strong>
                <span style="color:${EMAIL_BRAND.muted};"> - montrer aux développeurs comment passer du prototype à l'entreprise</span>
              </p>

              <p style="margin:0 0 8px;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Ce que nous vous proposons
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 16px;">
                ${bulletRows(expectedFromPartner)}
              </table>

              <p style="margin:0 0 8px;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.text};font-weight:700;">
                Ce que vous y gagnez
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 18px;">
                ${bulletRows(partnerGains)}
              </table>

              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Nous serions honorés de vous compter parmi les voix qui ouvrent l'événement.
                Seriez-vous disponible pour un court échange (20-30 min) afin de caler le format
                (keynote, atelier, mentorat) et le calendrier ?
              </p>
              <p style="margin:0 0 22px;text-align:center;">
                <a href="${esc(hackathonUrl)}" style="display:inline-block;background:${EMAIL_BRAND.primary};color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 26px;border-radius:12px;">
                  Voir le programme Hackathon
                </a>
              </p>
              <p style="margin:0 0 6px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">Cordialement,</p>
              <p style="margin:0;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">
                <strong>McBuleli Team</strong><br />
                Mme Patty B.<br />
                <a href="mailto:${SUPPORT_EMAIL}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">${SUPPORT_EMAIL}</a><br />
                ${esc(SUPPORT_PHONES_DISPLAY)}<br />
                <a href="${esc(SUPPORT_WA_PATH)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">WhatsApp</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid ${EMAIL_BRAND.border};text-align:center;">
              <p style="margin:0;font-size:11px;color:${EMAIL_BRAND.muted};">
                © ${year} McBuleli · RCCM : CD/KNG/RCCM/26-A-00382<br />
                <a href="${esc(hackathonUrl)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">mcbuleli.org/hackathon</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, preheader, html, text };
}
