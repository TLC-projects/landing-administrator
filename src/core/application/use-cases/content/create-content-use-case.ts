import { CreateContentDto } from '@core/application/dto/content';
import { ContentRepository } from '@core/domain/interfaces/content-repository';

import { AppError } from '@/src/lib/errors';

/**
 * Create Content (Use Case)
 * This use case is responsible for creating a new content entry in the system. 
 * It validates the input data and interacts with the ContentRepository to persist the new content.
 */
export class CreateContentUseCase {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(content: CreateContentDto): Promise<void> {
    if (!content) throw new AppError('Content data is required', 'MISSING_PARAMS');
    await this.contentRepository.createContent(content);
  }
}
