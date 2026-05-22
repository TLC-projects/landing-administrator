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
  brochure_url?: string // URL del brochure si existe
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
  file: File // Archivo principal (video, audio, documento, etc.)
  brochure?: File // Archivo brochure (PDF, documento, etc.)
}

export interface UpdateContentDto {
  title?: string
  description?: string
  duration?: string
  blocked?: boolean
  objectives?: string
  performance?: string
  file?: File // Archivo principal opcional para actualizar
  brochure?: File // Brochure opcional para actualizar
}

// Lo que usa la UI
export interface ContentDto {
  id: string
  sectionId: string
  title: string
  description: string
  duration: string
  url: string // URL del archivo principal
  blocked: boolean // 0 = false, 1 = true
  objectives?: string
  performance?: string
  brochureUrl?: string // URL del brochure si existe
}

export interface PaginatedContentResponse {
  data: ContentDto[]
  total: number
  page: number
  limit: number
}