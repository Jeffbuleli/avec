import { EavecHomeHub } from "@/components/eavec/home-hub";
import { getSessionUserId } from "@/lib/session";
import { getDb, users } from "@/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AppHomePage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login?next=/app/home");

  const db = getDb();
  const [u] = await db
    .select({
      email: users.email,
      displayName: users.displayName,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const displayName =
    u?.displayName?.trim() ||
    u?.email?.split("@")[0] ||
    "e-AVEC";

  return <EavecHomeHub displayName={displayName} />;
}
