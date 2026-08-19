import type { MetadataRoute } from "next";
import { CANONICAL_PRODUCTION_ORIGIN } from "@/lib/app-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/login", "/register"].map((path) => ({
    url: `${CANONICAL_PRODUCTION_ORIGIN}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
