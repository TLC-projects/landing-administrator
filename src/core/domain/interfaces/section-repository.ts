import { Section } from "@core/domain/entities/Section";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";


export interface SectionRepository {
    getSectionsByProjectId(projectId: string, params: PaginationParams, search?: string): Promise<PaginatedSectionResponse>
    getSectionById(id: string): Promise<Section | null>
}