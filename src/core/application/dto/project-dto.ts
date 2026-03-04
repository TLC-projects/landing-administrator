export interface ProjectDto {
  id: string
  name: string
  description?: string
}

export interface ProjectServerResponseDto {
  data: ProjectDto[]
  page?: number
  limit?: number
  total?: number
}