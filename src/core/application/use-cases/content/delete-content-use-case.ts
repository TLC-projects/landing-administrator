import { ContentRepository } from '@core/domain/interfaces/content-repository';

import { AppError } from '@/src/lib/errors';

/**
 * Delete Content (Use Case)
 * This use case is responsible for deleting a content entry from the system.
 * It validates the input data and interacts with the ContentRepository to remove the specified content.
 */
export class DeleteContentUseCase {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new AppError('Content ID is required', 'MISSING_PARAMS');
    return this.contentRepository.deleteContent(id);
  }
}
