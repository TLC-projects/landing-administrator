import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/jwt";
import { withBasePath } from "./lib/with-base-path";
import { getStrippedPath } from "./lib/get-stripped-path";

// Constants
const AUTH_COOKIES = {
  SESSION: "auth_session",
  TOKEN: "auth_token",
} as const;

const PUBLIC_ROUTES = ["/login", "/logout"];

/**
 * Check if the token is near expiration (within 5 minutes)
 */
function isTokenNearExpiration(expiresAt: number): boolean {
  const now = Date.now();
  const fiveMinutesMs = 5 * 60 * 1000;
  return expiresAt - now < fiveMinutesMs;
}

/**
 * Verify user authentication from cookies
 */
async function verifyAuthentication(
  sessionCookie: string | undefined,
  tokenCookie: string | undefined
) {
  if (!sessionCookie || !tokenCookie) {
    return { isAuthenticated: false, tokenNeedsRenewal: false };
  }

  try {
    const session = await decrypt<{ userId?: string }>(sessionCookie);
    const token = await decrypt<{ expiresAt?: number }>(tokenCookie);

    if (!session || !token) {
      return { isAuthenticated: false, tokenNeedsRenewal: false };
    }

    // Check if token needs renewal
    const tokenNeedsRenewal = token.expiresAt
      ? isTokenNearExpiration(token.expiresAt)
      : false;

    return { isAuthenticated: true, tokenNeedsRenewal };
  } catch (error) {
    console.error(
      "[Proxy] Authentication error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return { isAuthenticated: false, tokenNeedsRenewal: false };
  }
}

export async function proxy(request: NextRequest) {
  const path = getStrippedPath(request);
  const isPublicRoute = PUBLIC_ROUTES.some((route) => path.startsWith(route));

  // Get cookies
  const sessionCookie = request.cookies.get(AUTH_COOKIES.SESSION)?.value;
  const tokenCookie = request.cookies.get(AUTH_COOKIES.TOKEN)?.value;

  // Verify authentication
  const { isAuthenticated, tokenNeedsRenewal } = await verifyAuthentication(
    sessionCookie,
    tokenCookie
  );

  // If token needs renewal, you could trigger renewal here
  if (tokenNeedsRenewal) {
    console.warn("[Proxy] Token is near expiration and should be renewed");
    // TODO: Implement token renewal logic if needed
  }

  // Redirect unauthenticated users from protected routes to login
  if (!isPublicRoute && !isAuthenticated) {
    console.log(`[Proxy] Unauthorized access attempt to ${path}, redirecting to /login`);
    const loginUrl = new URL(withBasePath("/login"), request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page to dashboard
  if (path === "/login" && isAuthenticated) {
    console.log(`[Proxy] Authenticated user redirected from /login to /`);
    const dashboardUrl = new URL(withBasePath("/"), request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|xml|txt)).*)',
  ],
};