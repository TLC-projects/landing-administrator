import { UserRepository } from "@core/domain/interfaces/user-repository";
import { GetCurrentUserUseCase } from "@core/application/use-cases/user/get-current-user-use-case";
import { SessionRepository } from "@core/domain/interfaces/session-repository";

export class UserService {
    private getCurrentUserUseCase: GetCurrentUserUseCase;
    constructor(userRepository: UserRepository, sessionRepository: SessionRepository) {
        this.getCurrentUserUseCase = new GetCurrentUserUseCase(sessionRepository, userRepository);
    }

    async getCurrentUser() {
        return await this.getCurrentUserUseCase.execute();
    }
}