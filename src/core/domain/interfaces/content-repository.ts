import { Content } from "@core/domain/entities/Content"
import { CreateContentDto, UpdateContentDto } from "@core/application/dto/content-dto"
import { PaginationParams } from "@core/domain/value-objects/pagination"

export interface PaginatedContentEntityResponse {
  data: Content[]
  total: number
  page: number
  limit: number
}

export interface IContentRepository {
  getAllBySectionId(sectionId: number, params?: PaginationParams, search?: string, blocked?: boolean): Promise<PaginatedContentEntityResponse | null>
  getById(id: number): Promise<Content | null>
  getCountBySectionId(sectionId: number): Promise<number>
  create(data: CreateContentDto): Promise<Content | null>
  update(id: number, data: UpdateContentDto): Promise<Content | null>
  delete(id: number): Promise<boolean>
}
