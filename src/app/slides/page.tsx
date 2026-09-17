import { redirect } from "next/navigation";

/** Hub retiré — LIVE et MC uniquement. */
export default function SlidesHubRedirect() {
  redirect("/live");
}
