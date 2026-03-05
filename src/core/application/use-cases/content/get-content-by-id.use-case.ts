import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentViewModel } from "@core/application/dto/content-dto"

export class GetContentByIdUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(id: number): Promise<ContentViewModel | null> {
    return this.contentRepo.getById(id)
  }
}
