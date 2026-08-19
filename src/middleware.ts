import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_PRODUCTION_ORIGIN } from "@/lib/app-url";
import { corsHeaders, resolveAllowedCorsOrigin } from "@/lib/cors";
import { applySecurityHeaders } from "@/lib/security-headers";
import { isEavecAllowedApiPath } from "@/lib/eavec-api-allowlist";
import {
  middlewareApiRateLimit,
  shouldMiddlewareThrottleApi,
} from "@/lib/middleware-api-rate-limit";

const CANONICAL_HOST = new URL(CANONICAL_PRODUCTION_ORIGIN).hostname;

const LEGACY_HOSTS = new Set(["www.e-avec.org"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";

  if (LEGACY_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  const rawPathname = request.nextUrl.pathname;
  let pathname = rawPathname;
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    pathname = rawPathname;
  }

  const isApi = pathname.startsWith("/api/");

  if (isApi && !isEavecAllowedApiPath(pathname)) {
    const denied = NextResponse.json({ message: "Not found" }, { status: 404 });
    applySecurityHeaders(denied.headers);
    return denied;
  }

  if (isApi && shouldMiddlewareThrottleApi(pathname, request.method)) {
    const ip =
      request.headers.get("cf-connecting-ip")?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
      "unknown";
    const retryAfter = middlewareApiRateLimit(pathname, ip);
    if (retryAfter !== null) {
      const limited = NextResponse.json(
        { message: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        },
      );
      applySecurityHeaders(limited.headers);
      return limited;
    }
  }

  const allowedOrigin = isApi
    ? resolveAllowedCorsOrigin(request.headers.get("origin"))
    : null;

  if (isApi && request.method === "OPTIONS") {
    const preflight = new NextResponse(null, { status: 204 });
    const extra = corsHeaders(allowedOrigin);
    for (const [k, v] of Object.entries(extra)) preflight.headers.set(k, v);
    applySecurityHeaders(preflight.headers);
    return preflight;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  if (allowedOrigin) {
    const extra = corsHeaders(allowedOrigin);
    for (const [k, v] of Object.entries(extra)) res.headers.set(k, v);
  }
  applySecurityHeaders(res.headers);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|icons/|uploads/).*)",
  ],
};
