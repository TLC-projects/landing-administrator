import { SectionDto } from "./section-dto"

export interface ProjectDto {
  id: string
  name: string
  description?: string
  sections?: SectionDto[]
}

export interface ProjectServerResponseDto {
  data: ProjectDto[] | ProjectDto
  page?: number
  limit?: number
  total?: number
}