import { Auth } from '@/src/core/domain/entities/auth_';

export interface AuthRepository {
  authenticate({ email, password }: { email: string; password: string }): Promise<Auth | null>;
  authenticateWithToken(token: string): Promise<Auth | null>;
  deauthenticate(token: string): Promise<void>;
}
