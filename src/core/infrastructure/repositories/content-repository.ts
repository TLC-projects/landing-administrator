import { HttpClientFactory, DataSourceType } from "../factories/http-client-factory"
import { ContentApiResponse } from "@core/application/dto/content-dto"

export class ContentRepositoryImpl {
  private async getClient() {
    return HttpClientFactory.getInstance().createHttpClient(DataSourceType.HTTP)
  }

  async getAllBySectionId(sectionId: number): Promise<ContentApiResponse[] | null> {
    try {
      const client = await this.getClient()
      const response = await client.get<{ data: ContentApiResponse[] }>(`content/section/${sectionId}`)
      if (!response) return null
      return response.data
    } catch (error) {
      console.error(`[ContentRepository] Error al obtener contenidos de la sección ${sectionId}:`, error)
      return null
    }
  }
}