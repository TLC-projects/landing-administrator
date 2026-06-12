import { CreateContentDto, PaginatedContentResponse, UpdateContentDto } from '@core/application/dto/content';
import {
  CreateContentUseCase,
  DeleteContentUseCase,
  GetContentByIdUseCase,
  GetContentCountBySectionUseCase,
  GetContentsBySectionUseCase,
  UpdateContentUseCase
} from '@core/application/use-cases/content';
import { Content, ContentFilters } from '@/src/core/domain/entities/content';
import { ContentRepository } from '@core/domain/interfaces/content-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';
export class ContentService {
  private getContentsBySectionUseCase: GetContentsBySectionUseCase;
  private getContentByIdUseCase: GetContentByIdUseCase;
  private getContentCountBySectionUseCase: GetContentCountBySectionUseCase;
  private createContentUseCase: CreateContentUseCase;
  private updateContentUseCase: UpdateContentUseCase;
  private deleteContentUseCase: DeleteContentUseCase;

  constructor(contentRepository: ContentRepository) {
    this.getContentsBySectionUseCase = new GetContentsBySectionUseCase(contentRepository);
    this.getContentByIdUseCase = new GetContentByIdUseCase(contentRepository);
    this.getContentCountBySectionUseCase = new GetContentCountBySectionUseCase(contentRepository);
    this.createContentUseCase = new CreateContentUseCase(contentRepository);
    this.updateContentUseCase = new UpdateContentUseCase(contentRepository);
    this.deleteContentUseCase = new DeleteContentUseCase(contentRepository);
  }

  async getContentsBySection(
    sectionId: string,
    params?: PaginationParams,
    filters?: ContentFilters
  ): Promise<PaginatedContentResponse> {
    return await this.getContentsBySectionUseCase.execute(sectionId, params, filters);
  }

  async getContentById(id: string): Promise<Content | null> {
    return this.getContentByIdUseCase.execute(id);
  }

  async getContentCountBySection(sectionId: string): Promise<number> {
    return await this.getContentCountBySectionUseCase.execute(sectionId);
  }

  async createContent(dto: CreateContentDto): Promise<void> {
    return await this.createContentUseCase.execute(dto);
  }

  async updateContent(id: string, data: UpdateContentDto): Promise<void> {
    await this.updateContentUseCase.execute(id, data);
  }

  async deleteContent(id: string): Promise<void> {
    return this.deleteContentUseCase.execute(id);
  }
}
