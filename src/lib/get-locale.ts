import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "@/i18n/locale";

export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get(LOCALE_COOKIE)?.value;
  // e-AVEC is FR-first (RDC); only force EN when the user chose it.
  return v === "en" ? "en" : "fr";
}
