import { UserRepository } from "@core/domain/interfaces/user-repository";
import { HttpRepository } from "@core/domain/interfaces/http-repository";
import { UserResultDto, UserServerResponseDto } from "@core/application/dto/user-dto";
import { User } from "@core/domain/entities/User";
import { UserMapper } from "@core/application/dto/user-mapper";

export class UserRepositoryImpl implements UserRepository {

    private baseUrl: string;
    private httpClient: HttpRepository<UserServerResponseDto>;

    constructor(httpClient: HttpRepository<UserServerResponseDto>) {
    this.baseUrl = 'user';
    this.httpClient = httpClient;
  }

  /**
   * Gets a user by their ID.
   * @param {string} id - The ID of the user to get.
   * @returns {Promise<User | null>} - A promise that resolves with the user or null if the user does not exist.
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await this.httpClient.get(`${this.baseUrl}/${id}`);
      
      if (!response?.data) return null;

      return UserMapper.toUser(response.data as UserResultDto);

    } catch (error) {
      console.error(`Error in GET ${this.baseUrl}:`, error);
      return null;
    }
  }
}