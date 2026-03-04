import { User } from "@core/domain/entities/User";
import { UserResultDto } from "./user-dto";

export class UserMapper {

  static toUser(data: UserResultDto): User {
    return new User(
      data.id,
      data.name,
      data.lastName,
      data.email,
      data.password
    );
  }

}