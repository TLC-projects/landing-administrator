import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentDto } from "@core/application/dto/content-dto"
import { contentToViewModel } from "@core/application/dto/content-mapper"

export class GetContentByIdUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(id: number): Promise<ContentDto | null> {
    const content = await this.contentRepo.getById(id)
    if (!content) return null
    return contentToViewModel(content)
  }
}
