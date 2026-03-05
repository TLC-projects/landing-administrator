import { GetContentsBySectionUseCase } from "@core/application/use-cases/content/get-contents-by-section.use-case"
import { GetContentByIdUseCase } from "@core/application/use-cases/content/get-content-by-id.use-case"
import { GetContentCountBySectionUseCase } from "@core/application/use-cases/content/get-content-count-by-section.use-case"
import { CreateContentUseCase } from "@core/application/use-cases/content/create-content.use-case"
import { UpdateContentUseCase } from "@core/application/use-cases/content/update-content.use-case"
import { DeleteContentUseCase } from "@core/application/use-cases/content/delete-content.use-case"
import { ContentDto, PaginatedContentResponse, CreateContentDto, UpdateContentDto } from "@core/application/dto/content-dto"
import { contentToViewModel } from "@core/application/dto/content-mapper"
import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { PaginationParams } from "@core/domain/value-objects/pagination"

export class ContentService {
  private getContentsBySectionUseCase: GetContentsBySectionUseCase
  private getContentByIdUseCase: GetContentByIdUseCase
  private getContentCountBySectionUseCase: GetContentCountBySectionUseCase
  private createContentUseCase: CreateContentUseCase
  private updateContentUseCase: UpdateContentUseCase
  private deleteContentUseCase: DeleteContentUseCase

  constructor(contentRepository: IContentRepository) {
    this.getContentsBySectionUseCase = new GetContentsBySectionUseCase(contentRepository)
    this.getContentByIdUseCase = new GetContentByIdUseCase(contentRepository)
    this.getContentCountBySectionUseCase = new GetContentCountBySectionUseCase(contentRepository)
    this.createContentUseCase = new CreateContentUseCase(contentRepository)
    this.updateContentUseCase = new UpdateContentUseCase(contentRepository)
    this.deleteContentUseCase = new DeleteContentUseCase(contentRepository)
  }

  async getContentsBySection(sectionId: number, params?: PaginationParams, search?: string): Promise<PaginatedContentResponse> {
    const result = await this.getContentsBySectionUseCase.execute(sectionId, params, search)
    if (!result) return { data: [], total: 0, page: params?.page ?? 1, limit: params?.limit ?? 10 }
    return result
  }

  async getContentById(id: number): Promise<ContentDto | null> {
    return this.getContentByIdUseCase.execute(id)
  }

  async getContentCountBySection(sectionId: number): Promise<number> {
    return await this.getContentCountBySectionUseCase.execute(sectionId)
  }

  async createContent(data: CreateContentDto): Promise<ContentDto | null> {
    const content = await this.createContentUseCase.execute(data)
    if (!content) return null
    return contentToViewModel(content)
  }

  async updateContent(id: number, data: UpdateContentDto): Promise<ContentDto | null> {
    const content = await this.updateContentUseCase.execute(id, data)
    if (!content) return null
    return contentToViewModel(content)
  }

  async deleteContent(id: number): Promise<boolean> {
    return this.deleteContentUseCase.execute(id)
  }
}
