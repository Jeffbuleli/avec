import { and, eq, isNull } from "drizzle-orm";
import {
  getDb,
  groupPassportConsents,
  groupProposals,
  groupSavingsGroups,
  users,
} from "@/db";

export const runtime = "nodejs";

const GROUP_NAME = "AVEC Umoja";
const ADMIN_EMAIL = "demo-umoja-01@eavec.demo";

/**
 * Public sandbox metadata for jury /demo walkthrough.
 * Only exposes the known Umoja demo group (no secrets).
 */
export async function GET() {
  try {
    const db = getDb();
    const [admin] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, ADMIN_EMAIL))
      .limit(1);

    if (!admin) {
      return Response.json(
        {
          ok: false,
          seeded: false,
          message: "Run npm run seed:eavec-umoja",
        },
        { status: 404 },
      );
    }

    const [group] = await db
      .select({
        id: groupSavingsGroups.id,
        name: groupSavingsGroups.name,
        inviteCode: groupSavingsGroups.inviteCode,
      })
      .from(groupSavingsGroups)
      .where(
        and(
          eq(groupSavingsGroups.name, GROUP_NAME),
          eq(groupSavingsGroups.createdByUserId, admin.id),
        ),
      )
      .limit(1);

    if (!group) {
      return Response.json(
        {
          ok: false,
          seeded: false,
          message: "Run npm run seed:eavec-umoja",
        },
        { status: 404 },
      );
    }

    const [openVote] = await db
      .select({
        id: groupProposals.id,
        title: groupProposals.title,
        status: groupProposals.status,
      })
      .from(groupProposals)
      .where(
        and(
          eq(groupProposals.groupId, group.id),
          eq(groupProposals.status, "voting"),
        ),
      )
      .limit(1);

    const [passport] = await db
      .select({
        partnerLabel: groupPassportConsents.partnerLabel,
        scopes: groupPassportConsents.scopes,
      })
      .from(groupPassportConsents)
      .where(
        and(
          eq(groupPassportConsents.groupId, group.id),
          isNull(groupPassportConsents.revokedAt),
        ),
      )
      .limit(1);

    const basePath = `/app/wallet/groups/${group.id}`;
    return Response.json({
      ok: true,
      seeded: true,
      groupId: group.id,
      groupName: group.name,
      inviteCode: group.inviteCode,
      adminEmail: ADMIN_EMAIL,
      passwordHint: "DemoUmoja!2026",
      openVote: openVote
        ? { id: openVote.id, title: openVote.title, status: openVote.status }
        : null,
      passport: passport
        ? { partnerLabel: passport.partnerLabel, scopes: passport.scopes }
        : null,
      steps: [
        {
          t: "0-15 s",
          labelFr: "Vue - caisse & cycle",
          labelEn: "Overview - treasury & cycle",
          path: `${basePath}?tab=vue`,
          sayFr: "Montrer la caisse visible et le cycle en cours.",
          sayEn: "Show the visible treasury and active cycle.",
        },
        {
          t: "15-35 s",
          labelFr: "Réunion - parts 1-5",
          labelEn: "Meeting - shares 1-5",
          path: `${basePath}?tab=meeting`,
          sayFr: "Cotiser comme en réunion physique - parts 1 à 5.",
          sayEn: "Contribute like a physical meeting - shares 1 to 5.",
        },
        {
          t: "35-60 s",
          labelFr: "Caisse - crédits & vote",
          labelEn: "Treasury - loans & vote",
          path: `${basePath}?tab=treasury`,
          sayFr: "Ouvrir un crédit et le vote collectif.",
          sayEn: "Open a loan and the collective vote.",
        },
        {
          t: "60-90 s",
          labelFr: "Passport & insights",
          labelEn: "Passport & insights",
          path: `${basePath}?tab=vue`,
          sayFr: "Historique portable + disclaimer BCC - pas une banque.",
          sayEn: "Portable history + BCC disclaimer - not a bank.",
        },
      ],
      loginAdminPath: `/login?email=${encodeURIComponent(ADMIN_EMAIL)}&next=${encodeURIComponent(`${basePath}?tab=vue`)}`,
    });
  } catch (e) {
    console.error("[demo/umoja]", e);
    return Response.json({ ok: false, seeded: false, message: "unavailable" }, { status: 500 });
  }
}
