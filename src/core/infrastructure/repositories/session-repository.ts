
import { Session } from "@core/domain/entities/Session"
import { SessionRepository } from "@core/domain/interfaces/session-repository"
import { CookieStorage } from "../datasources/cookie-storage/cookie-storage"
import { decrypt, encrypt } from "@/src/lib/auth/jwt"

export class SessionRepositoryImpl implements SessionRepository {
  constructor(private cookieStorage: CookieStorage) {}

  private COOKIE_OPTIONS = {
    path: "/",
    maxAge: 60 * 60 * 24, // 24h
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? ("strict" as const) : ("lax" as const),
    secure: process.env.NODE_ENV === "production"
  }

  async createSession({ userId, token }: Session): Promise<void> {

    console.log(userId, token);

    const sessionEncrypted = await encrypt({ userId })
    const tokenEncrypted = await encrypt({ token })

    await this.cookieStorage.set(
      "auth_session",
      sessionEncrypted,
      this.COOKIE_OPTIONS
    )

    await this.cookieStorage.set(
      "auth_token",
      tokenEncrypted,
      this.COOKIE_OPTIONS
    )
  }

  async getSession(): Promise<Session | null> {

    const sessionCookie = await this.cookieStorage.get("auth_session")
    const tokenCookie = await this.cookieStorage.get("auth_token")

    if (!sessionCookie || !tokenCookie) return null

    const session = await decrypt<{ userId: string }>(sessionCookie)
    const token = await decrypt<{ token: string }>(tokenCookie)

    if (!session || !token) return null

    return {
      ...session,
      ...token
    }
  }

  async removeSession(): Promise<void> {
    await this.cookieStorage.remove("auth_session")
    await this.cookieStorage.remove("auth_token")
  }

  async updateSession(session: Session): Promise<void> {
    const current = await this.getSession()

    if (!current) return

    await this.createSession(session)
  }
}