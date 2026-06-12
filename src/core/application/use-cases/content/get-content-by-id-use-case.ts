import { Content } from '@/src/core/domain/entities/content';
import { ContentRepository } from '@core/domain/interfaces/content-repository';

import { AppError } from '@/src/lib/errors';

/**
 * Get Content By ID (Use Case)
 * This use case is responsible for retrieving a content entry by its ID. 
 * It validates the input data and interacts with the ContentRepository to fetch the specified content.
 */
export class GetContentByIdUseCase {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(id: string): Promise<Content | null> {
    if (!id) throw new AppError('Content ID is required', 'MISSING_PARAMS');
    return await this.contentRepository.getContentById(id);
  }
}
