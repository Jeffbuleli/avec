import { redirect } from "next/navigation";

/** Legacy prepare URL → MC télécommande */
export default async function LegacySlidePrepareRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  redirect("/slides/mc");
}
