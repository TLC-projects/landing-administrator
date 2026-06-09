import { PaginatedSectionResponse } from '@core/application/dto/section';
import { SectionFilters } from '@core/domain/entities/section';
import { ContentRepository } from '@core/domain/interfaces/content-repository';
import { SectionRepository } from '@core/domain/interfaces/section-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { AppError } from '@lib/errors';

export class GetSectionsWithContentCountUseCase {
  constructor(
    private readonly sectionRepository: SectionRepository,
    private readonly contentRepository: ContentRepository
  ) {}

  async execute(params: PaginationParams, filters?: SectionFilters): Promise<PaginatedSectionResponse> {
    if (params.page < 1 || params.limit < 1) {
      throw new AppError('Page and limit must be greater than 0', 'INVALID_PAGINATION_PARAMS');
    }

    const paginatedSections = await this.sectionRepository.getAllSections(params, filters);

    // If there are no sections, return the paginated response with an empty data array
    if (!paginatedSections.data.length) return paginatedSections;

    const sectionsWithCount = await Promise.all(
      paginatedSections.data.map(async (section) => ({
        ...section,
        content_number: await this.contentRepository.getCountBySectionId(section.id)
      }))
    );

    return {
      ...paginatedSections,
      data: sectionsWithCount
    };
  }
}
