import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { Content } from "@core/domain/entities/Content"

export class GetContentsBySectionUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(sectionId: number): Promise<Content[] | null> {
    return this.contentRepo.getAllBySectionId(sectionId)
  }
}
