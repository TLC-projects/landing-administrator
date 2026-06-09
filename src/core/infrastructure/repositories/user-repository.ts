import { UserMapper, UserResultDto, UserServerResponseDto } from '@core/application/dto/user';
import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { UserRepository } from '@core/domain/interfaces/user-repository';
import { unwrap } from '@lib/errors';

import { User } from '@/src/core/domain/entities/user';

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
      const response = unwrap(await this.httpClient.get(`${this.baseUrl}/${id}`));

      if (!response?.data) return null;

      return UserMapper.toUser(response.data as UserResultDto);
    } catch (error) {
      console.error(`Error in GET ${this.baseUrl}:`, error);
      return null;
    }
  }
}
