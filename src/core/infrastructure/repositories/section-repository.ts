import { ISectionRepository } from "@core/domain/interfaces/section-repository"
import { SectionApiResponse, SectionViewModel } from "@core/application/dto/section-dto"
import { sectionToViewModel } from "@core/application/dto/section-mapper"
import { HttpClientFactory, DataSourceType } from "../factories/http-client-factory"

export class SectionRepositoryImpl implements ISectionRepository {
  private async getClient() {
    return HttpClientFactory.getInstance().createHttpClient(DataSourceType.HTTP)
  }

  async getAllRaw(projectId: number): Promise<SectionApiResponse[] | null> {
    try {
      const client = await this.getClient()
      const response = await client.get<{ data: SectionApiResponse[] }>(`section/project/${projectId}`)
      if (!response) return null
      return response.data
    } catch (error) {
      console.error(`[SectionRepository] Error al obtener secciones del proyecto ${projectId}:`, error)
      return null
    }
  }

  async getAll(projectId: number): Promise<SectionViewModel[] | null> {
    try {
      const raw = await this.getAllRaw(projectId)
      if (!raw) return null
      return raw.map(sectionToViewModel)
    } catch (error) {
      console.error(`[SectionRepository] Error al transformar secciones del proyecto ${projectId}:`, error)
      return null
    }
  }

  async getById(id: number): Promise<SectionViewModel | null> {
    try {
      const client = await this.getClient()
      const response = await client.get<{ data: SectionApiResponse }>(`section/${id}`)
      if (!response) return null
      return sectionToViewModel(response.data)
    } catch (error) {
      console.error(`[SectionRepository] Error al obtener sección ${id}:`, error)
      return null
    }
  }
}