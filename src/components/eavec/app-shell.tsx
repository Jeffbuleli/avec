"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { KycPostLoginSheet } from "@/components/kyc/kyc-post-login-sheet";
import { KycStatusPoller } from "@/components/kyc/kyc-status-poller";
import { EavecBottomNav } from "@/components/eavec/bottom-nav";
import { EavecSideNav } from "@/components/eavec/side-nav";
import { EavecTopBar } from "@/components/eavec/top-bar";

const MCBULELI_RETURN_PATH = "/app/wallet/groups";

export function EavecAppShell({
  email,
  avatarUrl,
  isSupportStaff = false,
  showReturnToMcbuleli = false,
  children,
}: {
  email: string;
  avatarUrl: string | null;
  isSupportStaff?: boolean;
  showReturnToMcbuleli?: boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const onProfile = pathname.startsWith("/app/profile");
  const onMarche = pathname.startsWith("/app/marche");
  const onAvecGroupFlow =
    pathname.startsWith("/app/wallet/groups/") &&
    pathname !== "/app/wallet/groups" &&
    !pathname.endsWith("/new") &&
    !pathname.endsWith("/join");
  const showTopBar = !onProfile && !onAvecGroupFlow && !onMarche;
  const returnLabel = locale === "fr" ? "Retour vers McBuleli" : "Back to McBuleli";

  return (
    <div
      className={`relative mx-auto flex min-h-dvh w-full min-w-0 max-w-[100%] flex-col overflow-x-hidden pt-[env(safe-area-inset-top)] pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:flex-row lg:pb-6 lg:pt-0 ${
        onMarche
          ? "max-w-none bg-[color:var(--mk-paper,#f4f7f6)]"
          : "max-w-lg bg-[var(--fd-bg)] lg:max-w-6xl xl:max-w-7xl"
      }`}
    >
      <div className="hidden lg:block">
        <EavecSideNav />
      </div>
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        {showTopBar ? (
          <div className="sticky top-0 z-40 border-b border-[color:var(--fd-border)] bg-[var(--fd-bg)] px-3 pt-2 md:px-4 lg:px-5 lg:pt-4">
            <div className="fd-app-topbar px-2 py-1.5">
              <EavecTopBar
                email={email}
                avatarUrl={avatarUrl}
                isSupportStaff={isSupportStaff}
              />
            </div>
          </div>
        ) : null}
        <main
          className={`min-w-0 flex-1 overflow-x-hidden ${
            onMarche
              ? "px-3 pt-0 sm:px-4 md:px-5 lg:mx-auto lg:w-full lg:max-w-6xl lg:px-6 xl:max-w-7xl"
              : onAvecGroupFlow
                ? "px-3 pt-0 sm:px-4 lg:px-6"
                : "px-3 pt-2 sm:px-4 lg:px-6"
          }`}
        >
          {showReturnToMcbuleli && !onMarche ? (
            <div className="mb-3">
              <Link
                href={`/app/mcbuleli-handoff?next=${encodeURIComponent(MCBULELI_RETURN_PATH)}`}
                className="min-h-[44px] inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 text-sm font-semibold text-white active:scale-[0.99]"
              >
                {returnLabel}
              </Link>
            </div>
          ) : null}
          {children}
        </main>
        <div className="lg:hidden">
          <EavecBottomNav marcheWorld={onMarche} />
        </div>
      </div>
      <KycStatusPoller />
      <KycPostLoginSheet />
    </div>
  );
}
