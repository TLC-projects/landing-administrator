import { SectionViewModel, SectionApiResponse } from "@core/application/dto/section-dto"

export interface ISectionRepository {
  getAllRaw(projectId: number): Promise<SectionApiResponse[] | null>
  getAll(projectId: number): Promise<SectionViewModel[] | null>
  getById(id: number): Promise<SectionViewModel | null>
  /* create(data: CreateSectionDto): Promise<SectionViewModel | null>
  update(id: number, data: UpdateSectionDto): Promise<SectionViewModel | null>
  delete(id: number): Promise<boolean> */
}
