import { AuthRepository } from "@core/domain/interfaces/auth-repository";
import { SessionRepository } from "@core/domain/interfaces/session-repository";
import { AuthResultDto } from "@core/application/dto/auth-dto";

export class LogoutUseCase {
    constructor(
        private authRepository: AuthRepository,
        private sessionRepository: SessionRepository
    ) { }

    async execute(): Promise<AuthResultDto> {
        const session = await this.sessionRepository.getSession();
        if (!session || !session.token) {
            return {
                success: false,
                message: 'No active session found.'
            };
        }
        await this.authRepository.deauthenticate(session.token);
        await this.sessionRepository.removeSession();

        return {
            success: true
        };
    }
}