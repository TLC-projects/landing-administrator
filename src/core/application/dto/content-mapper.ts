import { ContentApiResponse, ContentViewModel } from "./content-dto"

// API → UI: transforma UN contenido
export function contentToViewModel(api: ContentApiResponse): ContentViewModel {
  return {
    id: String(api.id),
    sectionId: String(api.section_id),
    title: api.title,
    description: api.description,
    duration: api.duration,
    url: api.resources?.[0]?.url ?? "", //src -> imagen
    blocked: api.blocked === 1,
  }
}

// API -> iu
export function contentsToViewModel(api: ContentApiResponse[]): ContentViewModel[] {
  return api.map(contentToViewModel)
}
