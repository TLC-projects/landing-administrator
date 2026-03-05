import { AuthRepository } from "@core/domain/interfaces/auth-repository";
import { SessionRepository } from "@core/domain/interfaces/session-repository";
import { AuthResultDto, LoginCredentialsDto } from "@core/application/dto/auth-dto";

export class LoginUseCase {
    constructor(
        private authRepository: AuthRepository,
        private sessionRepository: SessionRepository
    ) { }

    async execute(credentials: LoginCredentialsDto): Promise<AuthResultDto> {
        try {
            // Authenticate the user using the AuthRepository
            const auth = await this.authRepository.authenticate({
                email: credentials.email,
                password: credentials.password
            });

            // If authentication fails, return an error message
            if (!auth) {
                return { success: false, message: 'No se pudo iniciar sesión. Revisa los campos e inténtalo de nuevo.' };
            }

            // Extract user details from the Auth entity
            const userId = auth.getId();
            const name = auth.getName();
            const lastName = auth.getLastName();
            const email = auth.getEmail();
            const token = auth.getToken();

            // Create a new session using the SessionRepository
            await this.sessionRepository.createSession({
                userId: userId,
                token: token as string
            });

            return {
                success: true,
                user: { id: userId, email: email, name: name, lastName: lastName }
            };

        } catch (error) {
            console.error('Error en login:', error);
            return {
                success: false,
                message: 'No se pudo iniciar sesión. Revisa los campos e inténtalo de nuevo.'
            };
        }
    }
}