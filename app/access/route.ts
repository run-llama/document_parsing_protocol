import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, SESSION_SECONDS, createAccessSession, getAccessConfig, hasAccess, passwordMatches, safeReturnPath } from "../../lib/site-access";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "same-origin",
};
const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function accessPage(next: string, error = "", status = 200, configured = true) {
  return new NextResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Enter password · DPP</title><link rel="icon" href="data:,"><style>
*{box-sizing:border-box}body{margin:0;background:#fafafa;color:#171717;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}main{min-height:100svh;display:grid;place-items:center;padding:28px}.panel{width:100%;max-width:400px}.brand{font-size:21px;letter-spacing:-1px;margin-bottom:68px}.eyebrow{font:10px/1.6 monospace;letter-spacing:.1em;color:#777;text-transform:uppercase}h1{font-size:36px;line-height:1.15;font-weight:500;letter-spacing:-1.3px;margin:15px 0}p{font-size:14px;line-height:1.7;color:#666;margin:0 0 28px}label{display:block;font-size:12px;margin-bottom:10px}input{width:100%;border:1px solid #aaa;background:white;border-radius:0;padding:14px;font:16px Arial}input:focus-visible,button:focus-visible{outline:2px solid #111;outline-offset:4px}button{width:100%;margin-top:16px;border:1px solid #171717;border-radius:0;background:#171717;color:white;padding:15px;font-size:14px;cursor:pointer}button:hover{background:#333}.error{font-size:12px;color:#333;margin:12px 0 0}.note{border-top:1px solid #ddd;margin-top:34px;padding-top:18px;font:10px/1.7 monospace;color:#888}
</style></head><body><main><div class="panel"><div class="brand">DPP</div><div class="eyebrow">Private preview</div><h1>Enter the password.</h1><p>${configured ? "This site is shared by invitation. Enter the password to continue." : "Access hasn’t been configured yet. Please contact the site owner."}</p>${configured ? `<form action="/access" method="post"><input type="hidden" name="next" value="${escape(next)}"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" maxlength="256" required autofocus${error ? ' aria-invalid="true" aria-describedby="access-error"' : ""}>${error ? `<p class="error" id="access-error" role="alert">${escape(error)}</p>` : ""}<button type="submit">Continue <span aria-hidden="true">→</span></button></form><p class="note">Access is remembered on this browser for 7 days.</p>` : ""}</div></main></body></html>`, {
    status,
    headers: { ...privateHeaders, "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'" },
  });
}

export function GET(request: NextRequest) {
  const config = getAccessConfig();
  const next = safeReturnPath(request.nextUrl.searchParams.get("next"));
  if (!config) return accessPage(next, "", 503, false);
  if (hasAccess(request.cookies.get(ACCESS_COOKIE)?.value, config)) {
    return NextResponse.redirect(new URL(next, request.url), { status: 303, headers: privateHeaders });
  }
  return accessPage(next);
}

export async function POST(request: NextRequest) {
  const config = getAccessConfig();
  if (!config) return accessPage("/", "", 503, false);
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return new NextResponse("Invalid request origin", { status: 403, headers: privateHeaders });
  }
  if (!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
    return new NextResponse("Unsupported form submission", { status: 415, headers: privateHeaders });
  }
  const body = await request.text();
  if (body.length > 4096) return new NextResponse("Request too large", { status: 413, headers: privateHeaders });
  const form = new URLSearchParams(body);
  const password = form.get("password") ?? "";
  const next = safeReturnPath(form.get("next"));
  if (password.length > 256 || !passwordMatches(password, config)) {
    // A small fixed delay discourages rapid retries without pretending that
    // process-local state is a distributed rate limiter on Vercel.
    await new Promise(resolve => setTimeout(resolve, 600));
    return accessPage(next, "That password isn’t correct. Please try again.", 401);
  }
  const response = NextResponse.redirect(new URL(next, request.url), { status: 303, headers: privateHeaders });
  response.cookies.set(ACCESS_COOKIE, createAccessSession(config), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return response;
}
