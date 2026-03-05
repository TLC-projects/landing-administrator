import { Content } from "@core/domain/entities/Content"
import { ContentApiResponse, ContentViewModel } from "./content-dto"

// API → Entity (Infrastructure layer)
export function contentApiToEntity(api: ContentApiResponse): Content {
  return {
    id: api.id,
    section_id: api.section_id,
    title: api.title,
    description: api.description,
    duration: api.duration,
    blocked: String(api.blocked),
    resources: api.resources ?? [],
  }
}

export function contentsApiToEntity(api: ContentApiResponse[]): Content[] {
  return api.map(contentApiToEntity)
}

// Entity → ViewModel (Application layer)
export function contentToViewModel(content: Content): ContentViewModel {
  return {
    id: String(content.id),
    sectionId: String(content.section_id),
    title: content.title,
    description: content.description,
    duration: content.duration,
    url: content.resources?.[0]?.url ?? "",
    blocked: content.blocked === '1',
  }
}

export function contentsToViewModel(contents: Content[]): ContentViewModel[] {
  return contents.map(contentToViewModel)
}
