import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session-user";
import { agentHasScope } from "@/lib/staff-scopes";
import { LogoutButton } from "@/components/LogoutButton";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const u = await getSessionUser();
  if (!u) redirect("/login");
  if (u.role !== "agent" && u.role !== "super_admin") redirect("/app");
  if (u.role === "agent" && !agentHasScope(u, "groups")) redirect("/app");

  return (
    <div className="min-h-dvh bg-[#F6E8CD] text-[#0F2D2F]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              e-AVEC Ops
            </p>
            <h1 className="text-xl font-black">Groupes AVEC</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#0F2D2F] px-3 py-1 text-xs font-bold text-[#F6E8CD]">
              {u.role}
            </span>
            <Link
              href="/app/wallet/groups"
              className="rounded-xl border border-[#0F2D2F]/15 px-3 py-1.5 text-sm font-semibold"
            >
              App
            </Link>
            <LogoutButton className="rounded-xl border border-[#0F2D2F]/15 px-3 py-1.5 text-sm font-semibold" />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
