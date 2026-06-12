import {
  ContentDto,
  CreateContentDto,
  PaginatedContentResponse,
  UpdateContentDto
} from '@core/application/dto/content';
import { ContentMapper } from '@core/application/dto/content/content-mapper';
import { Content, ContentFilters } from '@/src/core/domain/entities/content_';
import { ContentRepository } from '@core/domain/interfaces/content-repository';
import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { AppError, unwrap } from '@lib/errors';

export class ContentRepositoryImpl implements ContentRepository {
  private baseUrl: string;
  private httpClient: HttpRepository;

  constructor(httpClient: HttpRepository) {
    this.baseUrl = 'content';
    this.httpClient = httpClient;
  }

  /**
   * Retrieves a paginated list of content items for a specific section, with optional filters for search and blocked status.
   * @param sectionId  The ID of the section for which to retrieve content items.
   * @param params  The pagination parameters, including page number and items per page.
   * @param filters  Optional filters for searching content items by title and filtering by blocked state
   */
  async getAllContentBySectionId(
    sectionId: string,
    params: PaginationParams,
    filters?: ContentFilters
  ): Promise<PaginatedContentResponse> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString()
    });

    if (filters) {
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.blocked !== undefined) queryParams.append('blocked', String(filters.blocked));
    }

    const response = unwrap(
      await this.httpClient.get(`${this.baseUrl}/section/${sectionId}?${queryParams.toString()}`)
    );

    if (!response || !Array.isArray(response.data)) {
      return {
        data: [],
        total: 0,
        page: params.page,
        limit: params.limit
      };
    }

    // Map the response data to Content entities using the ContentMapper
    const content = response.data.map((item: ContentDto) => ContentMapper.toContent(item));

    return {
      data: content,
      total: response.total || response.data.length || 0,
      page: response.page || params.page,
      limit: response.limit || params.limit
    };
  }

  /**
   * Retrieves a content item by its ID.
   *
   * @param id The ID of the content item to retrieve.
   * @returns A promise that resolves to the content item if found, or null if not found or if an error occurs.
   * @throws AppError if the ID is invalid or if there is an error during the HTTP request.
   */
  async getContentById(id: string): Promise<Content | null> {
    const response = unwrap(await this.httpClient.get(`${this.baseUrl}/${id}`));
    if (!response || !response.data) return null;


    return ContentMapper.toContent(response.data as ContentDto);
  }

  /**
   * Retrieves the count of content items associated with a specific section ID.
   *
   * @param sectionId The ID of the section for which to count content items.
   * @returns A promise that resolves to the count of content items for the specified section ID, or 0 if no content items are found or if an error occurs.
   */
  async getCountBySectionId(sectionId: string): Promise<number> {
    if (!sectionId) throw new AppError('Section ID is required to get content count', 'MISSING_SECTION_ID');

    const response = unwrap(await this.httpClient.get(`${this.baseUrl}/section/${sectionId}`));
    if (!response || !Array.isArray(response.data)) return 0;

    return response.data.length;
  }

  /**
   * Creates a new content item with the provided data.
   * @param dto The data for the new content item, including title, description, duration, blocked status, section ID, objectives, performance, resource file, and brochure file.
   * @returns A promise that resolves when the creation is complete.
   * @throws AppError if there is an error during the HTTP request or if required fields are missing.
   */
  async createContent(dto: CreateContentDto): Promise<void> {
    const formData = new FormData();

    formData.append('title', dto.title);
    formData.append('description', dto.description);
    formData.append('duration', dto.duration);
    formData.append('blocked', String(dto.blocked));
    formData.append('section_id', String(dto.section_id));
    formData.append('objectives', dto.objectives ?? '');
    formData.append('performance', dto.performance ?? '');

    if (dto.resource) formData.append('resources', dto.resource);
    if (dto.brochure) formData.append('brochure', dto.brochure);

    unwrap(await this.httpClient.post(this.baseUrl, formData));
  }

  /**
   * Updates an existing content item with the provided ID and data.
   * @param id The ID of the content item to update.
   * @param dto The data to update the content item with, including optional title, description, duration, blocked status, objectives, performance, resource file, and brochure file.
   */
  async updateContent(id: string, dto: UpdateContentDto): Promise<void> {
    const formData = new FormData();

    if (dto?.title) formData.append('title', dto.title);
    if (dto?.description) formData.append('description', dto.description);
    if (dto?.duration) formData.append('duration', dto.duration);
    if (dto?.blocked !== undefined) formData.append('blocked', String(dto.blocked));
    if (dto?.objectives) formData.append('objectives', dto.objectives);
    if (dto?.performance) formData.append('performance', dto.performance);
    if (dto?.brochureUrl) formData.append('brochure_url', dto.brochureUrl); // Agregar URL del brochure existente para mantener si no se sube uno nuevo

    // Only add resource if it's a valid File object and has content
    if (dto.resource !== undefined && dto.resource instanceof File && dto.resource.size > 0) {
      formData.append('resources', dto.resource);
    }
    // Only add brochure if it's a valid File object and has content
    if (dto.brochure !== undefined && dto.brochure instanceof File && dto.brochure.size > 0) {
      formData.append('brochure', dto.brochure);
    }

    unwrap(await this.httpClient.put(`${this.baseUrl}/${id}`, formData));
  }

  /**
   * Deletes a content item by its ID.
   * @param id The ID of the content item to delete.
   * @returns A promise that resolves when the deletion is complete.
   * @throws AppError if the ID is invalid or if there is an error during the HTTP request.
   */
  async deleteContent(id: string): Promise<void> {
    if (!id) throw new AppError('Content ID is required to delete content', 'MISSING_CONTENT_ID');
    unwrap(await this.httpClient.delete(`${this.baseUrl}/${id}`));
  }
}
