import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { GetSectionByIdUseCase } from "@core/application/use-cases/section/get-section-by-id-use-case";
import { GetSectionsByProjectIdUseCase } from "@core/application/use-cases/section/get-sections-by-project-id-use-case";
import { Section } from "@core/domain/entities/Section";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";

export class SectionService {
    private getSectionByIdUseCase: GetSectionByIdUseCase;
    private getSectionByProjectUseCase: GetSectionsByProjectIdUseCase;

    constructor(sectionRepository: SectionRepository) {
        this.getSectionByIdUseCase = new GetSectionByIdUseCase(sectionRepository);
        this.getSectionByProjectUseCase = new GetSectionsByProjectIdUseCase(sectionRepository);
    }

    async getSectionById(id: string): Promise<Section | null> {
        return await this.getSectionByIdUseCase.execute(id);
    }

    async getSectionsByProjectId(projectId: string, params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        return await this.getSectionByProjectUseCase.execute(projectId, params, search);
    }
}