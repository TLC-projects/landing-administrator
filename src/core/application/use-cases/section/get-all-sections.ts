import { PaginationParams } from "@/src/core/domain/value-objects/pagination";
import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";

export class GetAllSectionsUseCase {
    constructor(private sectionRepository: SectionRepository) { }

    async execute(params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        try {
            if (params.page < 1 || params.limit < 1) {
                throw new Error('Los parámetros de paginación deben ser mayores a 0');
            }

            const paginatedResources = await this.sectionRepository.getAllSections(params, search);
            return paginatedResources;
        } catch (error) {
            console.log('Error to get sections paginated', error);
            throw error instanceof Error ? error : new Error('Error to get sections paginated');
        }
    }
}