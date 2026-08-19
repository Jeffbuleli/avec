import type { Messages } from "@/i18n/messages";

export type AppNavItem = {
  href: string;
  key: keyof Messages;
};

/** Primary app destinations — AVEC first. */
export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/app/wallet/groups", key: "nav_home" },
  { href: "/app/wallet", key: "nav_wallet" },
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
  if (href === "/app/wallet") {
    return pathname === "/app/wallet";
  }
  return pathname.startsWith(href);
}
