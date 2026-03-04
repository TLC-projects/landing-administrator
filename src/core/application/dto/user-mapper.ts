import { User } from "@core/domain/entities/User";
import { UserResultDto } from "./user-dto";

export class UserMapper {

  static toUser(data: UserResultDto): User {

    const fullName = `${data.name} ${data.lastName}`;

    return new User(
      data.id,
      fullName,
      data.email
    );

  }

}