import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/jwt";

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

  // ❌ Usuario NO autenticado
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Usuario autenticado no puede ver login
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}