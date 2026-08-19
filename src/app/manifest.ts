import type { MetadataRoute } from "next";
import { CANONICAL_PRODUCTION_ORIGIN } from "@/lib/app-url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${CANONICAL_PRODUCTION_ORIGIN}/`,
    name: "e-AVEC",
    short_name: "e-AVEC",
    description:
      "Digital village savings and loan associations — shares, social fund, internal credit.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0F2D2F",
    theme_color: "#0F2D2F",
    orientation: "any",
    icons: [
      {
        src: "/icons/icon-144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
