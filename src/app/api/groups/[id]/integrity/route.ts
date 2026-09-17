import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import {
  assertGroupFacilitatorAccess,
  buildIntegrityAlerts,
} from "@/lib/avec/integrity-alerts";
import { getMyMembershipOrNull } from "@/lib/group-savings-permissions";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const membership = await getMyMembershipOrNull({ groupId: id, userId });
  if (!membership || membership.status !== "approved") {
    return NextResponse.json({ error: "group_forbidden" }, { status: 403 });
  }

  const alerts = await buildIntegrityAlerts(id);
  const facilitator = await assertGroupFacilitatorAccess({ groupId: id, userId });

  return NextResponse.json({
    ok: true,
    canExport: facilitator.ok,
    alerts,
  });
}
