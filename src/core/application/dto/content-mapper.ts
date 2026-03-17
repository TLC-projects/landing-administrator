import { Content } from "@core/domain/entities/Content"
import { ContentServerResponseDto, ContentDto, CreateContentDto, UpdateContentDto } from "./content-dto"

// API → Entity (Infrastructure layer)
export function contentApiToEntity(api: ContentServerResponseDto): Content {
  return new Content(
    api.id,
    api.section_id,
    api.title,
    api.description,
    api.duration,
    api.blocked === 1 || api.blocked === true,
    api.resources ?? [],
    api.objectives,
    api.performance
  )
}

export function contentsApiToEntity(api: ContentServerResponseDto[]): Content[] {
  return api.map(contentApiToEntity)
}

// Entidad -> ViewModel (Application capa)
export function contentToViewModel(content: Content): ContentDto {
  return {
    id: String(content.id),
    sectionId: String(content.sectionId),
    title: content.title,
    description: content.description,
    duration: content.duration,
    url: content.getMainResourceUrl() ?? "", // URL del recurso principal
    blocked: content.isBlocked(),
    objectives: content.objectives,
    performance: content.performance
  }
}

export function contentsToViewModel(contents: Content[]): ContentDto[] {
  return contents.map(contentToViewModel)
}

// Domain DTO ->FormData (Infrastructure capa — para enviar al servidor)
export function createContentDtoToFormData(dto: CreateContentDto): FormData {
  const formData = new FormData()
  formData.append('title', dto.title)
  formData.append('description', dto.description)
  formData.append('duration', dto.duration)
  formData.append('blocked', String(dto.blocked))
  formData.append('section_id', String(dto.section_id))
  formData.append('objectives', dto.objectives ?? '')
  formData.append('performance', dto.performance ?? '')
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
  if (dto.objectives !== undefined) formData.append('objectives', dto.objectives)
  if (dto.performance !== undefined) formData.append('performance', dto.performance)
  return formData
}
