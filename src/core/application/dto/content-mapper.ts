import { Content } from "@core/domain/entities/Content"
import { ContentServerResponseDto, ContentDto, CreateContentDto, UpdateContentDto } from "./content-dto"

// API → Entity (Infrastructure layer)
export function contentApiToEntity(api: ContentServerResponseDto): Content {
  return {
    id: api.id,
    section_id: api.section_id,
    title: api.title,
    description: api.description,
    duration: api.duration,
    blocked: api.blocked === 1 || api.blocked === true,
    resources: api.resources ?? [],
  }
}

export function contentsApiToEntity(api: ContentServerResponseDto[]): Content[] {
  return api.map(contentApiToEntity)
}

// Entity → ViewModel (Application layer)
export function contentToViewModel(content: Content): ContentDto {
  return {
    id: String(content.id),
    sectionId: String(content.section_id),
    title: content.title,
    description: content.description,
    duration: content.duration,
    url: content.resources?.[0]?.url ?? "",
    blocked: content.blocked,
  }
}

export function contentsToViewModel(contents: Content[]): ContentDto[] {
  return contents.map(contentToViewModel)
}

// Domain DTO → FormData (Infrastructure layer — para enviar al servidor)
export function createContentDtoToFormData(dto: CreateContentDto): FormData {
  const formData = new FormData()
  formData.append('title', dto.title)
  formData.append('description', dto.description)
  formData.append('duration', dto.duration)
  formData.append('blocked', String(dto.blocked))
  formData.append('section_id', String(dto.section_id))
  if (dto.resource) formData.append('resources', dto.resource)
  return formData
}

export function updateContentDtoToFormData(dto: UpdateContentDto): FormData {
  const formData = new FormData()
  if (dto.title !== undefined) formData.append('title', dto.title)
  if (dto.description !== undefined) formData.append('description', dto.description)
  if (dto.duration !== undefined) formData.append('duration', dto.duration)
  if (dto.blocked !== undefined) formData.append('blocked', String(dto.blocked))
  if (dto.resource) formData.append('resources', dto.resource)
  return formData
}
