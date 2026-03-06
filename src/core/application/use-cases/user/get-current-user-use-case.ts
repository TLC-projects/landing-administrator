import { User } from "@core/domain/entities/User";
import { SessionRepository } from "@core/domain/interfaces/session-repository";
import { UserRepository } from "@core/domain/interfaces/user-repository";

export class GetCurrentUserUseCase {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly userRepository: UserRepository
    ) { }

    async execute(): Promise<User | null> {
        try {
            const session = await this.sessionRepository.getSession();

            if (!session || !session.userId) {
                return null;
            }

            return await this.userRepository.getUserById(session.userId);
        } catch (error) {
            console.log('Error to get current user', error);
            return null;
        }
    }
}