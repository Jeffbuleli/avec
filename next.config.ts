import type { NextConfig } from "next";
import { mediaPublicHostnames } from "./src/lib/media-url-config";
import { securityResponseHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  serverExternalPackages: ["ccxt", "technicalindicators", "postgres"],
  images: {
    remotePatterns: [
      ...mediaPublicHostnames().map((hostname) => ({
        protocol: "https" as const,
        hostname,
      })),
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
  },
  async headers() {
    const entries = Object.entries(securityResponseHeaders());
    return [
      {
        source: "/:path*",
        headers: entries.map(([key, value]) => ({ key, value })),
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/groups",
        destination: "/app/wallet/groups",
        permanent: false,
      },
      {
        source: "/groups/:path*",
        destination: "/app/wallet/groups/:path*",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.e-avec.org" }],
        destination: "https://e-avec.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
