import { ProjectRepository } from "@core/domain/interfaces/project-repository";
import { GetAllProjectsUseCase } from "@core/application/use-cases/project/get-all-projects-use-case";
import { Project } from "@core/domain/entities/Project";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { GetProjectByIdUseCase } from "@core/application/use-cases/project/get-project-by-id-use-case";
import { PaginatedProjectResponse } from "@core/application/dto/project-dto";

export class ProjectService {
    private getAllProjectsUseCase: GetAllProjectsUseCase;
    private getProjectByIdUseCase: GetProjectByIdUseCase;

    constructor(projectRepository: ProjectRepository) {
        this.getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
        this.getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository);
    }

    async getAllProjects(params: PaginationParams, search?: string): Promise<PaginatedProjectResponse> {
        return await this.getAllProjectsUseCase.execute(params, search);
    }

    async getProjectById(id: string): Promise<Project | null> {
        return await this.getProjectByIdUseCase.execute(id);
    }
}