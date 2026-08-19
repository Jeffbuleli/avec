import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getLocale } from "@/lib/get-locale";
import { I18nProvider } from "@/components/i18n-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalLangSwitch } from "@/components/conditional-lang-switch";
import { OfflineProvider } from "@/components/offline/offline-provider";
import { RegisterServiceWorker } from "@/components/pwa/register-service-worker";
import { PwaInstallBanner } from "@/components/pwa/install-banner";
import { SessionRefresher } from "@/components/auth/session-refresher";
import { CANONICAL_PRODUCTION_ORIGIN, getMetadataOrigin } from "@/lib/app-url";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const metadataBaseUrl = getMetadataOrigin() || undefined;

const desc =
  "e-AVEC — associations villageoises d’épargne et de crédit numériques. Parts, caisse sociale, crédits internes et gouvernance. USD, CDF et Mobile Money.";

const ogImageAlt = "e-AVEC — digital village savings groups";

export const metadata: Metadata = {
  ...(metadataBaseUrl ? { metadataBase: new URL(metadataBaseUrl) } : {}),
  other: { google: "notranslate" },
  title: {
    default: "e-AVEC — épargne et crédit de groupe",
    template: "%s · e-AVEC",
  },
  description: desc,
  applicationName: "e-AVEC",
  openGraph: {
    type: "website",
    siteName: "e-AVEC",
    title: "e-AVEC — digital village savings groups",
    description: desc,
    url: CANONICAL_PRODUCTION_ORIGIN,
    locale: "fr_CD",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "e-AVEC — digital village savings groups",
    description: desc,
    images: [{ url: "/opengraph-image", alt: ogImageAlt }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/icons/icon-192.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "e-AVEC",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2D2F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      translate="no"
      className={`notranslate ${poppins.variable} ${poppins.className} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full text-[#0F2D2F]">
        <ThemeProvider>
          <I18nProvider initialLocale={locale}>
            <OfflineProvider>
              <RegisterServiceWorker />
              <ConditionalLangSwitch />
              <PwaInstallBanner />
              <SessionRefresher />
              {children}
            </OfflineProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
