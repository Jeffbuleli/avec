import type { Messages } from "@/i18n/messages";

export type AppNavId = "home" | "marche" | "avec" | "wallet" | "profile";

export type AppNavItem = {
  id: AppNavId;
  href: string;
  key: keyof Messages;
};

/** Primary destinations: Home · Marché · AVEC · Wallet · Profile */
export const APP_NAV_ITEMS: AppNavItem[] = [
  { id: "home", href: "/app/home", key: "nav_home" },
  { id: "marche", href: "/app/marche", key: "nav_wallet" },
  { id: "avec", href: "/app/wallet/groups", key: "nav_home" },
  { id: "wallet", href: "/app/wallet", key: "nav_wallet" },
  { id: "profile", href: "/app/profile", key: "nav_profile" },
];

export function isAppNavActive(pathname: string, href: string): boolean {
  if (href === "/app/home") {
    return pathname === "/app" || pathname === "/app/home";
  }
  if (href === "/app/wallet/groups") {
    return (
      pathname === "/app/wallet/groups" ||
      pathname.startsWith("/app/wallet/groups/")
    );
  }
  if (href === "/app/wallet") {
    return (
      pathname === "/app/wallet" ||
      (pathname.startsWith("/app/wallet/") &&
        !pathname.startsWith("/app/wallet/groups"))
    );
  }
  if (href === "/app/marche") {
    return pathname === "/app/marche" || pathname.startsWith("/app/marche/");
  }
  return pathname.startsWith(href);
}
