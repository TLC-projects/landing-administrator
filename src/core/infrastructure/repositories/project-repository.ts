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

    /**
     * Gets all projects from the server.
     * @param params - The pagination parameters to use for the request.
     * @param search - The search query to use for the request.
     * @returns A promise that resolves to an array of projects or an empty array if there was an error.
     */
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

    /**
     * Gets a project by its ID.
     * @param {string} id - The ID of the project to get.
     * @returns {Promise<Project | null>} - A promise that resolves with the project or null if the project does not exist.
     */
    async getProjectById(id: string): Promise<Project | null> {
        try {
            if (!id) return null;

            const response = await this.httpClient.get(`${this.baseUrl}/${id}`);

            if (!response?.data || Array.isArray(response.data)) {
                return null;
            }

            return ProjectMapper.toEntity(response.data);

        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}:`, error);
            return null;
        }
    }
}