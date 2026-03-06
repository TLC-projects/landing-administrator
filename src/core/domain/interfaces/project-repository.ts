import { Project } from "@core/domain/entities/Project";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { PaginatedProjectResponse } from "@core/application/dto/project-dto";

export interface ProjectRepository {
    getAllProjects( params: PaginationParams, search?: string ): Promise<PaginatedProjectResponse>
    getProjectById( id: string ): Promise<Project | null>
}