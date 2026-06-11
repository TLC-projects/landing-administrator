import { ContentService } from '@core/application/services/content/content-service';
import { HttpClientFactory } from '@core/infrastructure/factories/http-client-factory';
import { ContentRepositoryImpl } from '@core/infrastructure/repositories/content-repository';

// Content Service Initialization
export async function initializeContentService() {
  // Create an HTTP cliente instance using the factory
  const httpClient = await HttpClientFactory.getInstance().createHttpClient();

  // Create repository with the HTTP client
  const contentRepository = new ContentRepositoryImpl(httpClient);

  return new ContentService(contentRepository);
}

// Singleton instance of ContentService
// This ensures that the ContentService is initialized only once and reused throughout the application
let contentServiceInstance: ContentService | null = null;

export async function getContentService(): Promise<ContentService> {
  if (!contentServiceInstance) {
    contentServiceInstance = await initializeContentService();
  }
  return contentServiceInstance;
}
