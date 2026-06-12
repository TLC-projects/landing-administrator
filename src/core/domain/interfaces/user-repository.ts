import { User } from '@/src/core/domain/entities/user_';

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
}
