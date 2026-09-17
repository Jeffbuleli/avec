import { redirect } from "next/navigation";

/** Legacy present URL → LIVE projecteur */
export default async function LegacySlidePresentRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  redirect("/slides/live");
}
