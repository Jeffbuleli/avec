import { redirect } from "next/navigation";

export default async function LegacyPresentRedirect() {
  redirect("/live");
}
