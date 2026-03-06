import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { IContentRepository } from "@core/domain/interfaces/content-repository";
import { GetSectionByIdUseCase } from "@core/application/use-cases/section/get-section-by-id-use-case";
import { GetSectionsByProjectIdUseCase } from "@core/application/use-cases/section/get-sections-by-project-id-use-case";
import { GetSectionsWithContentCountUseCase } from "@core/application/use-cases/section/get-sections-with-content-count-use-case";
import { Section } from "@core/domain/entities/Section";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";

export class SectionService {
    private getSectionByIdUseCase: GetSectionByIdUseCase;
    private getSectionByProjectUseCase: GetSectionsByProjectIdUseCase;
    private getSectionsWithContentCountUseCase: GetSectionsWithContentCountUseCase;

    constructor(sectionRepository: SectionRepository, contentRepository: IContentRepository) {
        this.getSectionByIdUseCase = new GetSectionByIdUseCase(sectionRepository);
        this.getSectionByProjectUseCase = new GetSectionsByProjectIdUseCase(sectionRepository);
        this.getSectionsWithContentCountUseCase = new GetSectionsWithContentCountUseCase(sectionRepository, contentRepository);
    }

    async getSectionById(id: string): Promise<Section | null> {
        return await this.getSectionByIdUseCase.execute(id);
    }

    async getSectionsByProjectId(projectId: string, params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        return await this.getSectionByProjectUseCase.execute(projectId, params, search);
    }

    async getSectionsWithContentCount(projectId: string, params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        return await this.getSectionsWithContentCountUseCase.execute(projectId, params, search);
    }
}