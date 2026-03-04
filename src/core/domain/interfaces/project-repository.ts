import { Project } from "@core/domain/entities/Project";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export interface ProjectRepository {
    getAllProjects( params: PaginationParams, search?: string ): Promise<Project[] | []>
}