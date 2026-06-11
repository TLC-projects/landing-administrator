import { UpdateContentDto } from '@core/application/dto/content';
import { ContentRepository } from '@core/domain/interfaces/content-repository';

import { AppError } from '@/src/lib/errors';

/**
 * Update Content (Use Case)
 * This use case is responsible for updating an existing content entry. 
 * It validates the input data and interacts with the ContentRepository to perform the update operation based on the provided content ID and update data.
 */
export class UpdateContentUseCase {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(id: string, dto: UpdateContentDto): Promise<void> {
    if (!id || !dto) throw new AppError('Content ID and update data are required', 'MISSING_PARAMS');
    await this.contentRepository.updateContent(id, dto);
  }
}
