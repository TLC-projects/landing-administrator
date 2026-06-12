import { Content } from '@/src/core/domain/entities/content';

export interface PaginatedContentResponse {
  total: number;
  page: number;
  limit: number;
  data: Content[];
}

export interface ContentResourcesDto {
  id: number;
  url: string;
  content_id: number;
}

export interface ContentDto {
  id: string;
  section_id: string;
  title: string;
  description: string;
  duration: string;
  blocked: number; // 0 = false, 1 = true
  resources?: ContentResourcesDto[];
  objectives?: string;
  performance?: string;
  brochure_url?: string; // URL del brochure si existe
}

export interface ContentListServerResponseDto {
  total?: number;
  page?: number;
  limit?: number;
  data: ContentDto[] | ContentDto;
}
