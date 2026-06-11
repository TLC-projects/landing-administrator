import { PaginatedContentResponse } from '@core/application/dto/content';
import { ContentFilters } from '@core/domain/entities/content';
import { ContentRepository } from '@core/domain/interfaces/content-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';

import { AppError } from '@/src/lib/errors';

/**
 * Get Contents By Section (Use Case)
 * This use case is responsible for retrieving a paginated list of content entries for a specific section.
 * It validates the input data and interacts with the ContentRepository to fetch the contents based on the provided section ID, pagination parameters, and filters.
 */
export class GetContentsBySectionUseCase {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(
    sectionId: string,
    params?: PaginationParams,
    filters?: ContentFilters
  ): Promise<PaginatedContentResponse> {
    if (!sectionId) throw new AppError('Section ID is required', 'MISSING_PARAMS');
    return await this.contentRepository.getAllContentBySectionId(sectionId, params, filters);
  }
}
