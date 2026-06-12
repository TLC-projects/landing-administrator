import { PaginatedSectionResponse } from '@core/application/dto/section';
import { Section, SectionFilters } from '@/src/core/domain/entities/section_';
import { PaginationParams } from '@core/domain/value-objects/pagination';

export interface SectionRepository {
  getAllSections(params: PaginationParams, filters?: SectionFilters): Promise<PaginatedSectionResponse>;
  getSectionById(id: string): Promise<Section | null>;
}
