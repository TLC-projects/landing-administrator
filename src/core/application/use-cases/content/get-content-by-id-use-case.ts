import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentDto, contentToViewModel } from "@core/application/dto/content"

export class GetContentByIdUseCase {
  constructor(private readonly contentRepo: IContentRepository) { }

  async execute(id: number): Promise<ContentDto | null> {
    const content = await this.contentRepo.getById(id)
    if (!content) return null
    return contentToViewModel(content)
  }
}
