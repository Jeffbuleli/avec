import { redirect } from "next/navigation";

export default async function LegacySlugRedirect() {
  redirect("/mc");
}
