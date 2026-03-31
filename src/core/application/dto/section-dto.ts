import { Section } from "@core/domain/entities/Section";

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
  data: SectionDto[] | SectionDto
  page?: number
  limit?: number
  total?: number
}