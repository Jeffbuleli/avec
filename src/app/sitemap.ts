import type { MetadataRoute } from "next";
import { CANONICAL_PRODUCTION_ORIGIN } from "@/lib/app-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/login", "/register", "/business", "/live", "/mc"].map((path) => ({
    url: `${CANONICAL_PRODUCTION_ORIGIN}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/business" || path === "/live" ? 0.8 : 0.6,
  }));
}
