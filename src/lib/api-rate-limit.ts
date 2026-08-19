import { NextResponse } from "next/server";
import {
  checkRateLimit,
  clientIpFromRequest,
  rateLimitKeyIp,
  rateLimitedResponse,
} from "@/lib/rate-limit";

type Rule = {
  limit: number;
  windowMs: number;
  key: (args: { userId: string; req: Request }) => string;
};

const SCOPES = {
  withdrawal: [
    {
      limit: 5,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:withdrawal:user:${userId}`,
    },
    {
      limit: 30,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:withdrawal", req),
    },
  ],
  wallet_transfer: [
    {
      limit: 15,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:wallet-transfer:user:${userId}`,
    },
    {
      limit: 40,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:wallet-transfer", req),
    },
  ],
  fiat_withdraw: [
    {
      limit: 5,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:fiat-withdraw:user:${userId}`,
    },
    {
      limit: 20,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:fiat-withdraw", req),
    },
  ],
  p2p_order: [
    {
      limit: 20,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:p2p-order:user:${userId}`,
    },
    {
      limit: 60,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:p2p-order", req),
    },
  ],
  p2p_action: [
    {
      limit: 40,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:p2p-action:user:${userId}`,
    },
  ],
  trade_futures: [
    {
      limit: 30,
      windowMs: 60_000,
      key: ({ userId }) => `api:trade-futures:user:${userId}`,
    },
    {
      limit: 120,
      windowMs: 60_000,
      key: ({ req }) => rateLimitKeyIp("api:trade-futures", req),
    },
  ],
  jitsi_join: [
    {
      limit: 30,
      windowMs: 60_000,
      key: ({ userId }) => `api:jitsi-join:user:${userId}`,
    },
    {
      limit: 60,
      windowMs: 60_000,
      key: ({ req }) => rateLimitKeyIp("api:jitsi-join", req),
    },
  ],
  staking_stake: [
    {
      limit: 10,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:staking:user:${userId}`,
    },
  ],
  trade_options: [
    {
      limit: 40,
      windowMs: 60_000,
      key: ({ userId }) => `api:trade-options:user:${userId}`,
    },
  ],
  safefind_found: [
    {
      limit: 10,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:safefind-found:user:${userId}`,
    },
    {
      limit: 40,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:safefind-found", req),
    },
  ],
  safefind_lost: [
    {
      limit: 15,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:safefind-lost:user:${userId}`,
    },
  ],
  safefind_claim: [
    {
      limit: 20,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:safefind-claim:user:${userId}`,
    },
  ],
  safefind_verify: [
    {
      limit: 20,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:safefind-verify:user:${userId}`,
    },
  ],
  safefind_case_get: [
    {
      limit: 60,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:safefind-case:user:${userId}`,
    },
    {
      limit: 120,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:safefind-case", req),
    },
  ],
  safefind_partners: [
    {
      limit: 60,
      windowMs: 60 * 60_000,
      key: ({ userId }) => `api:safefind-partners:user:${userId}`,
    },
    {
      limit: 120,
      windowMs: 60 * 60_000,
      key: ({ req }) => rateLimitKeyIp("api:safefind-partners", req),
    },
  ],
} as const satisfies Record<string, Rule[]>;

export type ApiRateLimitScope = keyof typeof SCOPES;

/** Returns a 429 NextResponse when limited, else null. */
export function enforceApiRateLimit(
  scope: ApiRateLimitScope,
  userId: string,
  req: Request,
): NextResponse | null {
  for (const rule of SCOPES[scope]) {
    const result = checkRateLimit({
      key: rule.key({ userId, req }),
      limit: rule.limit,
      windowMs: rule.windowMs,
    });
    if (!result.ok) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(result.retryAfterSec) },
        },
      );
    }
  }
  return null;
}

/** IP-only cap for unauthenticated endpoints. */
export function enforceIpRateLimit(
  scope: string,
  req: Request,
  limit: number,
  windowMs: number,
): Response | null {
  const result = checkRateLimit({
    key: rateLimitKeyIp(scope, req),
    limit,
    windowMs,
  });
  if (!result.ok) {
    return rateLimitedResponse(result.retryAfterSec);
  }
  return null;
}

export function auditIp(req: Request): string {
  return clientIpFromRequest(req);
}
