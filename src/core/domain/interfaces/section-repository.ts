import { PaginatedSectionResponse } from "@core/application/dto/section";
import { Section } from "@core/domain/entities/section";
import { PaginationParams } from "@core/domain/value-objects/pagination";


export interface SectionRepository {
    getAllSections(params: PaginationParams, search?: string): Promise<PaginatedSectionResponse>
    getSectionById(id: string): Promise<Section | null>
}