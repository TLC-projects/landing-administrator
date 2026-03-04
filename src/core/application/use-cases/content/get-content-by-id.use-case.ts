import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { Content } from "@core/domain/entities/Content"

export class GetContentByIdUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(id: number): Promise<Content | null> {
    return this.contentRepo.getById(id)
  }
}
