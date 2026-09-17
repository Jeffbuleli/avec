import { and, desc, eq } from "drizzle-orm";
import {
  getDb,
  groupSavingsGroups,
  groupSavingsMemberships,
  groupWalletLedgerEntries,
  users,
} from "@/db";
import {
  assertGroupFacilitatorAccess,
  buildIntegrityAlerts,
} from "@/lib/avec/integrity-alerts";
import { getGroupFundSummary } from "@/lib/avec/fund-buckets";
import { getSessionUserId } from "@/lib/session";
import { avecMoney } from "@/lib/avec/display-currency";
import { numFromNumeric } from "@/lib/wallet-types";
import { p2pDisplayName } from "@/lib/p2p-display";

export const dynamic = "force-dynamic";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Printable meeting / portfolio export for ONG facilitators (HTML → Save as PDF). */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) return new Response("Unauthorized", { status: 401 });
  const { id } = await ctx.params;

  const access = await assertGroupFacilitatorAccess({ groupId: id, userId });
  if (!access.ok) {
    return new Response(access.message, { status: 403 });
  }

  const db = getDb();
  const [group] = await db
    .select({
      name: groupSavingsGroups.name,
      address: groupSavingsGroups.address,
      cycleNumber: groupSavingsGroups.cycleNumber,
      cycleStatus: groupSavingsGroups.cycleStatus,
      contributionAmountUsdt: groupSavingsGroups.contributionAmountUsdt,
      socialFundUsdt: groupSavingsGroups.socialFundUsdt,
    })
    .from(groupSavingsGroups)
    .where(eq(groupSavingsGroups.id, id))
    .limit(1);
  if (!group) return new Response("Not found", { status: 404 });

  const members = await db
    .select({
      userId: groupSavingsMemberships.userId,
      role: groupSavingsMemberships.role,
      email: users.email,
      displayName: users.displayName,
      piUsername: users.piUsername,
      avatarUrl: users.avatarUrl,
    })
    .from(groupSavingsMemberships)
    .innerJoin(users, eq(users.id, groupSavingsMemberships.userId))
    .where(
      and(
        eq(groupSavingsMemberships.groupId, id),
        eq(groupSavingsMemberships.status, "approved"),
      ),
    )
    .limit(40);

  const ledger = await db
    .select({
      entryType: groupWalletLedgerEntries.entryType,
      amount: groupWalletLedgerEntries.amount,
      createdAt: groupWalletLedgerEntries.createdAt,
      meta: groupWalletLedgerEntries.meta,
    })
    .from(groupWalletLedgerEntries)
    .where(eq(groupWalletLedgerEntries.groupId, id))
    .orderBy(desc(groupWalletLedgerEntries.createdAt))
    .limit(12);

  const funds = await getGroupFundSummary(id);
  const alerts = await buildIntegrityAlerts(id);
  const dateStr = new Date().toLocaleString("fr-CD");

  const memberRows = members
    .map((m) => {
      const name = p2pDisplayName({
        email: m.email,
        displayName: m.displayName,
        piUsername: m.piUsername,
        avatarUrl: m.avatarUrl,
      });
      return `<tr><td>${esc(name)}</td><td>${esc(m.role)}</td></tr>`;
    })
    .join("");

  const ledgerRows = ledger
    .map((e) => {
      const uid = String((e.meta as { userId?: string } | null)?.userId ?? "—");
      return `<tr>
        <td>${esc(new Date(e.createdAt).toLocaleDateString("fr-CD"))}</td>
        <td>${esc(e.entryType)}</td>
        <td class="num">${esc(avecMoney(numFromNumeric(e.amount)))}</td>
        <td>${esc(uid.slice(0, 8))}</td>
      </tr>`;
    })
    .join("");

  const alertHtml =
    alerts.length === 0
      ? "<p class='ok'>Aucune alerte intégrité majeure.</p>"
      : `<ul>${alerts
          .map(
            (a) =>
              `<li><strong>${esc(a.titleFr)}</strong> — ${esc(a.detailFr)}</li>`,
          )
          .join("")}</ul>`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>PV réunion — ${esc(group.name)}</title>
  <style>
    body { font-family: system-ui, sans-serif; color: #0F2D2F; margin: 24px; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .muted { color: #5a6e6a; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
    th, td { border-bottom: 1px solid #ddd; padding: 6px 4px; text-align: left; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .kpi { display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0; }
    .kpi div { border: 1px solid #ddd; border-radius: 12px; padding: 10px 14px; min-width: 120px; }
    .kpi strong { display: block; font-size: 16px; }
    .ok { color: #0a7a3e; }
    @media print { button { display: none; } }
  </style>
</head>
<body>
  <button onclick="window.print()">Imprimer / PDF</button>
  <h1>${esc(group.name)}</h1>
  <p class="muted">Export facilitateur ONG · ${esc(dateStr)} · Cycle #${group.cycleNumber ?? 1} (${esc(group.cycleStatus ?? "active")})</p>
  <p class="muted">${esc(group.address ?? "—")}</p>
  <div class="kpi">
    <div><span class="muted">Dispo</span><strong>${esc(avecMoney(funds.availableUsdt))}</strong></div>
    <div><span class="muted">Prêté</span><strong>${esc(avecMoney(funds.lentUsdt))}</strong></div>
    <div><span class="muted">Part</span><strong>${esc(avecMoney(group.contributionAmountUsdt))}</strong></div>
    <div><span class="muted">Sociale</span><strong>${esc(avecMoney(group.socialFundUsdt))}</strong></div>
  </div>
  <h2>Alertes intégrité</h2>
  ${alertHtml}
  <h2>Membres (${members.length})</h2>
  <table><thead><tr><th>Nom</th><th>Rôle</th></tr></thead><tbody>${memberRows}</tbody></table>
  <h2>Derniers mouvements</h2>
  <table><thead><tr><th>Date</th><th>Type</th><th>Montant</th><th>Membre</th></tr></thead><tbody>${ledgerRows}</tbody></table>
  <p class="muted" style="margin-top:24px">e-AVEC n’est pas une banque. Document généré pour suivi ONG / facilitateur.</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
