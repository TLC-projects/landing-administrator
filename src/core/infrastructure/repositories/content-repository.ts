import { IContentRepository } from "@core/domain/interfaces/content-repository"
import { ContentApiResponse, ContentViewModel } from "@core/application/dto/content-dto"
import { contentToViewModel, contentsToViewModel } from "@core/application/dto/content-mapper"
import { HttpClientFactory, DataSourceType } from "../factories/http-client-factory"

export class ContentRepositoryImpl implements IContentRepository {
  private async getClient() {
    return HttpClientFactory.getInstance().createHttpClient(DataSourceType.HTTP)
  }

  async getAllBySectionId(sectionId: number): Promise<ContentViewModel[] | null> {
    try {
      const client = await this.getClient()
      const response = await client.get<{ data: ContentApiResponse[] }>(`content/section/${sectionId}`)
      if (!response) return null
      return contentsToViewModel(response.data)
    } catch (error) {
      console.error(`[ContentRepository] Error al obtener contenidos de la sección ${sectionId}:`, error)
      return null
    }
  }

  async getById(id: number): Promise<ContentViewModel | null> {
    try {
      const client = await this.getClient()
      const response = await client.get<{ data: ContentApiResponse }>(`content/${id}`)
      if (!response) return null
      return contentToViewModel(response.data)
    } catch (error) {
      console.error(`[ContentRepository] Error al obtener contenido ${id}:`, error)
      return null
    }
  }
}