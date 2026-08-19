import { NextResponse } from "next/server";
import { verifyEavecHandoffToken } from "@/lib/eavec-handoff";
import { CANONICAL_PRODUCTION_ORIGIN, resolveRequestPublicOrigin } from "@/lib/app-url";
import { sessionCookieName, signSessionToken } from "@/lib/jwt";
import { getSessionCookieWriteOptions } from "@/lib/session-cookie";
import { safeAppRedirectPath } from "@/lib/safe-app-path";
import { getDb, users } from "@/db";
import { eq } from "drizzle-orm";

/** McBuleli → e-AVEC silent login (shared DB + JWT secret). */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = resolveRequestPublicOrigin(req, CANONICAL_PRODUCTION_ORIGIN);
  const token = url.searchParams.get("token")?.trim();
  const nextRaw = url.searchParams.get("next")?.trim() || "/app/wallet/groups";
  const next = safeAppRedirectPath(nextRaw);

  if (!token) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  let userId: string;
  try {
    ({ userId } = await verifyEavecHandoffToken(token));
  } catch {
    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(next)}`, origin),
    );
  }

  const db = getDb();
  const [user] = await db
    .select({
      id: users.id,
      sessionVersion: users.sessionVersion,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(next)}`, origin),
    );
  }

  const session = await signSessionToken(user.id, user.sessionVersion ?? 0);
  const res = NextResponse.redirect(new URL(next, origin));
  res.cookies.set(sessionCookieName(), session, getSessionCookieWriteOptions());
  // Used by the e-AVEC UI to show a "Return to McBuleli" CTA after a handoff.
  // Short-lived to avoid showing the CTA forever.
  res.cookies.set(
    "mb_came_from_mcbuleli",
    "1",
    getSessionCookieWriteOptions(30 * 60),
  );
  return res;
}
