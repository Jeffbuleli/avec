/**
 * Africa Insight - mail d'approche partenaires médias.
 * Cartes Poppins (même structure que McBuleli Hackathon campus).
 * Accents FR ; tirets ASCII "-".
 */
export const AFRICA_INSIGHT_SITE_URL = "https://www.africa-insight.org";
export const AFRICA_INSIGHT_LOGO =
  "https://www.africa-insight.org/logo-africa-insight-mark.png";
export const AFRICA_INSIGHT_FROM = "Jeff Buleli - Africa Insight <info@africa-insight.org>";
export const AFRICA_INSIGHT_REPLY_TO = "info@africa-insight.org";

const FONT = "'Poppins',Arial,Helvetica,sans-serif";

const C = {
  pageBg: "#ebe6db",
  card: "#ffffff",
  headerBg: "#f7f4ee",
  inner: "#f7f4ee",
  border: "#d6d0c4",
  primary: "#1a2b48",
  accent: "#b89128",
  accentMuted: "#6f5210",
  muted: "#57534e",
  footer: "#78716c",
  ink: "#1c1917",
} as const;

export type AfricaInsightPartnerIntroProfile = {
  greeting: string;
  orgName: string;
  /** Ce que fait l'entreprise - toujours en premier. */
  theirWork: string;
  /** Avantage concret pour eux - juste après. */
  theirGain: string;
};

export const AFRICA_INSIGHT_INTRO_DEFAULT: AfricaInsightPartnerIntroProfile = {
  greeting: "Bonjour,",
  orgName: "Partenaire médias",
  theirWork:
    "Vous produisez de l'information pour un public qui a besoin de contexte, pas seulement d'une alerte. C'est le trou que nous cherchons à combler depuis Kinshasa : une lecture régulière, bilingue, de ce qui se passe en Afrique.",
  theirGain:
    "Un partenariat vous donne un flux recoupé les 15 et 30, déjà classé par pays, en français et en anglais. Vous gagnez du terrain sur les Grands Lacs et le Sahel sans envoyer un correspondant. Nous gagnons un relais crédible. L'essai d'un mois sert à vérifier que le brief vous est utile - pas à vendre un abonnement à froid.",
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function asciiHyphens(value: string): string {
  return value.replace(/[—–]/g, "-");
}

function sectionCard(title: string, bodyHtml: string): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 14px;font-family:${FONT};">
    <tr>
      <td style="padding:16px 16px 14px;background:${C.inner};border:1px solid ${C.border};border-radius:14px;font-family:${FONT};">
        ${title ? `<p style="margin:0 0 10px;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${C.accentMuted};font-family:${FONT};">${esc(title)}</p>` : ""}
        ${bodyHtml}
      </td>
    </tr>
  </table>`;
}

function bulletRows(items: string[]): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-family:${FONT};">${items
    .map(
      (item, i) => `<tr>
      <td style="padding:9px 12px;background:${C.card};border:1px solid ${C.border};border-radius:10px;font-size:14px;line-height:1.5;color:${C.ink};font-family:${FONT};">
        ${esc(item)}
      </td>
    </tr>${
      i < items.length - 1
        ? `<tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>`
        : ""
    }`,
    )
    .join("")}</table>`;
}

export type AfricaInsightPartnerIntroEmail = {
  subject: string;
  preheader: string;
  html: string;
  text: string;
  from: string;
  replyTo: string;
};

