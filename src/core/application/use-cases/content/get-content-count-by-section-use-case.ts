import { IContentRepository } from "@core/domain/interfaces/content-repository"

export class GetContentCountBySectionUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(sectionId: number): Promise<number> {
    try {
      if (!sectionId) return 0
      return await this.contentRepo.getCountBySectionId(sectionId)
    } catch (error) {
      console.error(`[GetContentCountBySectionUseCase] Error al obtener conteo de la sección ${sectionId}:`, error)
      return 0
    }
  }
}
