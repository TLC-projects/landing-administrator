'use server';

import { AuthService } from '@core/application/services/auth/auth-service';
import { CookieStorage } from '@core/infrastructure/datasources/cookie-storage/cookie-storage';
import { DataSourceType, HttpClientFactory } from '@core/infrastructure/factories/http-client-factory';
import { AuthRepositoryImpl } from '@core/infrastructure/repositories/auth-repository';
import { SessionRepositoryImpl } from '@core/infrastructure/repositories/session-repository';

// Auth Service Initialization
export async function initializeAuthService() {
  // Create an HTTP cliente instance using the factory
  const httpClient = await HttpClientFactory.getInstance().createHttpClient(DataSourceType.BASIC_HTTP);

  // Create repositories with the HTTP client
  const authRepository = new AuthRepositoryImpl(httpClient);
  const sessionRepository = new SessionRepositoryImpl(new CookieStorage());

  return new AuthService(authRepository, sessionRepository);
}

// Singleton instance of AuthService
// This ensures that the AuthService is initialized only once and reused throughout the application
let authServiceInstance: AuthService | null = null;

export async function getAuthService(): Promise<AuthService> {
  if (!authServiceInstance) {
    authServiceInstance = await initializeAuthService();
  }
  return authServiceInstance;
}
