import { PaginatedSectionResponse } from '@core/application/dto/section';
import { SectionFilters } from '@/src/core/domain/entities/section';
import { SectionRepository } from '@core/domain/interfaces/section-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { AppError } from '@lib/errors';

/**
 * GetAllSectionsUseCase (Use Case)
 * This use case is responsible for retrieving a paginated list of sections based on the provided pagination parameters and optional filters.
 * It validates the input parameters and interacts with the SectionRepository to fetch the data.
 */
export class GetAllSectionsUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(params: PaginationParams, filters?: SectionFilters): Promise<PaginatedSectionResponse> {
    if (params.page < 1 || params.limit < 1) {
      throw new AppError('Page and limit must be greater than 0', 'INVALID_PAGINATION_PARAMS');
    }

    return await this.sectionRepository.getAllSections(params, filters);
  }
}
