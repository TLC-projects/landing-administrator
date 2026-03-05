import { Content } from "@core/domain/entities/Content"

export interface IContentRepository {
  getAllBySectionId(sectionId: number): Promise<Content[] | null>
  getById(id: number): Promise<Content | null>
  getCountBySectionId(sectionId: number): Promise<number>
}
