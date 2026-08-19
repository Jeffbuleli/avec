"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { OfflineOverlay } from "@/components/mobile/offline-overlay";
import { KycPostLoginSheet } from "@/components/kyc/kyc-post-login-sheet";
import { KycStatusPoller } from "@/components/kyc/kyc-status-poller";
import { EavecBottomNav } from "@/components/eavec/bottom-nav";
import { EavecSideNav } from "@/components/eavec/side-nav";
import { EavecTopBar } from "@/components/eavec/top-bar";
import { OfflineStatusBar } from "@/components/offline/offline-status-bar";

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
  const onAvecGroupFlow =
    pathname.startsWith("/app/wallet/groups/") &&
    pathname !== "/app/wallet/groups" &&
    !pathname.endsWith("/new") &&
    !pathname.endsWith("/join");
  const showTopBar = !onProfile && !onAvecGroupFlow;
  const returnLabel = locale === "fr" ? "Retour vers McBuleli" : "Back to McBuleli";

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-[var(--fd-bg)] pt-[env(safe-area-inset-top)] pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:max-w-6xl lg:flex-row lg:pb-6 lg:pt-0">
      <div className="hidden lg:block">
        <EavecSideNav />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {showTopBar ? (
          <div className="sticky top-0 z-40 px-3 pt-2 lg:px-5 lg:pt-4">
            <div className="fd-app-topbar px-2 py-1.5">
              <EavecTopBar
                email={email}
                avatarUrl={avatarUrl}
                isSupportStaff={isSupportStaff}
              />
            </div>
          </div>
        ) : null}
        <main className="flex-1 px-4 pt-2 md:px-5 lg:px-6">
          {showReturnToMcbuleli ? (
            <div className="mb-3">
              <Link
                href={`/app/mcbuleli-handoff?next=${encodeURIComponent(MCBULELI_RETURN_PATH)}`}
                className="min-h-[44px] inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 text-sm font-semibold text-white active:scale-[0.99]"
              >
                {returnLabel}
              </Link>
            </div>
          ) : null}
          <div className="mb-3">
            <OfflineStatusBar />
          </div>
          {children}
        </main>
        <div className="lg:hidden">
          <EavecBottomNav />
        </div>
      </div>
      <KycStatusPoller />
      <KycPostLoginSheet />
      <OfflineOverlay />
    </div>
  );
}
