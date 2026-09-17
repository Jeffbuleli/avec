import { redirect } from "next/navigation";

/** @deprecated use /live */
export default function LegacySlidesLiveRedirect() {
  redirect("/live");
}
