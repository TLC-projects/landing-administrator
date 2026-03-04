import { ISectionRepository } from "@core/domain/interfaces/section-repository"
import { SectionViewModel } from "@core/application/dto/section-dto"
import { ContentRepositoryImpl } from "@core/infrastructure/repositories/content-repository"
import { sectionToViewModelWithCount } from "@core/application/dto/section-mapper"
import { SectionApiResponse } from "@core/application/dto/section-dto"

export class GetSectionsByProjectUseCase {
  private contentRepo = new ContentRepositoryImpl()

  constructor(private sectionRepo: ISectionRepository) {}

  async execute(projectId: number): Promise<SectionViewModel[] | null> {
    try {
      // Obtiene todas las secciones del proyecto sin el conteo de contenidos
      const sections = await this.sectionRepo.getAllRaw(projectId)
      if (!sections) return null

      // Calcula el conteo de contenidos para cada sección
      const sectionsWithCount = await Promise.all(
        sections.map(async (section: SectionApiResponse) => {
          const contents = await this.contentRepo.getAllBySectionId(section.id)
          const contentNumber = contents?.length ?? 0
          return sectionToViewModelWithCount(section, contentNumber)
        })
      )

      return sectionsWithCount
    } catch (error) {
      console.error(`[GetSectionsByProjectUseCase] Error al obtener secciones del proyecto ${projectId}:`, error)
      return null
    }
  }
}