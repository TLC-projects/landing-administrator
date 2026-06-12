import { Section } from '@/src/core/domain/entities/section_';
import { SectionRepository } from '@core/domain/interfaces/section-repository';
import { AppError } from '@lib/errors';

/**
 * Get Section By ID (Use Case)
 * This use case is responsible for retrieving a section by its ID.
 * It validates the input data and interacts with the SectionRepository to fetch the section.
 */
export class GetSectionByIdUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(id: string): Promise<Section | null> {
    if (!id) throw new AppError('Section ID is required', 'MISSING_PARAMS');
    return await this.sectionRepository.getSectionById(id);
  }
}
