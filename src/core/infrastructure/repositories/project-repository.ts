import { ProjectRepository } from "@core/domain/interfaces/project-repository";
import { HttpRepository } from "@core/domain/interfaces/http-repository";
import { Project } from "@core/domain/entities/Project";
import { PaginatedProjectResponse, ProjectServerResponseDto } from "@core/application/dto/project-dto";
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
    async getAllProjects(params: PaginationParams, search?: string): Promise<PaginatedProjectResponse> {
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
                return {
                    data: [],
                    total: 0,
                    page: params.page,
                    limit: params.limit
                };
            }

            return {
                data: response.data,
                total: response.total || 0,
                page: response.page || params.page,
                limit: response.limit || params.limit
            };

        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}:`, error);
            throw new Error('Error fetching projects paginated');
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

            return response.data;

        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}:`, error);
            return null;
        }
    }
}