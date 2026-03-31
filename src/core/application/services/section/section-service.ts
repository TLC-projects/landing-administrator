import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { IContentRepository } from "@core/domain/interfaces/content-repository";
import { GetSectionByIdUseCase } from "@core/application/use-cases/section/get-section-by-id-use-case";
import { GetAllSectionsUseCase } from "@/src/core/application/use-cases/section/get-all-sections";
import { GetSectionsWithContentCountUseCase } from "@core/application/use-cases/section/get-sections-with-content-count-use-case";
import { Section } from "@core/domain/entities/Section";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";

export class SectionService {
    private getSectionByIdUseCase: GetSectionByIdUseCase;
    private getAllSectionsUseCase: GetAllSectionsUseCase;
    private getSectionsWithContentCountUseCase: GetSectionsWithContentCountUseCase;

    constructor(sectionRepository: SectionRepository, contentRepository: IContentRepository) {
        this.getSectionByIdUseCase = new GetSectionByIdUseCase(sectionRepository);
        this.getAllSectionsUseCase = new GetAllSectionsUseCase(sectionRepository);
        this.getSectionsWithContentCountUseCase = new GetSectionsWithContentCountUseCase(sectionRepository, contentRepository);
    }

    async getSectionById(id: string): Promise<Section | null> {
        return await this.getSectionByIdUseCase.execute(id);
    }

    async getSectionsByProjectId(params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        return await this.getAllSectionsUseCase.execute(params, search);
    }

    async getSectionsWithContentCount(params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        return await this.getSectionsWithContentCountUseCase.execute(params, search);
    }
}