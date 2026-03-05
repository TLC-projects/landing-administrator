import { GetContentsBySectionUseCase } from "@core/application/use-cases/content/get-contents-by-section.use-case"
import { GetContentByIdUseCase } from "@core/application/use-cases/content/get-content-by-id.use-case"
import { GetContentCountBySectionUseCase } from "@core/application/use-cases/content/get-content-count-by-section.use-case"
import { ContentViewModel } from "@core/application/dto/content-dto"
import { IContentRepository } from "@core/domain/interfaces/content-repository"

export class ContentService {
  private getContentsBySectionUseCase: GetContentsBySectionUseCase
  private getContentByIdUseCase: GetContentByIdUseCase
  private getContentCountBySectionUseCase: GetContentCountBySectionUseCase

  constructor(contentRepository: IContentRepository) {
    this.getContentsBySectionUseCase = new GetContentsBySectionUseCase(contentRepository)
    this.getContentByIdUseCase = new GetContentByIdUseCase(contentRepository)
    this.getContentCountBySectionUseCase = new GetContentCountBySectionUseCase(contentRepository)
  }

  async getContentsBySection(sectionId: number): Promise<ContentViewModel[]> {
    const result = await this.getContentsBySectionUseCase.execute(sectionId)
    return result ?? []
  }

  async getContentById(id: number): Promise<ContentViewModel | null> {
    return this.getContentByIdUseCase.execute(id)
  }

  async getContentCountBySection(sectionId: number): Promise<number> {
    return await this.getContentCountBySectionUseCase.execute(sectionId)
  }
}
