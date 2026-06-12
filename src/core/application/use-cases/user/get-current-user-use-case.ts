import { SessionRepository } from '@core/domain/interfaces/session-repository';
import { UserRepository } from '@core/domain/interfaces/user-repository';

import { User } from '@/src/core/domain/entities/user_';

/**
 * Get Current User (Use Case)
 * This use case retrieves the current authenticated user by first obtaining the session information and then fetching the user details based on the user ID stored in the session. If there is no valid session or if an error occurs during the process, it returns null.
 */
export class GetCurrentUserUseCase {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(): Promise<User | null> {
    const session = await this.sessionRepository.getSession();
    if (!session || !session.userId) return null;

    return await this.userRepository.getUserById(session.userId);
  }
}
