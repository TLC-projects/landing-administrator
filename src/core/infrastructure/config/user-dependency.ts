import { UserService } from "@core/application/services/user/user-service";
import { CookieStorage } from "@core/infrastructure/datasources/cookie-storage/cookie-storage";
import { HttpClientFactory } from "@core/infrastructure/factories/http-client-factory";
import { SessionRepositoryImpl } from "@core/infrastructure/repositories/session-repository";
import { UserRepositoryImpl } from "@core/infrastructure/repositories/user-repository";


export async function initializeUserService() {
  const httpClient = await HttpClientFactory.getInstance().createHttpClient();

  // Create repositories with the HTTP client and base URL
  const userRepository = new UserRepositoryImpl(httpClient);

  // Use CookieStorage for session management
  // This allows the UserService to manage user sessions using cookies
  const sessionRepository = new SessionRepositoryImpl(new CookieStorage());

  return new UserService(userRepository, sessionRepository);
}

// Singleton instance of UserService
// This ensures that the UserService is initialized only once and reused throughout the application
let userServiceInstance: UserService | null = null;

export async function getUserService(): Promise<UserService> {
  if (!userServiceInstance) {
    userServiceInstance = await initializeUserService();
  }
  return userServiceInstance;
}
