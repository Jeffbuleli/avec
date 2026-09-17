import type { Messages } from "@/i18n/messages";

export type AppNavItem = {
  href: string;
  key: keyof Messages;
};

/** Primary destinations: AVEC · Marché · Moi (wallet via profile). */
export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/app/wallet/groups", key: "nav_home" },
  { href: "/app/marche", key: "nav_wallet" },
  { href: "/app/profile", key: "nav_profile" },
];

export function isAppNavActive(pathname: string, href: string): boolean {
  if (href === "/app/wallet/groups") {
    return (
      pathname === "/app" ||
      pathname === "/app/wallet/groups" ||
      pathname.startsWith("/app/wallet/groups/")
    );
  }
  if (href === "/app/marche") {
    return pathname === "/app/marche" || pathname.startsWith("/app/marche/");
  }
  return pathname.startsWith(href);
}
