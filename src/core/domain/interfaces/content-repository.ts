import { Content, CreateContentDto, UpdateContentDto } from "../entities/Content"

export interface IContentRepository {
  getAllBySectionId(sectionId: number): Promise<Content[] | null>
  getById(id: number): Promise<Content | null>
  create(data: CreateContentDto): Promise<Content | null>
  update(id: number, data: UpdateContentDto): Promise<Content | null>
  delete(id: number): Promise<boolean>
}
