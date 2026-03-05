import { ISectionRepository } from "@core/domain/interfaces/section-repository"
import { SectionViewModel } from "@core/application/dto/section-dto"

export class GetSectionByIdUseCase {
  constructor(private readonly sectionRepo: ISectionRepository) {}

  async execute(id: number): Promise<SectionViewModel | null> {
    return this.sectionRepo.getById(id)
  }
}
