import {
  PaginatedSectionResponse,
  SectionDto,
  SectionMapper,
  SectionServerResponseDto
} from '@core/application/dto/section';
import { Section, SectionFilters } from '@/src/core/domain/entities/section';
import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { SectionRepository } from '@core/domain/interfaces/section-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { AppError, unwrap } from '@lib/errors';

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
    if (!id) throw new AppError('Section ID is required', 'INVALID_ID');

    const response = unwrap(await this.httpClient.get(`${this.baseUrl}/${id}`));
    if (!response || !response.data) return null;

    return SectionMapper.toSection(response.data as SectionDto);
  }

  /**
   * Gets a paginated list of sections based on the provided pagination parameters and optional search filter.
   * @param params The pagination parameters to use for the request.
   * @param filters The search filter to use for the request.
   * @returns A promise that resolves with a paginated response containing the sections.
   */
  async getAllSections(params: PaginationParams, filters?: SectionFilters): Promise<PaginatedSectionResponse> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString()
    });

    if (filters) {
      if (filters.search) queryParams.append('search', filters.search);
    }

    const response = unwrap(await this.httpClient.get(`${this.baseUrl}?${queryParams.toString()}`));

    if (!response || !Array.isArray(response.data)) {
      return {
        data: [],
        total: 0,
        page: params.page,
        limit: params.limit
      };
    }

    // Map the response data to Section entities using the SectionMapper
    const sections = response.data.map((section) => SectionMapper.toSection(section));

    return {
      data: sections,
      total: response.total || 0,
      page: response.page || params.page,
      limit: response.limit || params.limit
    };
  }
}
