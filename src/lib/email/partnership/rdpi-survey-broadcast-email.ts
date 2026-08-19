/**
 * Broadcast Resend — invitation enquête RDPI (expéditeur RDPI).
 * Footer : Powered by McBuleli uniquement.
 */
export const RDPI_SURVEY_BROADCAST_SUBJECT =
  "Enquête RDPI · Fiscalité & secteur numérique en RDC — votre participation";

export const RDPI_SURVEY_BROADCAST_FROM_HINT =
  "RDPI Think Tank <noreply@cyberalert-rdc.org>";

/** Compte Resend Cyber Alert. */
export const RDPI_SURVEY_BROADCAST_CYBER_ALERT_FROM =
  "RDPI Think Tank <noreply@cyberalert-rdc.org>";

export const RDPI_SURVEY_BROADCAST_CONTACT_EMAIL = "info@rdpithinktank.org";
export const RDPI_SURVEY_BROADCAST_WHATSAPP = "+243 994 558 660";
export const RDPI_SURVEY_BROADCAST_WHATSAPP_URL = "https://wa.me/243994558660";
export const RDPI_SURVEY_URL = "https://mcbuleli.org/rdpi";

/** Placeholder Resend Broadcasts (Audience). */
export const RESEND_BROADCAST_UNSUBSCRIBE = "{{{RESEND_UNSUBSCRIBE_URL}}}";

const RDPI_BLUE = "#1E5EFF";
const RDPI_GOLD = "#E8B923";
const RDPI_INK = "#0A0A0A";
const RDPI_LOGO =
  "https://mcbuleli.org/partners/rdpi-thinktank-logo.png?v=20260807c";
const MCBULELI_MARK = "https://mcbuleli.org/brand/logo-mark-256.png";
const MCBULELI_X = "https://x.com/McBuleli";

