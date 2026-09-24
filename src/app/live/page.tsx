import { EavecSlidesLiveClient } from "@/components/eavec/eavec-slides-live-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "LIVE · Yekola Slides",
  robots: { index: false, follow: false },
};

export default function EavecSlidesLivePage() {
  return <EavecSlidesLiveClient />;
}
