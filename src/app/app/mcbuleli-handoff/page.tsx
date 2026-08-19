import { redirect } from "next/navigation";
import { getMcbuleliWalletUrl } from "@/lib/app-url";
import { signMcbuleliHandoffToken } from "@/lib/mcbuleli-handoff";
import { safeAppRedirectPath } from "@/lib/safe-app-path";
import { getSessionUserId } from "@/lib/session";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

/** Silent SSO into McBuleli when user returns from e-AVEC (shared DB). */
export default async function McbuleliHandoffPage({ searchParams }: Props) {
  const sp = await searchParams;
  const next = safeAppRedirectPath(sp.next?.trim() || "/app/wallet");
  const userId = await getSessionUserId();

  if (!userId) {
    const returnPath = `/app/mcbuleli-handoff?next=${encodeURIComponent(next)}`;
    redirect(`/login?next=${encodeURIComponent(returnPath)}`);
  }

  const token = await signMcbuleliHandoffToken(userId);
  const ssoUrl = new URL(getMcbuleliWalletUrl("/api/auth/sso"));
  ssoUrl.searchParams.set("token", token);
  ssoUrl.searchParams.set("next", next);
  redirect(ssoUrl.toString());
}
