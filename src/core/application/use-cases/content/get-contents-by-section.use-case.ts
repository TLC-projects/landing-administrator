import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentDto } from "@core/application/dto/content-dto"
import { contentsToViewModel } from "@core/application/dto/content-mapper"

export class GetContentsBySectionUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(sectionId: number): Promise<ContentDto[] | null> {
    try {
      const contents = await this.contentRepo.getAllBySectionId(sectionId)
      if (!contents) return null
      return contentsToViewModel(contents)
    } catch (error) {
      console.error(`[GetContentsBySectionUseCase] Error al obtener contenidos de la sección ${sectionId}:`, error)
      return null
    }
  }
}