export function buildAfricaInsightPartnerIntroEmail(
  profile: AfricaInsightPartnerIntroProfile = AFRICA_INSIGHT_INTRO_DEFAULT,
): AfricaInsightPartnerIntroEmail {
  const greeting = asciiHyphens(profile.greeting);
  const orgName = asciiHyphens(profile.orgName);
  const theirWork = asciiHyphens(profile.theirWork.trim());
  const theirGain = asciiHyphens(profile.theirGain.trim());
  const year = new Date().getFullYear();
  const subject = asciiHyphens(
    `Africa Insight x ${orgName} - proposition de partenariat`,
  );
  const preheader = asciiHyphens(
    "Nous avons lu votre travail. Voici pourquoi un brief bilingue les 15 et 30 peut vous servir.",
  );

  const countries = [
    "RDC - rédaction à Kinshasa",
    "Rwanda, Soudan, Mali, Ouganda",
    "Djibouti, Burkina Faso, Niger",
  ];
  const offer = [
    "Un brief pays (2 pages) après chaque cycle - les 15 et 30",
    "Embargo 24 h, puis publication sur africa-insight.org",
    "Français et anglais, mêmes piliers : politique, économie, société, justice, sécurité",
    "Essai d'un mois (2 briefs), sans engagement",
  ];
  const legal = [
    "ABELI BULELI JEFF - MC BULELI",
    "RCCM (Registre du commerce et du crédit mobilier) : CD/KNG/RCCM/26-A-00382",
    "IDNAT (Identification nationale) : 01-G4701-N91309X",
    "Av. des Écuries, Jolis parcs, Ngaliema, Kinshasa",
  ];

  const text = [
    greeting,
    "",
    `Votre travail - ${orgName}`,
    theirWork,
    "",
    "Ce que vous y gagnez",
    theirGain,
    "",
    "Je suis Jeff Buleli, fondateur de McBuleli à Kinshasa. Africa Insight est notre média d'analyse : une lecture de ce qui se passe en Afrique, en français et en anglais.",
    "",
    "Méthode. Des correspondants locaux nous envoient un aperçu de leur pays les 15 et 30 du mois. Nous assemblons à Kinshasa, classons par pays, et publions.",
    "",
    "Couverture",
    ...countries.map((l) => `- ${l}`),
    "",
    "Proposition",
    ...offer.map((l) => `- ${l}`),
    "",
    `Lire le site : ${AFRICA_INSIGHT_SITE_URL}`,
    "",
    "Identité légale de McBuleli",
    ...legal.map((l) => `- ${l}`),
    "",
    "Si un essai d'un mois vous convient, répondez à cet e-mail. Nous calons le premier pays ensemble.",
    "",
    "Bien cordialement,",
    "Jeff Buleli",
    "Fondateur - McBuleli / Africa Insight",
    AFRICA_INSIGHT_REPLY_TO,
    AFRICA_INSIGHT_SITE_URL,
  ]
    .map(asciiHyphens)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <title>${esc(subject)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a, p, h1 { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:${C.pageBg};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.pageBg};padding:28px 16px;font-family:${FONT};">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:${C.card};border-radius:18px;border:1px solid ${C.border};overflow:hidden;font-family:${FONT};">
          <tr>
            <td align="center" style="padding:26px 28px 18px;background:${C.headerBg};border-bottom:1px solid ${C.border};font-family:${FONT};">
              <img src="${esc(AFRICA_INSIGHT_LOGO)}" width="188" height="73" alt="Africa Insight" style="display:block;margin:0 auto;border:0;width:188px;height:auto;" />
              <p style="margin:12px 0 0;font-size:12px;font-weight:500;line-height:1.45;color:${C.accentMuted};font-family:${FONT};">L'Afrique expliquée - pas seulement racontée · FR / EN</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;font-family:${FONT};">
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${C.ink};font-family:${FONT};">${esc(greeting)}</p>

              <p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${C.accentMuted};font-family:${FONT};">Votre travail</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${C.muted};font-family:${FONT};">${esc(theirWork)}</p>

              <p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${C.accentMuted};font-family:${FONT};">Ce que vous y gagnez</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${C.muted};font-family:${FONT};">${esc(theirGain)}</p>

              ${sectionCard(
                "",
                `<p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${C.accentMuted};font-family:${FONT};">Qui nous sommes</p>
                <p style="margin:0 0 14px;font-size:14px;line-height:1.55;color:${C.ink};font-family:${FONT};">Je suis <strong>Jeff Buleli</strong>, fondateur de McBuleli, entreprise technologique à Kinshasa. Africa Insight est notre média d'analyse : une lecture de ce qui se passe en Afrique, en français et en anglais.</p>
                <p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${C.accentMuted};font-family:${FONT};">Méthode</p>
                <p style="margin:0;font-size:14px;line-height:1.55;color:${C.ink};font-family:${FONT};">Des correspondants locaux nous envoient un aperçu de leur pays les <strong>15 et 30</strong> du mois. Nous assemblons à Kinshasa, classons par pays, et publions. Ce n'est pas une dépêche - c'est une compréhension.</p>`,
              )}
              ${sectionCard("Couverture", bulletRows(countries))}
              ${sectionCard("Proposition", bulletRows(offer))}
              ${sectionCard("Identité légale de McBuleli", bulletRows(legal))}

              <p style="margin:6px 0 22px;text-align:center;font-family:${FONT};">
                <a href="${esc(AFRICA_INSIGHT_SITE_URL)}" style="display:inline-block;background:${C.primary};color:#f7f4ee;text-decoration:none;font-size:15px;font-weight:700;padding:14px 26px;border-radius:12px;font-family:${FONT};">
                  Lire Africa Insight
                </a>
              </p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${C.muted};font-family:${FONT};">
                Si un essai d'un mois vous convient, répondez à cet e-mail. Nous calons le premier pays ensemble.
              </p>
              <p style="margin:0 0 6px;font-size:15px;line-height:1.6;color:${C.ink};font-family:${FONT};">Bien cordialement,</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:${C.ink};font-family:${FONT};">
                <strong>Jeff Buleli</strong><br />
                Fondateur - McBuleli / Africa Insight<br />
                <a href="mailto:${esc(AFRICA_INSIGHT_REPLY_TO)}" style="color:${C.accent};text-decoration:none;">${esc(AFRICA_INSIGHT_REPLY_TO)}</a><br />
                <a href="${esc(AFRICA_INSIGHT_SITE_URL)}" style="color:${C.accentMuted};text-decoration:none;">www.africa-insight.org</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid ${C.border};text-align:center;background:${C.headerBg};font-family:${FONT};">
              <p style="margin:0;font-size:11px;line-height:1.55;color:${C.footer};font-family:${FONT};">
                © ${year} Africa Insight · Produit de McBuleli · Kinshasa<br />
                RCCM : CD/KNG/RCCM/26-A-00382<br />
                IDNAT : 01-G4701-N91309X
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject,
    preheader,
    html,
    text,
    from: AFRICA_INSIGHT_FROM,
    replyTo: AFRICA_INSIGHT_REPLY_TO,
  };
}
