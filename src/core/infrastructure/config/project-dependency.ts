import { ProjectService } from "@core/application/services/project/project-service";
import { HttpClientFactory } from "@core/infrastructure/factories/http-client-factory";
import { ProjectRepositoryImpl } from "@core/infrastructure/repositories/project-repository";


export async function getProjectDependencies() {
  const httpClient = await HttpClientFactory.getInstance().createHttpClient();

  // Create repositories with the HTTP client and base URL
  const projectRepository = new ProjectRepositoryImpl(httpClient);

  return new ProjectService(projectRepository);
}

// Singleton instance of ProjectService
// This ensures that the ProjectService is initialized only once and reused throughout the application
let projectServiceInstance: ProjectService | null = null;

export async function getProjectService(): Promise<ProjectService> {
  if (!projectServiceInstance) {
    projectServiceInstance = await getProjectDependencies();
  }
  return projectServiceInstance;
}
