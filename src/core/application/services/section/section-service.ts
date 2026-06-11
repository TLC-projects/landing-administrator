import { PaginatedSectionResponse } from '@core/application/dto/section';
import {
  GetAllSectionsUseCase,
  GetSectionByIdUseCase,
  GetSectionsWithContentCountUseCase
} from '@core/application/use-cases/section';
import { Section, SectionFilters } from '@core/domain/entities/section';
import { ContentRepository } from '@core/domain/interfaces/content-repository';
import { SectionRepository } from '@core/domain/interfaces/section-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';

export class SectionService {
  private getSectionByIdUseCase: GetSectionByIdUseCase;
  private getAllSectionsUseCase: GetAllSectionsUseCase;
  private getSectionsWithContentCountUseCase: GetSectionsWithContentCountUseCase;

  constructor(sectionRepository: SectionRepository, contentRepository: ContentRepository) {
    this.getSectionByIdUseCase = new GetSectionByIdUseCase(sectionRepository);
    this.getAllSectionsUseCase = new GetAllSectionsUseCase(sectionRepository);
    this.getSectionsWithContentCountUseCase = new GetSectionsWithContentCountUseCase(
      sectionRepository,
      contentRepository
    );
  }

  async getSectionById(id: string): Promise<Section | null> {
    return await this.getSectionByIdUseCase.execute(id);
  }

  async getSectionsByProjectId(params: PaginationParams, filters?: SectionFilters): Promise<PaginatedSectionResponse> {
    return await this.getAllSectionsUseCase.execute(params, filters);
  }

  async getSectionsWithContentCount(
    params: PaginationParams,
    filters?: SectionFilters
  ): Promise<PaginatedSectionResponse> {
    return await this.getSectionsWithContentCountUseCase.execute(params, filters);
  }
}
