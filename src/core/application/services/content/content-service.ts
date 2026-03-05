import { ContentRepositoryImpl } from "@core/infrastructure/repositories/content-repository"
import { GetContentsBySectionUseCase } from "@core/application/use-cases/content/get-contents-by-section.use-case"
import { GetContentByIdUseCase } from "@core/application/use-cases/content/get-content-by-id.use-case"
import { ContentViewModel } from "@core/application/dto/content-dto"

export class ContentService {
  private repo = new ContentRepositoryImpl()

  async getContentsBySection(sectionId: number): Promise<ContentViewModel[]> {
    const useCase = new GetContentsBySectionUseCase(this.repo)
    const result = await useCase.execute(sectionId)
    return result ?? []
  }

  async getContentById(id: number): Promise<ContentViewModel | null> {
    const useCase = new GetContentByIdUseCase(this.repo)
    return useCase.execute(id)
  }
}
