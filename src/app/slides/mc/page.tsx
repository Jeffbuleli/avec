import { EavecSlidesMcClient } from "@/components/eavec/eavec-slides-mc-client";
import { getSessionUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "MC · e-AVEC Slides",
  robots: { index: false, follow: false },
};

export default async function EavecSlidesMcPage() {
  const userId = await getSessionUserId();
  return <EavecSlidesMcClient initialLoggedIn={!!userId} />;
}