export function buildRdpiSurveyBroadcastEmail(opts?: {
  /** Inclut le lien désabonnement Resend Broadcasts. */
  resendBroadcast?: boolean;
}) {
  const resendBroadcast = Boolean(opts?.resendBroadcast);
  const text = [
    "Bonjour,",
    "",
    "Dans le contexte de l'arrêté interministériel n°015/CAB/MIN/EN/AKIM/MLNS/ALM/2026 et CAB/MIN/FINACES/2026/096, le Research for Development and Prosperity Institute (RDPI Think Tank) mène une étude afin d'évaluer les effets de cette fiscalité sur l'entrepreneuriat, l'innovation et le développement du secteur numérique en République démocratique du Congo.",
    "",
    "Votre expérience de terrain est essentielle. En répondant au questionnaire (environ 8 à 10 minutes), vous contribuez à des recommandations fondées sur la réalité des acteurs du numérique.",
    "",
    "Les réponses sont destinées à la présente recherche et traitées de manière confidentielle.",
    "",
    `Participer à l'enquête : ${RDPI_SURVEY_URL}`,
    "",
    "Pourquoi participer ?",
    "• Faire entendre la voix des startups, fintechs, développeurs et entreprises numériques.",
    "• Éclairer les décideurs sur les effets concrets du barème sur l'investissement et l'innovation.",
    "• Soutenir une étude indépendante menée par RDPI Think Tank.",
    "",
    "Une question ?",
    `WhatsApp : ${RDPI_SURVEY_BROADCAST_WHATSAPP}`,
    RDPI_SURVEY_BROADCAST_WHATSAPP_URL,
    "",
    "Cordialement,",
    "L'équipe RDPI Think Tank",
    RDPI_SURVEY_BROADCAST_CONTACT_EMAIL,
    "https://rdpithinktank.org/",
    "",
    "Powered by McBuleli",
    MCBULELI_X,
    "https://mcbuleli.org/",
    ...(resendBroadcast
      ? ["", `Se désabonner : ${RESEND_BROADCAST_UNSUBSCRIBE}`]
      : []),
  ].join("\n");

  const whyRows = [
    {
      n: "01",
      title: "Faire entendre votre voix",
      body: "Startups, fintechs, développeurs et entreprises numériques.",
    },
    {
      n: "02",
      title: "Éclairer les décideurs",
      body: "Effets concrets du barème sur l'investissement et l'innovation.",
    },
    {
      n: "03",
      title: "Soutenir une étude indépendante",
      body: "Recherche menée par RDPI Think Tank.",
    },
  ]
    .map(
      (row) => `
                <tr>
                  <td style="padding:0 0 10px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f8fc;border:1px solid #e8eaf2;border-radius:14px;">
                      <tr>
                        <td style="width:52px;padding:14px 0 14px 14px;vertical-align:top;">
                          <div style="width:36px;height:36px;border-radius:10px;background:${RDPI_INK};color:${RDPI_GOLD};font-size:12px;font-weight:800;letter-spacing:0.04em;line-height:36px;text-align:center;">${row.n}</div>
                        </td>
                        <td style="padding:14px 16px 14px 8px;vertical-align:middle;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:800;line-height:1.35;color:${RDPI_INK};">${row.title}</p>
                          <p style="margin:0;font-size:13px;line-height:1.45;color:#5b6475;">${row.body}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${RDPI_SURVEY_BROADCAST_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:#e9edf8;font-family:Georgia,'Times New Roman',serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    Votre voix compte — enquête RDPI Think Tank · fiscalité du numérique en RDC · 8 à 10 minutes.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#e9edf8;padding:32px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #d7dde8;box-shadow:0 10px 28px rgba(15,23,42,0.06);">
          <!-- Gold accent -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${RDPI_GOLD} 0%,${RDPI_BLUE} 55%,${RDPI_INK} 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding:28px 28px 22px;background:${RDPI_INK};" align="center">
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="padding:12px 16px;background:#ffffff;border-radius:14px;">
                    <img src="${RDPI_LOGO}" width="176" height="70" alt="RDPI Think Tank" style="display:block;border:0;width:176px;height:auto;max-width:100%;" />
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${RDPI_GOLD};">RDPI Think Tank</p>
              <p style="margin:8px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:500;line-height:1.45;color:rgba(255,255,255,0.78);">Research for Development and Prosperity Institute</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:30px 28px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${RDPI_BLUE};">Invitation à participer</p>
              <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:${RDPI_INK};">
                Fiscalité &amp; secteur numérique en RDC
              </h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3f4654;">Bonjour,</p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3f4654;">
                Dans le contexte de l'arrêté interministériel
                <strong style="color:${RDPI_INK};">n°015/CAB/MIN/EN/AKIM/MLNS/ALM/2026</strong>
                et
                <strong style="color:${RDPI_INK};">CAB/MIN/FINACES/2026/096</strong>,
                le <strong style="color:${RDPI_INK};">RDPI Think Tank</strong>
                évalue les effets de cette fiscalité sur l'entrepreneuriat, l'innovation et le développement du numérique en RDC.
              </p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3f4654;">
                Votre expérience de terrain est essentielle. Le questionnaire prend environ
                <strong style="color:${RDPI_INK};">8 à 10 minutes</strong>.
              </p>
              <p style="margin:0 0 22px;font-size:14px;line-height:1.6;color:#6b7280;">
                Réponses confidentielles, destinées uniquement à la présente recherche.
              </p>

              <!-- CTA primary -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 10px;">
                <tr>
                  <td style="border-radius:12px;background:${RDPI_BLUE};">
                    <a href="${RDPI_SURVEY_URL}" style="display:inline-block;padding:15px 28px;font-size:15px;font-weight:700;letter-spacing:0.01em;color:#ffffff;text-decoration:none;">Participer à l'enquête →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 26px;font-size:12px;line-height:1.5;color:#8b93a3;">
                <a href="${RDPI_SURVEY_URL}" style="color:${RDPI_BLUE};text-decoration:none;font-weight:600;">mcbuleli.org/rdpi</a>
              </p>

              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${RDPI_INK};">Pourquoi participer</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                ${whyRows}
              </table>

              <!-- Contact strip -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;background:#f4f7ff;border:1px solid #dbe4ff;border-radius:14px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${RDPI_BLUE};">Une question ?</p>
                    <p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#3f4654;">Notre équipe est disponible sur WhatsApp ou par email.</p>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius:10px;background:#25d366;">
                          <a href="${RDPI_SURVEY_BROADCAST_WHATSAPP_URL}" style="display:inline-block;padding:11px 18px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;">WhatsApp · ${RDPI_SURVEY_BROADCAST_WHATSAPP}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 2px;font-size:15px;line-height:1.55;color:#3f4654;">Cordialement,</p>
              <p style="margin:0 0 4px;font-size:15px;line-height:1.55;font-weight:800;color:${RDPI_INK};">L'équipe RDPI Think Tank</p>
              <p style="margin:0 0 2px;font-size:13px;line-height:1.5;">
                <a href="mailto:${RDPI_SURVEY_BROADCAST_CONTACT_EMAIL}" style="color:${RDPI_BLUE};text-decoration:none;font-weight:600;">${RDPI_SURVEY_BROADCAST_CONTACT_EMAIL}</a>
              </p>
              <p style="margin:0 0 10px;font-size:12px;line-height:1.5;">
                <a href="https://rdpithinktank.org/" style="color:#8b93a3;text-decoration:none;">rdpithinktank.org</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px 22px;border-top:1px solid #e8eaf2;background:#fafbfe;" align="center">
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;color:#a0a8b6;">Powered by</td>
                  <td style="vertical-align:middle;padding-right:6px;">
                    <img src="${MCBULELI_MARK}" width="20" height="20" alt="" style="display:block;border:0;border-radius:50%;background:#ffffff;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <a href="${MCBULELI_X}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:800;color:#305f33;text-decoration:none;">McBuleli</a>
                  </td>
                </tr>
              </table>
              ${
                resendBroadcast
                  ? `<p style="margin:14px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.5;color:#a0a8b6;">
                <a href="${RESEND_BROADCAST_UNSUBSCRIBE}" style="color:#a0a8b6;text-decoration:underline;">Se désabonner</a>
              </p>`
                  : ""
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject: RDPI_SURVEY_BROADCAST_SUBJECT,
    html,
    text,
  };
}
