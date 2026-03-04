import { ProjectRepository } from "@core/domain/interfaces/project-repository";
import { HttpRepository } from "@core/domain/interfaces/http-repository";
import { Project } from "@core/domain/entities/Project";
import { ProjectServerResponseDto } from "@core/application/dto/project-dto";
import { ProjectMapper } from "@core/application/dto/project-mapper";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export class ProjectRepositoryImpl implements ProjectRepository {
    private baseUrl: string;
    private httpClient: HttpRepository<ProjectServerResponseDto>;

    constructor(httpClient: HttpRepository<ProjectServerResponseDto>) {
        this.baseUrl = 'project';
        this.httpClient = httpClient;
    }

    async getAllProjects(params: PaginationParams, search?: string): Promise<Project[] | []> {
        try {
            const queryParams = new URLSearchParams({
                page: params.page.toString(),
                limit: params.limit.toString()
            });

            if (search) {
                queryParams.set('search', search);
            }

            const response = await this.httpClient.get(`${this.baseUrl}?${queryParams.toString()}`);

            if (!response || !Array.isArray(response.data)) {
                return [];
            }

            if (response.data.length === 0) return [];

            return ProjectMapper.toEntities(response.data);

        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}:`, error);
            return [];
        }
    }
}