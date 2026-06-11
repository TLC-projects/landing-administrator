import { Auth } from '@core/domain/entities/auth';

import { AuthResultDto, AuthUserDto } from './auth-response-dto';

export class AuthMapper {
  static toAuthUserDto(user: Auth): AuthUserDto {
    return {
      id: user.getId(),
      name: user.getName(),
      lastName: user.getLastName(),
      email: user.getEmail()
    };
  }

  static toAuthResultDto(success: boolean, message?: string, user?: Auth): AuthResultDto {
    return {
      success,
      message,
      user: user ? this.toAuthUserDto(user) : undefined
    };
  }

  static toAuth(data: any, token: string): Auth {
    return new Auth(data.id, data.name, data.lastName, data.email, token);
  }
}
