import { PaginationParams } from "@core/domain/value-objects/pagination";
import { Project } from "@core/domain/entities/Project";
import { ProjectRepository } from "@core/domain/interfaces/project-repository";

export class GetAllProjectsUseCase {
    constructor(private projectRepository: ProjectRepository) { }

    async execute(param: PaginationParams, search?: string): Promise<Project[] | []> {
        try {
            return await this.projectRepository.getAllProjects(param, search);
        } catch (error) {
            console.log('Error to get current user', error);
            return [];
        }
    }
}