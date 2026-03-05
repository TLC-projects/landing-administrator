import { Project } from "@core/domain/entities/Project"

export interface ProjectDto {
  id: string;
  name: string;
}

export interface PaginatedProjectResponse {
  total: number;
  page: number;
  limit: number;
  data: Project[];
}

export interface ProjectServerResponseDto {
  data: ProjectDto[] | ProjectDto
  page?: number
  limit?: number
  total?: number
}