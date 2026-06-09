import { ContentRepository } from '@core/domain/interfaces/content-repository';

import { AppError } from '@/src/lib/errors';

/**
 * Get Content Count By Section (Use Case)
 * This use case is responsible for retrieving the count of content entries associated with a specific section. 
 * It validates the input data and interacts with the ContentRepository to fetch the count.
 */
export class GetContentCountBySectionUseCase {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(sectionId: string): Promise<number> {
    if (!sectionId) throw new AppError('Section ID is required', 'MISSING_PARAMS');
    return await this.contentRepository.getCountBySectionId(sectionId);
  }
}
