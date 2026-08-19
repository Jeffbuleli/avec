/**
 * Broadcast / test - vidéo Hackathon Facebook + TikTok.
 *
 * - mcbuleli : carte McBuleli (mint / vert)
 * - africa   : carte Africa Insight (beige / navy) - même format que les outreach AI
 *
 * Brands: mcbuleli (RESEND_API_KEY) · africa (RESEND_AFRICA)
 */
import { EMAIL_BRAND, logoUrl } from "@/lib/email/config";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONES_DISPLAY,
  SUPPORT_WA_PATH,
} from "@/lib/support-contact";

export const HACKATHON_VIDEO_FB =
  "https://www.facebook.com/share/v/1GKTX7osK2/";
export const HACKATHON_VIDEO_TIKTOK = "https://vm.tiktok.com/ZN8RaaoY5/";
export const HACKATHON_PAGE_URL = "https://mcbuleli.org/hackathon";
export const AFRICA_INSIGHT_SITE_URL = "https://www.africa-insight.org";
export const AFRICA_INSIGHT_LOGO =
  "https://www.africa-insight.org/logo-africa-insight-mark.png";

export const RESEND_BROADCAST_UNSUBSCRIBE = "{{{RESEND_UNSUBSCRIBE_URL}}}";

export type HackathonVideoBroadcastBrand = "mcbuleli" | "africa";

const AFRICA = {
  pageBg: "#ebe6db",
  card: "#ffffff",
  headerBg: "#f7f4ee",
  border: "#d6d0c4",
  borderSoft: "#ebe6db",
  primary: "#1a2b48",
  accent: "#b89128",
  accentMuted: "#6f5210",
  muted: "#57534e",
  footer: "#78716c",
  ctaText: "#f7f4ee",
} as const;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function hackathonVideoFromHint(
  brand: HackathonVideoBroadcastBrand,
): string {
  if (brand === "africa") {
    return (
      process.env.RESEND_AFRICA_EMAIL_FROM?.trim() ||
      "Africa Insight <info@africa-insight.org>"
    );
  }
  return (
    process.env.PARTNERSHIP_EMAIL_FROM?.trim() ||
    `McBuleli Team <${SUPPORT_EMAIL}>`
  );
}

export function buildHackathonVideoBroadcastEmail(opts: {
  brand: HackathonVideoBroadcastBrand;
  resendBroadcast?: boolean;
}): { subject: string; html: string; text: string; fromHint: string } {
  const resendBroadcast = Boolean(opts.resendBroadcast);
  const isAfrica = opts.brand === "africa";
  const year = new Date().getFullYear();
  const fromHint = hackathonVideoFromHint(opts.brand);

  const subject = isAfrica
    ? "Africa Insight - vidéo du McBuleli Hackathon à Kinshasa"
    : "McBuleli Hackathon Kinshasa - une courte vidéo à voir";

  const greeting = "Bonjour,";

  const p1 = isAfrica
    ? "Nous partageons une courte vidéo du McBuleli Hackathon à Kinshasa : formation à l'IA pratique, builders et Demo Day au Silikin Village (28-29 août 2026)."
    : "Nous venons de publier une courte vidéo du McBuleli Hackathon : builders, formation Vibe Coding (Cursor, Claude, Codex) et Demo Day au Silikin Village, les 28-29 août 2026.";

  const p2 = isAfrica
    ? "Elle donne un aperçu concret de ce qui se prépare pour l'écosystème numérique en RDC. Si le sujet vous intéresse, vous pouvez la regarder ici :"
    : "Si vous voulez voir le ton de l'événement avant de vous inscrire ou de le partager, la vidéo est ici :";

  const text = [
    greeting,
    "",
    p1,
    "",
    p2,
    "",
    `TikTok : ${HACKATHON_VIDEO_TIKTOK}`,
    `Facebook : ${HACKATHON_VIDEO_FB}`,
    "",
    `Programme : ${HACKATHON_PAGE_URL}`,
    "",
    isAfrica
      ? `Bien cordialement,\nAfrica Insight editorial\ninfo@africa-insight.org\n${AFRICA_INSIGHT_SITE_URL}`
      : `Bien cordialement,\nL'équipe McBuleli\n${SUPPORT_EMAIL}\n${SUPPORT_PHONES_DISPLAY}\nWhatsApp : ${SUPPORT_WA_PATH}`,
    "",
    `© ${year} ${isAfrica ? "Africa Insight" : "McBuleli"}`,
    ...(resendBroadcast
      ? ["", `Se désabonner : ${RESEND_BROADCAST_UNSUBSCRIBE}`]
      : []),
  ].join("\n");

  const html = isAfrica
    ? buildAfricaCardHtml({
        subject,
        greeting,
        p1,
        p2,
        year,
        resendBroadcast,
      })
    : buildMcbuleliCardHtml({
        subject,
        greeting,
        p1,
        p2,
        year,
        resendBroadcast,
      });

  return { subject, html, text, fromHint };
}

