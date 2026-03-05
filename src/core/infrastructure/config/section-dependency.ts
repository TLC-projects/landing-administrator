import { HttpClientFactory } from "@core/infrastructure/factories/http-client-factory";
import { SectionRepositoryImpl } from "@core/infrastructure/repositories/section-repository";
import { SectionService } from "@core/application/services/section/section-service";

export async function getSectionDependencies() {
    const httpClient = await HttpClientFactory.getInstance().createHttpClient();
    
      // Create repositories with the HTTP client and base URL
      const projectRepository = new SectionRepositoryImpl(httpClient);
    
      return new SectionService(projectRepository);
}

// Singleton instance of ProjectService
// This ensures that the ProjectService is initialized only once and reused throughout the application
let sectionServiceInstance: SectionService | null = null;

export async function getSectionService(): Promise<SectionService> {
  if (!sectionServiceInstance) {
    sectionServiceInstance = await getSectionDependencies();
  }
  return sectionServiceInstance;
}