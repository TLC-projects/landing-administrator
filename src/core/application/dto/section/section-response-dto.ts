import { Section } from '@/src/core/domain/entities/section';

export interface SectionDto {
  id: string;
  name: string;
}

export interface PaginatedSectionResponse {
  total: number;
  page: number;
  limit: number;
  data: Section[];
}

export interface SectionServerResponseDto {
  page?: number;
  limit?: number;
  total?: number;
  data: SectionDto[] | SectionDto;
}
