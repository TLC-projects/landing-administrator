import { SectionRepositoryImpl } from "@core/infrastructure/repositories/section-repository"
import { GetSectionsByProjectUseCase } from "@core/application/use-cases/section/get-sections-by-project.use-case"
import { SectionViewModel } from "@core/application/dto/section-dto"

export class SectionService {
  private repo = new SectionRepositoryImpl()

  async getSectionsByProject(projectId: number): Promise<SectionViewModel[]> {
    const useCase = new GetSectionsByProjectUseCase(this.repo)
    const result = await useCase.execute(projectId)
    return result ?? []
  }

  async getSectionById(id: number): Promise<SectionViewModel | null> {
    return this.repo.getById(id)
  }
}
