import { Auth } from "../entities/Auth";

export interface AuthRepository {
  authenticate({ email, password }: { email: string, password: string }): Promise<Auth | null >;
  authenticateWithToken(token: string): Promise<Auth | null >;
  deauthenticate(token: string): Promise<void>;
}