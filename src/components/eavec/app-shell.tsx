"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { OfflineOverlay } from "@/components/mobile/offline-overlay";
import { KycPostLoginSheet } from "@/components/kyc/kyc-post-login-sheet";
import { KycStatusPoller } from "@/components/kyc/kyc-status-poller";
import { EavecBottomNav } from "@/components/eavec/bottom-nav";
import { EavecSideNav } from "@/components/eavec/side-nav";
import { EavecTopBar } from "@/components/eavec/top-bar";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";

export function EavecAppShell({
  email,
  avatarUrl,
  isSupportStaff = false,
  children,
}: {
  email: string;
  avatarUrl: string | null;
  isSupportStaff?: boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const onProfile = pathname.startsWith("/app/profile");
  const onAvecGroupFlow =
    pathname.startsWith("/app/wallet/groups/") &&
    pathname !== "/app/wallet/groups" &&
    !pathname.endsWith("/new") &&
    !pathname.endsWith("/join");
  const showTopBar = !onProfile && !onAvecGroupFlow;

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
        <main className="flex-1 px-4 pt-2 md:px-5 lg:px-6">{children}</main>
        <div className="hidden lg:block px-5">
          <McBuleliPoweredFooter />
        </div>
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
