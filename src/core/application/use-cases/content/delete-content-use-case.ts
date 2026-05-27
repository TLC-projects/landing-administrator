import { IContentRepository } from "@core/domain/interfaces/content-repository"

export class DeleteContentUseCase {
  constructor(private readonly contentRepo: IContentRepository) {}

  async execute(id: number): Promise<boolean> {
    const exists = await this.contentRepo.getById(id)
    if (!exists) throw new Error(`Contenido con id ${id} no encontrado`)

    return this.contentRepo.delete(id)
  }
}
