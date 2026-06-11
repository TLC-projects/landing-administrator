import { User } from '@core/domain/entities/user';

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
}
