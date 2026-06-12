import { Content } from '@/src/core/domain/entities/content';

import { ContentDto, ContentResourcesDto } from './content-response-dto';

export class ContentMapper {
  static toContent(dto: ContentDto): Content {
    return {
      id: dto.id.toString(),
      sectionId: dto.section_id.toString(),
      title: dto.title,
      description: dto.description,
      duration: dto.duration,
      blocked: dto.blocked === 1, // Convert 0/1 to boolean
      resources: dto.resources
        ? dto.resources.map((resource: ContentResourcesDto) => ({
            id: resource.id.toString(),
            url: resource.url,
            contentId: resource.content_id.toString()
          }))
        : [],
      objectives: dto.objectives,
      performance: dto.performance,
      brochureUrl: dto.brochure_url
    };
  }

  static toContents(dtos: ContentDto[]): Content[] {
    return dtos.map((dto) => this.toContent(dto));
  }
}
