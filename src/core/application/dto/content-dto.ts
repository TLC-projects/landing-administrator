// Lo que devuelve la API
export interface ContentResourceApiResponse {
  id: number
  url: string
  content_id: number
}
export interface ContentApiResponse {
  id: number
  section_id: number
  title: string
  description: string
  duration: string
  blocked: number // 0 | 1
  resources: ContentResourceApiResponse[]
}

// Lo que usa la ui
export interface ContentViewModel {
  id: string
  sectionId: string
  title: string
  description: string 
  duration: string
  url: string  
  blocked: boolean // 0 = false, 1 = true
}