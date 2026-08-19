/** APIs exposed on e-avec.org. Everything else 404s (McBuleli surfaces stay on mcbuleli.org). */
const ALLOWED_PREFIXES = [
  "/api/auth",
  "/api/groups",
  "/api/admin/groups",
  "/api/kyc",
  "/api/profile",
  "/api/wallet/summary",
  "/api/notifications",
  "/api/webhooks/didit",
  "/api/internal/governance",
  "/api/version",
];

export function isEavecAllowedApiPath(pathname: string): boolean {
  return ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
