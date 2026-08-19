"use client";

import Image from "next/image";
import Link from "next/link";
import { UserAvatarMark } from "@/components/profile/user-avatar-mark";
import { BRAND_LOGO_MARK_256 } from "@/lib/brand-logo";

export function EavecTopBar({
  email,
  avatarUrl,
  isSupportStaff = false,
}: {
  email: string;
  avatarUrl: string | null;
  isSupportStaff?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Link href="/app/wallet/groups" className="flex items-center gap-2">
        <Image
          src={BRAND_LOGO_MARK_256}
          alt="e-AVEC"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-contain"
          unoptimized
        />
        <span className="text-sm font-extrabold tracking-tight text-[#0F2D2F]">
          e-AVEC
        </span>
      </Link>
      <div className="flex items-center gap-1">
        {isSupportStaff ? (
          <Link
            href="/admin/groups"
            className="rounded-full px-3 py-2 text-xs font-bold text-[#0F2D2F]/70 hover:bg-[#F6E8CD]"
          >
            Ops
          </Link>
        ) : null}
        <Link
          href="/app/profile"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center"
          aria-label={email}
        >
          <UserAvatarMark
            email={email}
            avatarUrl={avatarUrl}
            sizeClass="h-9 w-9"
          />
        </Link>
      </div>
    </div>
  );
}