function buildAfricaCardHtml(args: {
  subject: string;
  greeting: string;
  p1: string;
  p2: string;
  year: number;
  resendBroadcast: boolean;
}): string {
  const unsub = args.resendBroadcast
    ? `<p style="margin:10px 0 0;font-size:11px;"><a href="${RESEND_BROADCAST_UNSUBSCRIBE}" style="color:${AFRICA.footer};text-decoration:underline;">Se désabonner</a></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${esc(args.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${AFRICA.pageBg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Hackathon Kinshasa - vidéo Silikin Village.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${AFRICA.pageBg};padding:28px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:${AFRICA.card};border-radius:16px;border:1px solid ${AFRICA.border};overflow:hidden;">
          <tr>
            <td style="padding:22px 28px 14px;border-bottom:1px solid ${AFRICA.borderSoft};background:${AFRICA.headerBg};">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${esc(AFRICA_INSIGHT_LOGO)}" width="44" height="44" alt="Africa Insight" style="display:block;border:0;border-radius:10px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:17px;font-weight:800;color:${AFRICA.primary};letter-spacing:-0.02em;">Africa Insight</p>
                    <p style="margin:2px 0 0;font-size:12px;color:${AFRICA.accentMuted};">Independent African analysis · FR / EN</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${AFRICA.primary};">${esc(args.greeting)}</p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${AFRICA.muted};">${esc(args.p1)}</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:${AFRICA.muted};">${esc(args.p2)}</p>
              <p style="margin:0 0 10px;text-align:center;">
                <a href="${esc(HACKATHON_VIDEO_TIKTOK)}" style="display:inline-block;background:${AFRICA.accent};color:#1c1917;text-decoration:none;font-size:15px;font-weight:700;padding:14px 26px;border-radius:12px;">Regarder sur TikTok</a>
              </p>
              <p style="margin:0 0 18px;text-align:center;">
                <a href="${esc(HACKATHON_VIDEO_FB)}" style="display:inline-block;background:${AFRICA.primary};color:${AFRICA.ctaText};text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:12px;">Regarder sur Facebook</a>
              </p>
              <p style="margin:0 0 18px;font-size:14px;line-height:1.5;color:${AFRICA.muted};text-align:center;">
                Programme :
                <a href="${esc(HACKATHON_PAGE_URL)}" style="color:${AFRICA.accent};font-weight:600;text-decoration:none;">mcbuleli.org/hackathon</a>
              </p>
              <p style="margin:0 0 6px;font-size:15px;line-height:1.55;color:${AFRICA.primary};">Bien cordialement,</p>
              <p style="margin:0;font-size:15px;line-height:1.55;color:${AFRICA.primary};">
                <strong>Africa Insight editorial</strong><br />
                <a href="mailto:info@africa-insight.org" style="color:${AFRICA.accent};text-decoration:none;">info@africa-insight.org</a><br />
                <a href="${esc(AFRICA_INSIGHT_SITE_URL)}" style="color:${AFRICA.accentMuted};text-decoration:none;">www.africa-insight.org</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid ${AFRICA.borderSoft};text-align:center;">
              <p style="margin:0;font-size:11px;line-height:1.5;color:${AFRICA.footer};">
                © ${args.year} Africa Insight · Independent African analysis<br />
                <a href="${esc(AFRICA_INSIGHT_SITE_URL)}" style="color:${AFRICA.accent};text-decoration:none;">africa-insight.org</a>
              </p>
              ${unsub}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildMcbuleliCardHtml(args: {
  subject: string;
  greeting: string;
  p1: string;
  p2: string;
  year: number;
  resendBroadcast: boolean;
}): string {
  const unsub = args.resendBroadcast
    ? `<p style="margin:10px 0 0;font-size:11px;"><a href="${RESEND_BROADCAST_UNSUBSCRIBE}" style="color:${EMAIL_BRAND.muted};text-decoration:underline;">Se désabonner</a></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${esc(args.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.mint};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Hackathon Kinshasa - vidéo Silikin Village.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${EMAIL_BRAND.mint};padding:28px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:${EMAIL_BRAND.white};border-radius:16px;border:1px solid ${EMAIL_BRAND.border};overflow:hidden;">
          <tr>
            <td style="padding:18px 24px 10px;border-bottom:1px solid ${EMAIL_BRAND.border};">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${esc(logoUrl())}" width="40" height="40" alt="McBuleli" style="display:block;border:0;border-radius:50%;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:16px;font-weight:800;color:${EMAIL_BRAND.primary};letter-spacing:-0.02em;">McBuleli</p>
                    <p style="margin:2px 0 0;font-size:12px;color:${EMAIL_BRAND.muted};">Hackathon IA · Kinshasa</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 8px;">
              <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">${esc(args.greeting)}</p>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">${esc(args.p1)}</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.muted};">${esc(args.p2)}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 10px;">
                <tr>
                  <td align="center" style="padding:0 0 10px;">
                    <a href="${esc(HACKATHON_VIDEO_TIKTOK)}" style="display:inline-block;padding:12px 22px;border-radius:10px;background:${EMAIL_BRAND.text};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Regarder sur TikTok</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 10px;">
                    <a href="${esc(HACKATHON_VIDEO_FB)}" style="display:inline-block;padding:12px 22px;border-radius:10px;background:${EMAIL_BRAND.primary};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Regarder sur Facebook</a>
                  </td>
                </tr>
              </table>
              <p style="margin:8px 0 0;text-align:center;font-size:13px;">
                <a href="${esc(HACKATHON_PAGE_URL)}" style="color:${EMAIL_BRAND.primary};font-weight:600;text-decoration:none;">mcbuleli.org/hackathon</a>
              </p>
              <p style="margin:18px 0 6px;font-size:15px;color:${EMAIL_BRAND.text};">Bien cordialement,</p>
              <p style="margin:0;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.text};">
                <strong>L'équipe McBuleli</strong><br />
                <a href="mailto:${esc(SUPPORT_EMAIL)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">${esc(SUPPORT_EMAIL)}</a><br />
                ${esc(SUPPORT_PHONES_DISPLAY)} · <a href="${esc(SUPPORT_WA_PATH)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">WhatsApp</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px 22px;border-top:1px solid ${EMAIL_BRAND.border};text-align:center;">
              <p style="margin:0;font-size:11px;color:${EMAIL_BRAND.muted};">© ${args.year} McBuleli</p>
              ${unsub}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
