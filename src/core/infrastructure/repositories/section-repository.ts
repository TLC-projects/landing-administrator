import { SectionRepository } from "@core/domain/interfaces/section-repository";
import { PaginatedSectionResponse, SectionServerResponseDto } from "@core/application/dto/section-dto";
import { HttpRepository } from "@core/domain/interfaces/http-repository";
import { Section } from "@core/domain/entities/Section";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export class SectionRepositoryImpl implements SectionRepository {
    private baseUrl: string;
    private httpClient: HttpRepository<SectionServerResponseDto>;

    constructor(httpClient: HttpRepository<SectionServerResponseDto>) {
        this.baseUrl = 'section';
        this.httpClient = httpClient;
    }

    /**
     * Gets a section by its ID.
     * @param {string} id - The ID of the section to get.
     * @returns {Promise<Section | null>} - A promise that resolves with the section or null if the section does not exist.
     * @throws {Error} - If there is an error in the GET request.
     */
    async getSectionById(id: string): Promise<Section | null> {
        try {
            if (!id) return null;

            const response = await this.httpClient.get(`${this.baseUrl}/${id}`);

            if (!response?.data || Array.isArray(response.data)) return null;

            return response.data;
        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}:`, error);
            throw error instanceof Error ? error : new Error('Error in GET');
        }
    }

    /**
     * Fetches sections paginated by project id.
     * @param projectId The id of the project to fetch sections from.
     * @param params The pagination parameters to use for the request.
     * @param search The search query to use for the request.
     * @returns A promise that resolves to a paginated section response.
     * @throws Error If the request fails or if the project id is not provided.
     */
    async getSectionsByProjectId(projectId: string, params: PaginationParams, search?: string): Promise<PaginatedSectionResponse> {
        try {
            if (!projectId) throw new Error('El id del proyecto es requerido');

            const queryParams = new URLSearchParams({
                page: params.page.toString(),
                limit: params.limit.toString()
            });

            if (search) {
                queryParams.set('search', search);
            }

            const response = await this.httpClient.get(`${this.baseUrl}/project/${projectId}?${queryParams.toString()}`);

            if (!response || !Array.isArray(response.data)) {
                return {
                    data: [],
                    total: 0,
                    page: params.page,
                    limit: params.limit
                };
            };

            return {
                data: response.data,
                total: response.total || 0,
                page: response.page || params.page,
                limit: response.limit || params.limit
            };

        } catch (error) {
            console.error('Error fetching sections paginated:', error);
            throw new Error('Error fetching sections paginated');
        }
    }
}