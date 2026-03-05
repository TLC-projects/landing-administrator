import { HttpClientFactory } from "@core/infrastructure/factories/http-client-factory";
import { ContentRepositoryImpl } from "@core/infrastructure/repositories/content-repository";
import { ContentService } from "@core/application/services/content/content-service";

export async function getContentDependencies() {
    const httpClient = await HttpClientFactory.getInstance().createHttpClient();
    const contentRepository = new ContentRepositoryImpl(httpClient);
    return new ContentService(contentRepository);
}

// Singleton instancia de ContentService
// Esta asegura que el ContentService se inicie una sola vez y se reutilice en toda la aplicación, evitando múltiples instancias y optimizando el rendimiento.
let contentServiceInstance: ContentService | null = null;

export async function getContentService(): Promise<ContentService> {
  if (!contentServiceInstance) {
    contentServiceInstance = await getContentDependencies();
  }
  return contentServiceInstance;
}