import { Auth } from "@core/domain/entities/Auth";
import { AuthResultDto, AuthUserDto } from "./auth-dto";

export class AuthMapper {

    static toAuthUserDto(user: Auth): AuthUserDto {
        return {
            id: user.getId(),
            name: user.getName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
        };
    }

    static toAuthResultDto(
        success: boolean,
        message?: string,
        user?: Auth
    ): AuthResultDto {

        return {
            success,
            message,
            user: user ? this.toAuthUserDto(user) : undefined
        };

    }

    static toAuth(id: string, name: string, lastName: string, email: string, token: string ): Auth {
    return new Auth( id, name, lastName, email, token );
  }

}