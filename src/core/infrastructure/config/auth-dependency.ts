'use server';

import { AuthService } from "@core/application/services/auth-service";
import { CookieStorage } from "../datasources/cookie-storage/cookie-storage";
import { DataSourceType, HttpClientFactory } from "../factories/http-client-factory";
import { AuthRepositoryImpl } from "../repositories/auth-repository";
import { SessionRepositoryImpl } from "../repositories/user-repository";

export async function initializeAuthService() {
    // Inicializar el servicio de autenticación
    const httpClient = await HttpClientFactory.getInstance().createHttpClient(DataSourceType.BASIC_HTTP);

    // Create repositories with the HTTP client and base URL
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