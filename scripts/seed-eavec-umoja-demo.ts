/**
 * Seed a demo AVEC group "AVEC Umoja" for hackathon walkthroughs.
 * Idempotent by email prefix demo-umoja-*@eavec.demo
 *
 *   npm run seed:eavec-umoja
 *
 * Requires DATABASE_URL. Creates 10 demo users + group + contributions + loans
 * + open governance vote + Passport consent.
 * Password for all demo users: DemoUmoja!2026
 */
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, eq, isNull } from "drizzle-orm";
import {
  getDb,
  groupAvecLoans,
  groupPassportConsents,
  groupProposals,
  groupSavingsGroups,
  groupSavingsMemberships,
  groupVotes,
  groupWalletLedgerEntries,
  users,
} from "../src/db";
import { generateGroupInviteCode } from "../src/lib/group-invite";
import { fundBucketMeta } from "../src/lib/avec/fund-buckets";

function loadLocalEnv(): void {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  try {
    loadEnvFile(envPath);
  } catch {
    /* already loaded */
  }
}

loadLocalEnv();

export const DEMO_PASSWORD = "DemoUmoja!2026";
export const GROUP_NAME = "AVEC Umoja";
export const EMAILS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `demo-umoja-${n}@eavec.demo`;
});

const NAMES = [
  "Amina K.",
  "Jean M.",
  "Grace N.",
  "Paul T.",
  "Fatou B.",
  "David L.",
  "Sarah O.",
  "Isaac W.",
  "Chloé R.",
  "Marc D.",
];

