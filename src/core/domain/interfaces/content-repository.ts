import { ContentViewModel } from "@core/application/dto/content-dto"

export interface IContentRepository {
  getAllBySectionId(sectionId: number): Promise<ContentViewModel[] | null>
  getById(id: number): Promise<ContentViewModel | null>
}
