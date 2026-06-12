import { Section } from '@/src/core/domain/entities/section';

import { SectionDto } from './section-response-dto';

export class SectionMapper {
  static toSections(sectionDtos: SectionDto[]): Section[] {
    return sectionDtos.map(this.toSection);
  }

  static toSection(sectionDto: SectionDto): Section {
    return {
      id: sectionDto.id,
      name: sectionDto.name
    };
  }
}