async function ensureUser(args: {
  email: string;
  displayName: string;
  balance: string;
  passwordHash: string;
}): Promise<string> {
  const db = getDb();
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, args.email))
    .limit(1);
  if (existing) {
    await db
      .update(users)
      .set({
        displayName: args.displayName,
        balance: args.balance,
        kycStatus: "approved",
        emailVerifiedAt: new Date(),
        passwordHash: args.passwordHash,
      })
      .where(eq(users.id, existing.id));
    return existing.id;
  }
  const [row] = await db
    .insert(users)
    .values({
      email: args.email,
      emailCanonical: args.email.toLowerCase(),
      passwordHash: args.passwordHash,
      displayName: args.displayName,
      role: "user",
      balance: args.balance,
      kycStatus: "approved",
      emailVerifiedAt: new Date(),
      countryCode: "CD",
    })
    .returning({ id: users.id });
  return row.id;
}

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL is required");
  }

  const db = getDb();
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userIds: string[] = [];

  for (let i = 0; i < EMAILS.length; i++) {
    const id = await ensureUser({
      email: EMAILS[i]!,
      displayName: NAMES[i]!,
      balance: "500.000000000000000000",
      passwordHash,
    });
    userIds.push(id);
  }

  const adminId = userIds[0]!;

  let [group] = await db
    .select()
    .from(groupSavingsGroups)
    .where(
      and(
        eq(groupSavingsGroups.name, GROUP_NAME),
        eq(groupSavingsGroups.createdByUserId, adminId),
      ),
    )
    .limit(1);

  if (!group) {
    const inviteCode = generateGroupInviteCode();
    const [created] = await db
      .insert(groupSavingsGroups)
      .values({
        type: "avec",
        name: GROUP_NAME,
        countryCode: "CD",
        minMembers: 10,
        maxMembers: 25,
        contributionAmountUsdt: "10",
        cycleDurationDays: 360,
        maxSharesPerMeeting: 5,
        meetingIntervalDays: 7,
        socialFundUsdt: "1",
        paymentRules:
          "Demo charter: weekly shares 1-5, loans max 3x savings, committee vote for medium loans.",
        publicDescription:
          "Demo AVEC for hackathon walkthrough — Umoja community savings (sandbox data).",
        address: "Gombe, Kinshasa",
        status: "active",
        subscriptionStatus: "active",
        createdByUserId: adminId,
        inviteCode,
        cycleStatus: "active",
        cycleNumber: 1,
        cycleStartedAt: new Date(Date.now() - 90 * 86400000),
        governanceMode: "hybrid",
      })
      .returning();
    group = created;
  } else {
    await db
      .update(groupSavingsGroups)
      .set({
        status: "active",
        subscriptionStatus: "active",
        publicDescription:
          "Demo AVEC for hackathon walkthrough — Umoja community savings (sandbox data).",
        address: "Gombe, Kinshasa",
      })
      .where(eq(groupSavingsGroups.id, group.id));
  }

  for (let i = 0; i < userIds.length; i++) {
    const uid = userIds[i]!;
    const role =
      i === 0 ? "admin" : i <= 2 ? "co_admin" : i === 3 ? "committee" : "member";
    const [m] = await db
      .select({ id: groupSavingsMemberships.id })
      .from(groupSavingsMemberships)
      .where(
        and(
          eq(groupSavingsMemberships.groupId, group.id),
          eq(groupSavingsMemberships.userId, uid),
        ),
      )
      .limit(1);
    if (!m) {
      await db.insert(groupSavingsMemberships).values({
        groupId: group.id,
        userId: uid,
        role,
        status: "approved",
        approvedByUserId: adminId,
        createdAt: new Date(Date.now() - (100 - i * 7) * 86400000),
      });
    }
  }

  const [existingContrib] = await db
    .select({ id: groupWalletLedgerEntries.id })
    .from(groupWalletLedgerEntries)
    .where(
      and(
        eq(groupWalletLedgerEntries.groupId, group.id),
        eq(groupWalletLedgerEntries.entryType, "group_contribution_in"),
      ),
    )
    .limit(1);

  if (!existingContrib) {
    let total = 0;
    for (let week = 0; week < 8; week++) {
      for (let i = 0; i < userIds.length; i++) {
        const shares = 1 + (i % 4);
        const amount = shares * 10;
        total += amount;
        const batchId = randomUUID();
        await db.insert(groupWalletLedgerEntries).values({
          batchId,
          groupId: group.id,
          entryType: "group_contribution_in",
          asset: "USDT",
          amount: amount.toFixed(18),
          meta: {
            userId: userIds[i],
            shares,
            ...fundBucketMeta("savings"),
            demo: true,
          },
          createdAt: new Date(
            Date.now() - (8 - week) * 7 * 86400000 - i * 3600000,
          ),
        });
      }
    }
    console.log(`Seeded contributions totaling ~$${total}`);
  }

  const [existingLoan] = await db
    .select({ id: groupAvecLoans.id })
    .from(groupAvecLoans)
    .where(eq(groupAvecLoans.groupId, group.id))
    .limit(1);

  if (!existingLoan) {
    const borrowerA = userIds[4]!;
    const borrowerB = userIds[5]!;
    const borrowerC = userIds[6]!;
    await db.insert(groupAvecLoans).values([
      {
        groupId: group.id,
        borrowerUserId: borrowerA,
        initiatedByUserId: adminId,
        principalUsdt: "300",
        outstandingUsdt: "120",
        status: "disbursed",
        requiredApprovals: 2,
        interestRatePctMonth: "10",
        penaltyRatePct: "20",
        loanTermDays: 90,
        disbursedAt: new Date(Date.now() - 20 * 86400000),
      },
      {
        groupId: group.id,
        borrowerUserId: borrowerB,
        initiatedByUserId: adminId,
        principalUsdt: "200",
        outstandingUsdt: "0",
        status: "repaid",
        requiredApprovals: 2,
        interestRatePctMonth: "10",
        penaltyRatePct: "20",
        loanTermDays: 90,
        disbursedAt: new Date(Date.now() - 60 * 86400000),
      },
      {
        groupId: group.id,
        borrowerUserId: borrowerC,
        initiatedByUserId: adminId,
        principalUsdt: "150",
        outstandingUsdt: "150",
        status: "disbursed",
        requiredApprovals: 2,
        interestRatePctMonth: "10",
        penaltyRatePct: "20",
        loanTermDays: 90,
        disbursedAt: new Date(Date.now() - 40 * 86400000),
      },
    ]);
    console.log("Seeded 3 demo loans (1 repaid, 2 active)");
  }

  const [existingProposal] = await db
    .select({ id: groupProposals.id })
    .from(groupProposals)
    .where(
      and(
        eq(groupProposals.groupId, group.id),
        eq(groupProposals.type, "loan_medium"),
        eq(groupProposals.status, "voting"),
      ),
    )
    .limit(1);

  if (!existingProposal) {
    const beneficiaryId = userIds[7]!;
    const [proposal] = await db
      .insert(groupProposals)
      .values({
        groupId: group.id,
        authorUserId: adminId,
        type: "loan_medium",
        riskTier: "B",
        status: "voting",
        title: "Crédit AGR — Isaac W. (petit commerce)",
        justification:
          "Demande de 180 USD pour stock de denrées. Historique de parts régulier. Vote comité (démo VUK’AFRIK).",
        financialImpactUsdt: "180",
        beneficiaryUserId: beneficiaryId,
        payload: {
          amountUsdt: 180,
          loanTermDays: 90,
          demo: true,
        },
        requiredQuorumPct: 50,
        requiredMajorityPct: 66,
        voteOpensAt: new Date(Date.now() - 2 * 3600000),
        voteClosesAt: new Date(Date.now() + 5 * 86400000),
        voteAudience: "committee",
      })
      .returning({ id: groupProposals.id });

    const voters = [userIds[0]!, userIds[1]!, userIds[3]!];
    for (const voterId of voters) {
      await db.insert(groupVotes).values({
        proposalId: proposal.id,
        voterUserId: voterId,
        choice: "yes",
        weight: "1",
      });
    }
    console.log("Seeded open governance vote (loan_medium) + 3 yes votes");
  }

  const passportMemberId = userIds[4]!; // Fatou B. — active loan borrower
  const [existingConsent] = await db
    .select({ id: groupPassportConsents.id })
    .from(groupPassportConsents)
    .where(
      and(
        eq(groupPassportConsents.groupId, group.id),
        eq(groupPassportConsents.memberUserId, passportMemberId),
        isNull(groupPassportConsents.revokedAt),
      ),
    )
    .limit(1);

  if (!existingConsent) {
    await db.insert(groupPassportConsents).values({
      groupId: group.id,
      memberUserId: passportMemberId,
      partnerLabel: "FOGEC (démo)",
      scopes: "summary,score,savings,loans",
      expiresAt: new Date(Date.now() + 30 * 86400000),
    });
    console.log("Seeded Passport consent (Fatou B. → FOGEC démo)");
  }

  const manifest = {
    groupName: GROUP_NAME,
    groupId: group.id,
    inviteCode: group.inviteCode,
    password: DEMO_PASSWORD,
    adminEmail: EMAILS[0],
    memberEmails: EMAILS,
    walkthrough: [
      { t: "0–15s", step: "Vue", path: `/app/wallet/groups/${group.id}?tab=vue` },
      {
        t: "15–35s",
        step: "Réunion (parts)",
        path: `/app/wallet/groups/${group.id}?tab=meeting`,
      },
      {
        t: "35–60s",
        step: "Caisse / crédits + vote",
        path: `/app/wallet/groups/${group.id}?tab=treasury`,
      },
      {
        t: "60–90s",
        step: "Passport + insights IA (Vue)",
        path: `/app/wallet/groups/${group.id}?tab=vue`,
      },
    ],
    loginAdmin: `/login?email=${encodeURIComponent(EMAILS[0]!)}&next=${encodeURIComponent(`/app/wallet/groups/${group.id}?tab=vue`)}`,
  };

  const docsDir = path.resolve(process.cwd(), "docs");
  if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
  writeFileSync(
    path.join(docsDir, "DEMO-UMOJA.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  writeFileSync(
    path.join(docsDir, "DEMO-UMOJA.md"),
    `# AVEC Umoja — démo VUK’AFRIK / jury

Compte sandbox pour pitch 90 s. **Ne pas utiliser en production réelle.**

## Accès

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Présidente (admin) | \`${EMAILS[0]}\` | \`${DEMO_PASSWORD}\` |
| Co-admin | \`${EMAILS[1]}\` | idem |
| Membre + Passport | \`${EMAILS[4]}\` (Fatou B.) | idem |

- **Groupe :** ${GROUP_NAME}
- **groupId :** \`${group.id}\`
- **Code invitation :** \`${group.inviteCode}\`
- **Page jury :** [/demo](/demo)

## Script 90 s

1. **0–15 s — Vue** : caisse, cycle, alertes → preuve de transparence.
2. **15–35 s — Réunion** : parts 1–5 + caisse sociale (Fc / MoMo).
3. **35–60 s — Caisse** : crédits actifs + vote ouvert « Crédit AGR — Isaac ».
4. **60–90 s — Passport** (scroll Vue) : score fiabilité + consentement FOGEC démo + insight IA.

Login admin prérempli :

\`\`\`
${manifest.loginAdmin}
\`\`\`

Relancer le seed : \`npm run seed:eavec-umoja\`
`,
    "utf8",
  );

  console.log("AVEC Umoja demo ready");
  console.log(`  groupId: ${group.id}`);
  console.log(`  inviteCode: ${group.inviteCode}`);
  console.log(`  admin: ${EMAILS[0]} / ${DEMO_PASSWORD}`);
  console.log(`  members: ${EMAILS.length}`);
  console.log("  Docs: docs/DEMO-UMOJA.md · docs/DEMO-UMOJA.json");
  console.log("  Jury page: /demo");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
