import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const ACCESS_COOKIE = "dpp_access";
export const SESSION_SECONDS = 60 * 60 * 24 * 7;
export type AccessConfig = { password: string; secret: string };

export function getAccessConfig(): AccessConfig | null {
  const password = process.env.SITE_PASSWORD;
  const secret = process.env.SITE_SESSION_SECRET;
  return password && secret && secret.length >= 32 ? { password, secret } : null;
}

export function passwordMatches(candidate: string, config: AccessConfig): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(candidate), digest(config.password));
}

function signature(payload: string, config: AccessConfig): string {
  // Binding to both settings invalidates sessions when either setting changes.
  return createHmac("sha256", config.secret)
    .update(JSON.stringify([payload, config.password])).digest("hex");
}

export function createAccessSession(config: AccessConfig, now = Date.now()): string {
  const expires = Math.floor(now / 1000) + SESSION_SECONDS;
  const payload = `v1.${expires}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${signature(payload, config)}`;
}

export function hasAccess(token: string | undefined, config: AccessConfig | null, now = Date.now()): boolean {
  if (!config || !token || token.length > 180) return false;
  const match = /^(v1\.(\d{10})\.[a-f0-9]{32})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[2]);
  const seconds = Math.floor(now / 1000);
  if (expires <= seconds || expires > seconds + SESSION_SECONDS) return false;
  return timingSafeEqual(Buffer.from(match[3], "hex"), Buffer.from(signature(match[1], config), "hex"));
}

export function safeReturnPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\x00-\x1f\x7f]/.test(value)) return "/";
  try {
    const target = new URL(value, "https://dpp.invalid");
    if (target.origin !== "https://dpp.invalid" || /^\/access(?:\/|$)/.test(target.pathname)) return "/";
    return target.pathname + target.search;
  } catch {
    return "/";
  }
}
