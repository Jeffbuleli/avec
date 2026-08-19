import { NextResponse } from "next/server";
import { verifyEavecHandoffToken } from "@/lib/eavec-handoff";
import { sessionCookieName, signSessionToken } from "@/lib/jwt";
import { getSessionCookieWriteOptions } from "@/lib/session-cookie";
import { safeAppRedirectPath } from "@/lib/safe-app-path";
import { getDb, users } from "@/db";
import { eq } from "drizzle-orm";

/** McBuleli → e-AVEC silent login (shared DB + JWT secret). */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token")?.trim();
  const nextRaw = url.searchParams.get("next")?.trim() || "/app/wallet/groups";
  const next = safeAppRedirectPath(nextRaw);

  if (!token) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  let userId: string;
  try {
    ({ userId } = await verifyEavecHandoffToken(token));
  } catch {
    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(next)}`, url.origin),
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
      new URL(`/login?next=${encodeURIComponent(next)}`, url.origin),
    );
  }

  const session = await signSessionToken(user.id, user.sessionVersion ?? 0);
  const res = NextResponse.redirect(new URL(next, url.origin));
  res.cookies.set(sessionCookieName(), session, getSessionCookieWriteOptions());
  return res;
}
