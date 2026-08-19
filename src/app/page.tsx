import { redirect } from "next/navigation";
import { EavecLanding } from "@/components/eavec/landing";
import { getSessionUserId } from "@/lib/session";

const AUTHED_HOME = "/app/wallet/groups";

export default async function HomePage() {
  const userId = await getSessionUserId();
  if (userId) redirect(AUTHED_HOME);
  return <EavecLanding />;
}
