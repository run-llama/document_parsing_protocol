import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, getAccessConfig, hasAccess } from "./lib/site-access";

export function proxy(request: NextRequest) {
  // The access form is self-contained HTML, so no JS, CSS, image, API,
  // download, or framework asset paths need an unauthenticated exception.
  if (request.nextUrl.pathname === "/access") return NextResponse.next();

  let response: NextResponse;
  if (hasAccess(request.cookies.get(ACCESS_COOKIE)?.value, getAccessConfig())) {
    response = NextResponse.next();
  } else if (request.method === "GET" || request.method === "HEAD") {
    const destination = new URL("/access", request.url);
    destination.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
    response = NextResponse.redirect(destination);
  } else {
    response = NextResponse.json({ error: "Password required" }, { status: 401 });
  }
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

// Match all routes, including public files and Next.js data/static endpoints.
export const config = { matcher: "/:path*" };
