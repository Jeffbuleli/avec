/** Allow only same-origin app paths after login/register. */
export function safeAppRedirectPath(raw: string | null | undefined): string {
  const path = raw?.trim() ?? "";
  if (!path.startsWith("/") || path.startsWith("//")) return "/app/home";
  if (path.includes("://")) return "/app/home";
  // Bare /app → Home hub.
  if (path === "/app" || path === "/app/") return "/app/home";
  return path;
}
