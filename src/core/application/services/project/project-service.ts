import { ProjectRepository } from "@core/domain/interfaces/project-repository";
import { GetAllProjectsUseCase } from "@core/application/use-cases/project/get-all-projects-use-case";
import { Project } from "@core/domain/entities/Project";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export class ProjectService {
    private getAllProjectsUseCase: GetAllProjectsUseCase;

    constructor(projectRepository: ProjectRepository) {
        this.getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
    }

    async getAllProjects(param?: PaginationParams, search?: string): Promise<Project[] | []> {
        return await this.getAllProjectsUseCase.execute(param, search);
    }
}