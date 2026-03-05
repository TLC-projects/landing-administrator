import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { PaginatedContentResponse } from "@core/application/dto/content-dto"
import { contentsToViewModel } from "@core/application/dto/content-mapper"
import { PaginationParams } from "@core/domain/value-objects/pagination"

export class GetContentsBySectionUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(sectionId: number, params?: PaginationParams, search?: string): Promise<PaginatedContentResponse | null> {
    try {
      const result = await this.contentRepo.getAllBySectionId(sectionId, params, search)
      if (!result) return null
      return {
        data: contentsToViewModel(result.data),
        total: result.total,
        page: result.page,
        limit: result.limit,
      }
    } catch (error) {
      console.error(`[GetContentsBySectionUseCase] Error al obtener contenidos de la sección ${sectionId}:`, error)
      return null
    }
  }
}
