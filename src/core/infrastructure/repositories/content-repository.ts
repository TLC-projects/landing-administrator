import { Content } from "@core/domain/entities/Content"
import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentServerResponseDto, CreateContentDto, UpdateContentDto } from "@core/application/dto/content-dto"
import { contentApiToEntity, contentsApiToEntity, createContentDtoToFormData, updateContentDtoToFormData } from "@core/application/dto/content-mapper"
import { HttpRepository } from "@core/domain/interfaces/http-repository"

export class ContentRepositoryImpl implements IContentRepository {
  private baseUrl: string;
  private httpClient: HttpRepository;

  constructor(httpClient: HttpRepository) {
    this.baseUrl = 'content';
    this.httpClient = httpClient;
  }

  async getAllBySectionId(sectionId: number): Promise<Content[] | null> {
    try {
      const response = await this.httpClient.get<{ data: ContentServerResponseDto[] }>(`${this.baseUrl}/section/${sectionId}`)
      if (!response) return null
      return contentsApiToEntity(response.data)
    } catch (error) {
      console.error(`[ContentRepository] Error al obtener contenidos de la sección ${sectionId}:`, error)
      return null
    }
  }

  async getById(id: number): Promise<Content | null> {
    try {
      const response = await this.httpClient.get<{ data: ContentServerResponseDto }>(`${this.baseUrl}/${id}`)
      if (!response) return null
      return contentApiToEntity(response.data)
    } catch (error) {
      console.error(`[ContentRepository] Error al obtener contenido ${id}:`, error)
      return null
    }
  }

  async getCountBySectionId(sectionId: number): Promise<number> {
    try {
      const response = await this.httpClient.get<{ data: ContentServerResponseDto[] }>(`${this.baseUrl}/section/${sectionId}`)
      if (!response || !Array.isArray(response.data)) return 0
      return response.data.length
    } catch (error) {
      console.error(`[ContentRepository] Error al obtener conteo de contenidos de la sección ${sectionId}:`, error)
      return 0
    }
  }

  async create(data: CreateContentDto): Promise<Content | null> {
    try {
      const formData = createContentDtoToFormData(data)
      const response = await this.httpClient.post<{ data: ContentServerResponseDto }>(this.baseUrl, formData)
      if (!response?.data) return null
      return contentApiToEntity(response.data)
    } catch (error) {
      console.error('[ContentRepository] Error al crear contenido:', error)
      return null
    }
  }

  async update(id: number, data: UpdateContentDto): Promise<Content | null> {
    try {
      const formData = updateContentDtoToFormData(data)
      const response = await this.httpClient.put<{ data: ContentServerResponseDto }>(`${this.baseUrl}/${id}`, formData)
      if (!response?.data) return null
      return contentApiToEntity(response.data)
    } catch (error) {
      console.error(`[ContentRepository] Error al actualizar contenido ${id}:`, error)
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      return await this.httpClient.delete(`${this.baseUrl}/${id}`)
    } catch (error) {
      console.error(`[ContentRepository] Error al eliminar contenido ${id}:`, error)
      return false
    }
  }
}