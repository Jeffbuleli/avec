import { redirect } from "next/navigation";

/** @deprecated use /mc */
export default function LegacySlidesMcRedirect() {
  redirect("/mc");
}
