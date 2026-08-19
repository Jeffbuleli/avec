/**
 * Profils partenaires Africa Insight - charges depuis leads-scored.csv ou JSON genere.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { AfricaInsightPartnerIntroProfile } from "./africa-insight-partner-intro-email";

export type AfricaInsightPartnerOrgType =
  | "media"
  | "think_tank"
  | "ngo"
  | "research"
  | "institution";

export type AfricaInsightPartnerLead = {
  id: string;
  orgName: string;
  orgType: AfricaInsightPartnerOrgType;
  countryHQ: string;
  coverageFocus: string;
  website: string;
  contactEmail: string;
  contactPage: string;
  fitScore: number;
  tier: "A" | "B" | "C" | "reject";
  priorityReason: string;
  greeting: string;
  theirWork: string;
  theirGain: string;
  status: "seed" | "scored" | "ready" | "sent" | "skip";
};

export type AfricaInsightPartnerProfile = AfricaInsightPartnerIntroProfile & {
  id: string;
  contactEmail: string;
  orgType: AfricaInsightPartnerOrgType;
  fitScore: number;
  tier: "A" | "B" | "C" | "reject";
};

const INTRO_DIR = path.join(
  process.cwd(),
  "content/email-partnership/africa-insight-partner-intro",
);

export function africaInsightPartnerIntroDir(): string {
  return INTRO_DIR;
}

export function loadPartnerLeadsFromCsv(filePath?: string): AfricaInsightPartnerLead[] {
  const csvPath = filePath ?? path.join(INTRO_DIR, "leads-scored.csv");
  if (!existsSync(csvPath)) return [];
  const raw = readFileSync(csvPath, "utf8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const rows: AfricaInsightPartnerLead[] = [];
  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx]?.trim() ?? "";
    });
    if (!row.id || !row.orgName) continue;
    rows.push({
      id: row.id,
      orgName: row.orgName,
      orgType: (row.orgType || "media") as AfricaInsightPartnerOrgType,
      countryHQ: row.countryHQ || "",
      coverageFocus: row.coverageFocus || "",
      website: row.website || "",
      contactEmail: row.contactEmail || "",
      contactPage: row.contactPage || "",
      fitScore: Number.parseInt(row.fitScore || "0", 10) || 0,
      tier: (row.tier || "C") as AfricaInsightPartnerLead["tier"],
      priorityReason: row.priorityReason || "",
      greeting: row.greeting || "Bonjour,",
      theirWork: row.theirWork || "",
      theirGain: row.theirGain || "",
      status: (row.status || "scored") as AfricaInsightPartnerLead["status"],
    });
  }
  return rows;
}

export function loadPartnerProfiles(options?: {
  minScore?: number;
  tiers?: Array<"A" | "B" | "C">;
  requireEmail?: boolean;
}): AfricaInsightPartnerProfile[] {
  const minScore = options?.minScore ?? 65;
  const tiers = new Set(options?.tiers ?? ["A", "B"]);
  const requireEmail = options?.requireEmail ?? false;

  const leads = loadPartnerLeadsFromCsv();
  return leads
    .filter((l) => l.status !== "skip" && l.status !== "sent")
    .filter((l) => l.fitScore >= minScore && tiers.has(l.tier as "A" | "B" | "C"))
    .filter((l) => !requireEmail || l.contactEmail.includes("@"))
    .filter((l) => l.theirWork.trim() && l.theirGain.trim())
    .map((l) => ({
      id: l.id,
      orgName: l.orgName,
      greeting: l.greeting,
      theirWork: l.theirWork,
      theirGain: l.theirGain,
      contactEmail: l.contactEmail,
      orgType: l.orgType,
      fitScore: l.fitScore,
      tier: l.tier,
    }));
}

export function getPartnerProfile(id: string): AfricaInsightPartnerProfile {
  const profile = loadPartnerProfiles({ minScore: 0, tiers: ["A", "B", "C"] }).find(
    (p) => p.id === id,
  );
  if (!profile) {
    throw new Error(`Unknown Africa Insight partner id: ${id}`);
  }
  return profile;
}

export function listPartnerIds(): string[] {
  return loadPartnerProfiles({ minScore: 0, tiers: ["A", "B", "C"] }).map((p) => p.id);
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}
