import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/jwt";
import { getSessionCookieClearOptions } from "@/lib/session-cookie";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName(), "", getSessionCookieClearOptions());
  res.cookies.set("mb_came_from_mcbuleli", "", getSessionCookieClearOptions());
  return res;
}
