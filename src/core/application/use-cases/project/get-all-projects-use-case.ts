import { PaginationParams } from "@core/domain/value-objects/pagination";
import { Project } from "@core/domain/entities/Project";
import { ProjectRepository } from "@core/domain/interfaces/project-repository";
import { PaginatedProjectResponse } from "@core/application/dto/project-dto";

export class GetAllProjectsUseCase {
    constructor(private projectRepository: ProjectRepository) { }

    async execute(params: PaginationParams, search?: string): Promise<PaginatedProjectResponse> {
        try {
            if (params.page < 1 || params.limit < 1) {
                throw new Error('Los parámetros de paginación deben ser mayores a 0');
            }
            return await this.projectRepository.getAllProjects(params, search);
        } catch (error) {
            console.log('Error to get projects paginated', error);
            throw error instanceof Error ? error : new Error('Error to get projects paginated by project id');
        }
    }
}