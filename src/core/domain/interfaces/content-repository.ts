import { Content } from "@core/domain/entities/Content"
import { CreateContentDto, UpdateContentDto } from "@core/application/dto/content-dto"

export interface IContentRepository {
  getAllBySectionId(sectionId: number): Promise<Content[] | null>
  getById(id: number): Promise<Content | null>
  getCountBySectionId(sectionId: number): Promise<number>
  create(data: CreateContentDto): Promise<Content | null>
  update(id: number, data: UpdateContentDto): Promise<Content | null>
  delete(id: number): Promise<boolean>
}
