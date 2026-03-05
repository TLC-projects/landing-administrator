import { HttpClientFactory } from "@core/infrastructure/factories/http-client-factory";
import { SectionRepositoryImpl } from "@core/infrastructure/repositories/section-repository";
import { ContentRepositoryImpl } from "@core/infrastructure/repositories/content-repository";
import { SectionService } from "@core/application/services/section/section-service";

export async function getSectionDependencies() {
    const httpClient = await HttpClientFactory.getInstance().createHttpClient();
    const sectionRepository = new SectionRepositoryImpl(httpClient);
    const contentRepository = new ContentRepositoryImpl(httpClient);
    return new SectionService(sectionRepository, contentRepository);
}

// Singleton instance of SectionService
// This ensures that the SectionService is initialized only once and reused throughout the application
let sectionServiceInstance: SectionService | null = null;

export async function getSectionService(): Promise<SectionService> {
  if (!sectionServiceInstance) {
    sectionServiceInstance = await getSectionDependencies();
  }
  return sectionServiceInstance;
}