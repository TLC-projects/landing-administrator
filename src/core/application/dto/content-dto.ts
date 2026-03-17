// Lo que devuelve la API (GET / respuesta de POST y PUT)
export interface ContentResourceServerResponseDto {
  id: number
  url: string
  content_id: number
}

export interface ContentServerResponseDto {
  id: number
  section_id: number
  title: string
  description: string
  duration: string
  blocked: number | boolean // 0 | 1 | true | false
  resources: ContentResourceServerResponseDto[]
  objectives?: string
  performance?: string
}

export interface ContentListServerResponseDto {
  data: ContentServerResponseDto[]
  total?: number
  page?: number
  limit?: number
}

// Lo que envía el cliente al servidor (POST / PUT)
export interface CreateContentDto {
  title: string
  description: string
  duration: string
  blocked: boolean
  objectives?: string
  performance?: string
  section_id: number
  resource: File
}

export interface UpdateContentDto {
  title?: string
  description?: string
  duration?: string
  blocked?: boolean
  resource?: File
  objectives?: string
  performance?: string
}

// Lo que usa la UI
export interface ContentDto {
  id: string
  sectionId: string
  title: string
  description: string
  duration: string
  url: string
  blocked: boolean // 0 = false, 1 = true
  objectives?: string
  performance?: string
}

export interface PaginatedContentResponse {
  data: ContentDto[]
  total: number
  page: number
  limit: number
}