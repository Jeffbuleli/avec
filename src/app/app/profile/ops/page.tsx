import { redirect } from "next/navigation";
import Link from "next/link";
import { ProfileSubpageHeader } from "@/components/profile/profile-subpage-header";
import { getAdminDashboardStats } from "@/lib/admin-dashboard-stats";
import { getDictionary } from "@/i18n/messages";
import { getLocale } from "@/lib/get-locale";
import { countEavecMarketPendingReview } from "@/lib/eavec-market/service";
import { getSessionUser } from "@/lib/session-user";
import { agentHasScope } from "@/lib/staff-scopes";
import { UserRole } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function ProfileOpsPage() {
  const locale = await getLocale();
  const fr = locale === "fr";
  const d = getDictionary(locale);
  const user = await getSessionUser();
  const staff = user?.role === "agent" || user?.role === "super_admin";
  if (!staff || !user) redirect("/app/profile");

  const [stats, marketPending] = await Promise.all([
    getAdminDashboardStats(),
    countEavecMarketPendingReview(),
  ]);
  const isSuper = user.role === UserRole.SUPER_ADMIN;
  const showW = isSuper || agentHasScope(user, "withdrawals");

  const items: Array<{
    href: string;
    title: string;
    desc: string;
    badge: number | null;
  }> = [
    {
      href: "/admin/groups",
      title: fr ? "Groupes AVEC" : "AVEC groups",
      desc: fr ? "Validation et suivi des caisses" : "Review and manage groups",
      badge: stats.groupsPendingReview > 0 ? stats.groupsPendingReview : null,
    },
    {
      href: "/app/profile/ops/marche",
      title: fr ? "Marché — annonces" : "Market listings",
      desc: fr
        ? "Approuver les produits avant publication"
        : "Approve products before publish",
      badge: marketPending > 0 ? marketPending : null,
    },
  ];
  if (showW) {
    items.push({
      href: "/admin/withdrawals?status=PENDING_AGENT&assignFilter=all",
      title: fr ? "Retraits MoMo" : "MoMo withdrawals",
      desc: fr ? "File agent retraits" : "Agent withdrawal queue",
      badge:
        stats.withdrawalsPendingAgent > 0 ? stats.withdrawalsPendingAgent : null,
    });
  }
  if (isSuper) {
    items.push({
      href: "/admin/kyc",
      title: "KYC",
      desc: fr ? "Identités membres" : "Member identities",
      badge: null,
    });
    items.push({
      href: "/admin/users",
      title: fr ? "Membres" : "Members",
      desc: fr ? "Comptes e-AVEC" : "e-AVEC accounts",
      badge: null,
    });
  }

  const totalPending = items.reduce((s, i) => s + (i.badge ?? 0), 0);

  return (
    <>
      <ProfileSubpageHeader
        title={d.ops}
        subtitle={fr ? "Outils e-AVEC uniquement" : "e-AVEC tools only"}
      />
      <div className="space-y-3">
        <div className="fd-card px-4 py-4">
          <p className="text-[10px] font-bold uppercase text-[var(--fd-muted)]">
            {fr ? "En attente" : "Pending"}
          </p>
          <p className="text-2xl font-bold tabular-nums">{totalPending}</p>
        </div>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="fd-card flex items-center gap-3.5 p-4 active:scale-[0.99]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#1c1917]">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--fd-muted)]">{item.desc}</p>
                </div>
                {item.badge != null ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
