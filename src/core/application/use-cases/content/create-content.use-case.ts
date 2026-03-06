import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { Content } from "@core/domain/entities/Content"
import { CreateContentDto } from "@core/application/dto/content-dto"

export class CreateContentUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(data: CreateContentDto): Promise<Content | null> {
    if (!data.title || data.title.trim() === "") {
      throw new Error("El título del contenido es requerido")
    }

    return this.contentRepo.create(data)
  }
}
