import { PaginationParams } from "@/src/core/domain/value-objects/pagination";
import { Section } from "@core/domain/entities/Section";
import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { PaginatedSectionResponse } from "@core/application/dto/section-dto";

export class GetSectionsByProjectIdUseCase {
    constructor(private sectionRepository: SectionRepository) { }

    async execute(projectId: string, params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        try {
            if (!projectId){
                throw new Error('El id del proyecto es requerido');
            };
            
            if (params.page < 1 || params.limit < 1) {
                throw new Error('Los parámetros de paginación deben ser mayores a 0');
            }

            const paginatedResources = await this.sectionRepository.getSectionsByProjectId(projectId, params, search);
            return paginatedResources;
        } catch (error) {
            console.log('Error to get sections paginated by project id', error);
            throw error instanceof Error ? error : new Error('Error to get sections paginated by project id');
        }
    }
}