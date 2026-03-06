import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/jwt";
import { withBasePath } from "./lib/with-base-path";
import { getStrippedPath } from "./lib/get-stripped-path";

export async function proxy(request: NextRequest) {

  // Get the current path (stripped of basePath)
  const path = getStrippedPath(request);

  const sessionCookie = request.cookies.get("auth_session")?.value;
  const tokenCookie = request.cookies.get("auth_token")?.value;

  const isLoginPage = path.startsWith("/login");

  let isAuthenticated = false;

  if (sessionCookie && tokenCookie) {
    try {
      const session = await decrypt(sessionCookie);
      const token = await decrypt(tokenCookie);

      if (session && token) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL(withBasePath('/login'), request.url));
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL(withBasePath('/'), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};