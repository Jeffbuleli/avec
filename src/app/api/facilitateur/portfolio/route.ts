import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { listFacilitatorPortfolio } from "@/lib/avec/integrity-alerts";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await listFacilitatorPortfolio(userId);
  return NextResponse.json({ ok: true, ...data });
}
