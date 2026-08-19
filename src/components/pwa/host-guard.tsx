"use client";

import { useEffect } from "react";
import { resolveCanonicalRedirect } from "@/lib/app-url";

/** Redirect stale PWA installs (0.0.0.0:3001, etc.) to production e-avec.org. */
export function HostGuard() {
  useEffect(() => {
    const target = resolveCanonicalRedirect();
    if (target) {
      window.location.replace(target);
    }
  }, []);

  return null;
}
