/**
 * Accès admin plateforme ISP (mcbuleli.live) — associés McBuleli.
 */
import { renderMcBuleliEmail } from "@/lib/email/layout";

export const ISP_PLATFORM_URL = "https://mcbuleli.live";
export const ISP_LOGIN_URL = `${ISP_PLATFORM_URL}/login`;
export const ISP_FORGOT_URL = `${ISP_PLATFORM_URL}/login`;

export type IspAdminRecipient = {
  email: string;
  fullName: string;
  tempPassword: string;
  roleLabel?: string;
};

export type IspAdminAccessEmail = {
  subject: string;
  html: string;
  text: string;
};

export function buildIspAdminAccessEmail(
  recipient: IspAdminRecipient,
  opts?: { testPrefix?: boolean },
): IspAdminAccessEmail {
  const role = recipient.roleLabel ?? "Administrateur plateforme (super_admin)";
  const firstName =
    recipient.fullName.split(/\s+/).filter(Boolean)[0] || recipient.fullName;
  const subjectBase = "Accès admin McBuleli ISP — mcbuleli.live";
  const subject = opts?.testPrefix ? `[TEST] ${subjectBase}` : subjectBase;

  const recoveryHtml = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:380px;text-align:left;">
  <tr>
    <td style="padding:12px 14px;background:#e8f3ee;border:1px solid #d6d3d1;border-radius:12px;font-size:13px;line-height:1.5;color:#57534e;">
      <strong style="color:#0c0a09;">Récupération</strong><br />
      Sur la page de connexion, ouvrez <em>Mot de passe oublié</em>, indiquez
      <strong style="color:#0c0a09;">${escapeHtml(recipient.email)}</strong>,
      puis suivez le lien reçu pour définir un nouveau mot de passe.
    </td>
  </tr>
</table>`;

  const { html, text } = renderMcBuleliEmail({
    locale: "fr",
    illustration: "security",
    actionUrl: ISP_LOGIN_URL,
    useInlineImages: false,
    extraHtml: recoveryHtml,
    copy: {
      subject,
      preheader:
        "Votre accès administrateur à la plateforme ISP McBuleli est prêt. Connexion + mot de passe temporaire.",
      title: `Bonjour ${firstName}`,
      body: "En tant qu'associé McBuleli, vous avez désormais un accès administrateur à la plateforme ISP (gestion réseaux, abonnés, paiements). Connectez-vous avec les identifiants ci-dessous, puis changez immédiatement le mot de passe temporaire.",
      cta: "Ouvrir mcbuleli.live",
      expiry:
        "Sécurité : changez le mot de passe à la première connexion. Ne transférez pas cet email.",
      footerHelp: "Besoin d'aide ?",
      footerContact: "Contactez-nous",
    },
    detailRows: [
      { label: "Plateforme", value: ISP_PLATFORM_URL },
      { label: "Email de connexion", value: recipient.email },
      { label: "Mot de passe temporaire", value: recipient.tempPassword },
      { label: "Rôle", value: role },
      { label: "Action requise", value: "Changer le mot de passe à la 1re connexion" },
    ],
  });

  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Associés ISP — mots de passe temporaires (must_change_password). */
export const ISP_ADMIN_ASSOCIATES: IspAdminRecipient[] = [
  {
    email: "jmtechrdc@gmail.com",
    fullName: "JM Tech RDC",
    tempPassword: "PIaetMS1ukYG",
  },
  {
    email: "jeanmarcmbobutu4@gmail.com",
    fullName: "Jean-Marc Mbobutu",
    tempPassword: "SuSfELtSsP75",
  },
];
