import { UpdateContentDto } from "@core/application/dto/content"
import { Content } from "@/src/core/domain/entities/content"
import { IContentRepository } from "@core/domain/interfaces/content-repository"

export class UpdateContentUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(id: number, data: UpdateContentDto): Promise<Content | null> {
    const exists = await this.contentRepo.getById(id)
    if (!exists) throw new Error(`Contenido con id ${id} no encontrado`)

    return this.contentRepo.update(id, data)
  }
}
