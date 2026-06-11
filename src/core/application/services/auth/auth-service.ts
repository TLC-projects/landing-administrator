import { AuthResultDto, LoginCredentialsDto } from '@core/application/dto/auth';
import { LoginUseCase, LoginWithTokenUseCase, LogoutUseCase } from '@core/application/use-cases/auth';
import { AuthRepository } from '@core/domain/interfaces/auth-repository';
import { SessionRepository } from '@core/domain/interfaces/session-repository';
export class AuthService {
  private loginUseCase: LoginUseCase;
  private loginWithTokenUseCase: LoginWithTokenUseCase;
  private logoutUseCase: LogoutUseCase;

  constructor(authRepository: AuthRepository, sessionRepository: SessionRepository) {
    this.loginUseCase = new LoginUseCase(authRepository, sessionRepository);
    this.loginWithTokenUseCase = new LoginWithTokenUseCase(authRepository, sessionRepository);
    this.logoutUseCase = new LogoutUseCase(authRepository, sessionRepository);
  }

  async login(credentials: LoginCredentialsDto): Promise<AuthResultDto> {
    return this.loginUseCase.execute(credentials);
  }

  async loginWithToken(token: string): Promise<AuthResultDto> {
    return await this.loginWithTokenUseCase.execute({ data: token });
  }

  async logout(): Promise<AuthResultDto> {
    return this.logoutUseCase.execute();
  }
}
