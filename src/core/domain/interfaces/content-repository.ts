import { CreateContentDto, PaginatedContentResponse, UpdateContentDto } from '@core/application/dto/content';
import { Content, ContentFilters } from '@/src/core/domain/entities/content_';
import { PaginationParams } from '@core/domain/value-objects/pagination';

export interface ContentRepository {
  getAllContentBySectionId(
    sectionId: string,
    params?: PaginationParams,
    filters?: ContentFilters
  ): Promise<PaginatedContentResponse>;
  getContentById(id: string): Promise<Content | null>;
  getCountBySectionId(sectionId: string): Promise<number>;
  createContent(dto: CreateContentDto): Promise<void>;
  updateContent(id: string, dto: UpdateContentDto): Promise<void>;
  deleteContent(id: string): Promise<void>;
}
