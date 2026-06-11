import { SectionService } from '@core/application/services/section/section-service';
import { HttpClientFactory } from '@core/infrastructure/factories/http-client-factory';
import { ContentRepositoryImpl } from '@core/infrastructure/repositories/content-repository';
import { SectionRepositoryImpl } from '@core/infrastructure/repositories/section-repository';

// Section Service Initialization
export async function initializeSectionService() {
  // Create an HTTP cliente instance using the factory
  const httpClient = await HttpClientFactory.getInstance().createHttpClient();

  // Create repositories with the HTTP client
  const sectionRepository = new SectionRepositoryImpl(httpClient);
  const contentRepository = new ContentRepositoryImpl(httpClient);

  return new SectionService(sectionRepository, contentRepository);
}

// Singleton instance of SectionService
// This ensures that the SectionService is initialized only once and reused throughout the application
let sectionServiceInstance: SectionService | null = null;

export async function getSectionService(): Promise<SectionService> {
  if (!sectionServiceInstance) {
    sectionServiceInstance = await initializeSectionService();
  }
  return sectionServiceInstance;
}
