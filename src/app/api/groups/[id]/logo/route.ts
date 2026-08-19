import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { assertAvatarImageBuffer } from "@/lib/avatar-image";
import {
  eavecGroupLogoKey,
  eavecR2EnvPresent,
  putEavecObjectToR2,
} from "@/lib/eavec-media-r2";
import { updateGroupProfile } from "@/lib/group-savings-profile";
import { getSessionUserId } from "@/lib/session";

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Upload group logo to R2 and persist URL on the group profile. */
export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!eavecR2EnvPresent()) {
    return NextResponse.json({ error: "eavec_r2_not_configured" }, { status: 503 });
  }

  const { id: groupId } = await ctx.params;
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size < 1) {
    return NextResponse.json({ error: "group_logo_no_file" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const v = assertAvatarImageBuffer(buf);
  if (!v.ok) {
    return NextResponse.json({ error: v.error }, { status: 400 });
  }

  const ext = EXT[v.mime] ?? "jpg";
  const objectKey = eavecGroupLogoKey(groupId, `${randomUUID()}.${ext}`);
  const logoUrl = await putEavecObjectToR2({
    objectKey,
    body: buf,
    mimeType: v.mime,
  });

  if (!logoUrl) {
    return NextResponse.json({ error: "eavec_r2_upload_failed" }, { status: 502 });
  }

  const saved = await updateGroupProfile({
    groupId,
    actorUserId: userId,
    logoUrl,
  });
  if (!saved.ok) {
    return NextResponse.json({ error: saved.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, logoUrl });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: groupId } = await ctx.params;
  const saved = await updateGroupProfile({
    groupId,
    actorUserId: userId,
    logoUrl: null,
  });
  if (!saved.ok) {
    return NextResponse.json({ error: saved.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
