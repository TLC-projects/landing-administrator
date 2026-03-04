import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/jwt";

export async function proxy(request: NextRequest) {

  const sessionCookie = request.cookies.get("auth_session")?.value;
  const tokenCookie = request.cookies.get("auth_token")?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // Si no hay cookies y es ruta protegida
  if (isProtectedRoute && (!sessionCookie || !tokenCookie)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie && tokenCookie) {
    try {
      const session = await decrypt(sessionCookie);
      const token = await decrypt(tokenCookie);

      if (!session || !token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}