import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentViewModel } from "@core/application/dto/content-dto"

export class GetContentsBySectionUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(sectionId: number): Promise<ContentViewModel[] | null> {
    try {
      return this.contentRepo.getAllBySectionId(sectionId)
    } catch (error) {
      console.error(`[GetContentsBySectionUseCase] Error al obtener contenidos de la sección ${sectionId}:`, error)
      return null
    }
  }
}
