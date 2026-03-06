import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/jwt";
import { withBasePath } from "./lib/with-base-path";

export async function proxy(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get("auth_session")?.value;
  const tokenCookie = request.cookies.get("auth_token")?.value;

  const isLoginPage = pathname.startsWith("/login");

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