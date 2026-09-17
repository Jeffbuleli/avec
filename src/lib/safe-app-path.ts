/** Allow only same-origin app paths after login/register. */
export function safeAppRedirectPath(raw: string | null | undefined): string {
  const path = raw?.trim() ?? "";
  if (!path.startsWith("/") || path.startsWith("//")) return "/app/wallet/groups";
  if (path.includes("://")) return "/app/wallet/groups";
  // Bare /app is groups home on e-AVEC (not McBuleli wallet).
  if (path === "/app" || path === "/app/") return "/app/wallet/groups";
  return path;
}
