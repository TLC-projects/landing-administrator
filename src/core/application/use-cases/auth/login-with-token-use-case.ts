import { AuthRepository } from "@core/domain/interfaces/auth-repository";
import { SessionRepository } from "@core/domain/interfaces/session-repository";
import { AuthResultDto, TokenCredentialsDto } from "../../dto/auth-dto";

export class LoginWithTokenUseCase {
    constructor(
        private authRepository: AuthRepository,
        private sessionRepository: SessionRepository
    ) { }

    async execute(credentials: TokenCredentialsDto): Promise<AuthResultDto> {
        try {
      const token = credentials.token;
      const auth = await this.authRepository.authenticateWithToken(token);

      if (!auth) {
        return { success: false, message: 'Token inválido o expirado' };
      }

      const userId = auth.getId();
      const role = auth.getRole();

      // Crear sesión usando el repositorio de sesiones
      await this.sessionRepository.createSession({ userId, role, token });

      return {
        success: true,
        user: { id: userId, role: role }
      };
    } catch (error) {
      console.error('Error en login con token:', error);
      return {
        success: false,
        message: 'Error en la autenticación con token'
      };
    }
    }

}