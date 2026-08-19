/**
 * Ministère de l'Économie Numérique (RDC) - demande Partenaire principal Hackathon.
 * Bref, sur mesure : axes stratégiques MEN + budget transparent + RDV.
 *
 * Refs:
 * - https://economienumerique.gouv.cd/ministere
 * - https://economienumerique.gouv.cd/le-ministre (S.E. Augustin Kibassa Maliba)
 */
import { EMAIL_BRAND } from "@/lib/email/config";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONES_DISPLAY,
  SUPPORT_WA_PATH,
} from "@/lib/support-contact";

export const MEN_BUDGET_URL = "https://mcbuleli.org/hackathon/budget";
export const MEN_HACKATHON_URL = "https://mcbuleli.org/hackathon";
export const MEN_MINISTRY_URL = "https://economienumerique.gouv.cd/ministere";

export const MEN_TO = "secretariat@economienumerique.gouv.cd";
export const MEN_CC = ["info@economienumerique.gouv.cd"] as const;

const RCCM = "CD/KNG/RCCM/26-A-00382";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildMenPrincipalPartnerEmail(): {
  subject: string;
  html: string;
  text: string;
} {
  const subject =
    "McBuleli Hackathon × Ministère de l'Économie Numérique - Partenaire principal";
  const year = new Date().getFullYear();

  const text = `Excellence Monsieur le Ministre,
Madame, Monsieur le Secrétaire Général,

Le McBuleli Hackathon (28-29 août 2026, Silikin Village, Kinshasa) forme des builders congolais à l'IA pratique (Vibe Coding) et livre des prototypes utiles (FinTech, GovTech, santé, agri, éducation, cybersécurité).

Nous sollicitons le Ministère de l'Économie Numérique comme Partenaire principal - en appui direct à vos axes :
- Économie numérique & innovation (start-ups / PME tech)
- Compétences numériques & culture digitale
- Technologies émergentes (IA) au service de la performance publique

Ce que le Ministère y gagne
- Local (Kinshasa) : vitrine concrète DRC Digital Nation auprès des jeunes, médias et partenaires déjà engagés (Silikin, FinTech, campus).
- National : signal d'État pour la formation IA pratique, et base de réplication McBuleli dans d'autres villes et provinces.
- Souveraineté talents : pipeline de compétences locales, pas seulement de discours.

Budget transparent (salle, restauration, media, marketing) :
${MEN_BUDGET_URL}

Programme : ${MEN_HACKATHON_URL}

Prochaine étape : un rendez-vous de 20-30 min - en ligne ou en présentiel (Concession Safricas, 14 av. Sergent Moke, Ngaliema) - pour caler le niveau de partenariat principal et le soutien budgétaire.

Nous restons à votre disposition pour convenir d'un créneau.

Respectueusement,
L'équipe McBuleli
${SUPPORT_EMAIL}
${SUPPORT_PHONES_DISPLAY}
WhatsApp : ${SUPPORT_WA_PATH}

© ${year} McBuleli · RCCM : ${RCCM}
Réf. ministère : ${MEN_MINISTRY_URL}
`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.mint};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Partenaire principal Hackathon IA - budget transparent &amp; RDV.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${EMAIL_BRAND.mint};padding:28px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:540px;background:${EMAIL_BRAND.white};border-radius:16px;border:1px solid ${EMAIL_BRAND.border};overflow:hidden;">
          <tr>
            <td style="padding:20px 26px 10px;border-bottom:1px solid ${EMAIL_BRAND.border};">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="https://mcbuleli.org/brand/logo-256.png" width="40" height="40" alt="McBuleli" style="display:block;border:0;border-radius:50%;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:16px;font-weight:800;color:${EMAIL_BRAND.primary};letter-spacing:-0.02em;">McBuleli</p>
                    <p style="margin:2px 0 0;font-size:12px;color:${EMAIL_BRAND.muted};">Hackathon IA · Partenaire principal</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 26px 8px;">
              <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:${EMAIL_BRAND.text};">
                Excellence Monsieur le Ministre,<br />
                Madame, Monsieur le Secrétaire Général,
              </p>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Le <strong style="color:${EMAIL_BRAND.text};">McBuleli Hackathon</strong>
                (28-29 août 2026, Silikin Village, Kinshasa) forme des builders congolais à l'<strong style="color:${EMAIL_BRAND.text};">IA pratique</strong>
                et livre des prototypes utiles (FinTech, GovTech, santé, agri, éducation, cybersécurité).
              </p>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Nous sollicitons le Ministère comme
                <strong style="color:${EMAIL_BRAND.text};">Partenaire principal</strong>
                - en appui direct à vos axes
                <a href="${esc(MEN_MINISTRY_URL)}" style="color:${EMAIL_BRAND.primary};font-weight:600;">économie numérique &amp; innovation</a>,
                compétences digitales, et technologies émergentes (IA).
              </p>

              <p style="margin:0 0 8px;font-size:13px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.primary};">
                Ce que le Ministère y gagne
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 14px;">
                <tr>
                  <td style="padding:10px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">
                    <strong>Local (Kinshasa)</strong> - vitrine concrète DRC Digital Nation auprès des jeunes, médias et partenaires déjà engagés.
                  </td>
                </tr>
                <tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>
                <tr>
                  <td style="padding:10px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">
                    <strong>National</strong> - signal d'État pour la formation IA pratique, et base de réplication McBuleli dans d'autres villes et provinces.
                  </td>
                </tr>
                <tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>
                <tr>
                  <td style="padding:10px 12px;background:${EMAIL_BRAND.mint};border-radius:10px;font-size:14px;line-height:1.45;color:${EMAIL_BRAND.text};">
                    <strong>Souveraineté talents</strong> - pipeline de compétences locales, pas seulement de discours.
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Budget transparent (salle, restauration, media, marketing) - chiffres clairs :
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 10px;">
                <tr>
                  <td style="border-radius:10px;background:${EMAIL_BRAND.primary};">
                    <a href="${esc(MEN_BUDGET_URL)}" style="display:inline-block;padding:12px 20px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                      Voir le budget
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 14px;font-size:13px;line-height:1.5;color:#78716c;">
                <a href="${esc(MEN_BUDGET_URL)}" style="color:${EMAIL_BRAND.primary};font-weight:600;">mcbuleli.org/hackathon/budget</a>
                ·
                <a href="${esc(MEN_HACKATHON_URL)}" style="color:${EMAIL_BRAND.primary};font-weight:600;">Programme</a>
              </p>

              <p style="margin:0 0 8px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                <strong style="color:${EMAIL_BRAND.text};">Prochaine étape :</strong>
                un rendez-vous de 20-30 min - <strong style="color:${EMAIL_BRAND.text};">en ligne ou en présentiel</strong>
                (Concession Safricas, 14 av. Sergent Moke, Ngaliema) - pour caler le partenariat principal et le soutien budgétaire.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">
                Nous restons à votre disposition pour convenir d'un créneau.
              </p>

              <p style="margin:18px 0 6px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">Respectueusement,</p>
              <p style="margin:0;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.text};">
                <strong>L'équipe McBuleli</strong><br />
                <a href="mailto:${esc(SUPPORT_EMAIL)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">${esc(SUPPORT_EMAIL)}</a><br />
                ${esc(SUPPORT_PHONES_DISPLAY)}<br />
                WhatsApp :
                <a href="${esc(SUPPORT_WA_PATH)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">écrire sur WhatsApp</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 26px 24px;border-top:1px solid ${EMAIL_BRAND.border};text-align:center;">
              <p style="margin:0;font-size:11px;color:${EMAIL_BRAND.muted};">
                © ${year} McBuleli · RCCM : ${esc(RCCM)}<br />
                <a href="${esc(MEN_MINISTRY_URL)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">economienumerique.gouv.cd/ministere</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
