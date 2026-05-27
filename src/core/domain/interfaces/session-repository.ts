import { Session } from "../entities/session"

export interface SessionRepository {
  createSession(session: Session): Promise<void>
  getSession(): Promise<Session | null>
  updateSession(session: Session): Promise<void>
  removeSession(): Promise<void>
}