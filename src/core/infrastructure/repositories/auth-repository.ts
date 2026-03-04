import { AuthRepository } from "@core/domain/interfaces/auth-repository";
import { HttpRepository } from "@core/domain/interfaces/http-repository";
import {
  AuthServerResponseDto,
  AuthUserDto,
  LoginCredentialsDto,
} from "@core/application/dto/auth-dto";
import { Auth } from "../../domain/entities/Auth";
import { AuthMapper } from "../../application/dto/auth.mapper";

export class AuthRepositoryImpl implements AuthRepository {
  private baseUrl: string;
  private httpClient: HttpRepository<AuthServerResponseDto>;

  constructor(httpClient: HttpRepository<AuthUserDto>) {
    this.baseUrl = "auth";
    this.httpClient = httpClient;
  }

  async authenticate({
    email,
    password,
  }: LoginCredentialsDto): Promise<Auth | null> {
    try {
      const response = await this.httpClient.post<AuthServerResponseDto>(
        `${this.baseUrl}/login`,
        { email, password },
      );

      if (!response) return null;

      const token = response.data;

      if (!token) {
        console.error("Login failed: No token received");
        return null;
      }
      // Now with the obtained token, make a request to get the user data
      const auth = await this.authenticateWithToken(token);

      return auth;
    } catch (error) {
      console.error(`Error in GET ${this.baseUrl}:`, error);
      return null;
    }
  }

  async authenticateWithToken(token: string): Promise<Auth | null> {
    try {
      // Make the authentication request with token
      const response = await this.httpClient.get(`${this.baseUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response) return null;
      const data = response.data;

      // Verify that the response contains the necessary data
      if (!data ) {
        console.error('Invalid token response:', data);
        return null;
      }

      const auth = AuthMapper.toAuth(data, token);
      return auth;
      
    } catch (error) {
      console.error(`Error in GET ${this.baseUrl}:`, error);
      return null;
    }
  }

  async deauthenticate(token: string): Promise<void> {
    try {
      await this.httpClient.post(`${this.baseUrl}/logout`, { token });
    } catch (error) {
      console.error(`Error in GET ${this.baseUrl}:`, error);
    }
  }
}
