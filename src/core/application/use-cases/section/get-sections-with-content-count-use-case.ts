import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { IContentRepository } from "@core/domain/interfaces/content-repository";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";

export class GetSectionsWithContentCountUseCase {
    constructor(
        private readonly sectionRepository: SectionRepository,
        private readonly contentRepository: IContentRepository
    ) {}

    async execute(params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        if (params.page < 1 || params.limit < 1) {
            throw new Error('Los parámetros de paginación deben ser mayores a 0');
        }

        const paginatedSections = await this.sectionRepository.getAllSections(params, search);

        const sectionsWithCount = await Promise.all(
            paginatedSections.data.map(async (section) => ({
                ...section,
                content_number: await this.contentRepository.getCountBySectionId(Number(section.id)),
            }))
        );

        return {
            ...paginatedSections,
            data: sectionsWithCount,
        };
    }
}
