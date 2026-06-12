import { PaginationParams } from '@core/domain/value-objects/pagination';
import { getContentService } from '@core/infrastructure/config/content-dependency';

import { AppTitle, Shell } from '@/src/components/layouts';
import { ContentTable } from '@/src/components/modules/content';
import { ContentFilters } from '@/src/core/domain/entities/content';

export async function generateMetadata({ params }: { params: Promise<{ projectId: string; sectionId: string }> }) {
  const { sectionId } = await params;
  return {
    title: `Contenidos - Sección ${sectionId} | Content Administrator`,
    description: `Lista de contenidos de la sección ${sectionId}`
  };
}

interface ContentsListPageProps {
  params: Promise<{ projectId: string; sectionId: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    blocked?: string;
  }>;
}

export default async function ContentsListPage({ params, searchParams }: ContentsListPageProps) {
  const sectionId = (await params).sectionId;

  const query = await searchParams;

  // Parse pagination parameters from searchParams
  const pagination = PaginationParams.forContents(
    query?.page ? parseInt(query.page) : undefined,
    query?.limit ? parseInt(query.limit) : undefined
  );

  const contentService = await getContentService();

  // Prepare filters based on searchParams
  const filters: ContentFilters = {};
  if (query?.search) filters.search = query.search;
  if (query?.blocked) filters.blocked = query.blocked === 'true' ? true : query.blocked === 'false' ? false : undefined;

  const content = await contentService.getContentsBySection(sectionId, pagination, filters);

  const hasActiveFilters = !!(query.search || query.blocked);

  return (
    <Shell>
      <AppTitle title={`Sección ${sectionId}`} description="Lista de contenidos, puedes administrar tus contenidos." />
      <ContentTable
        content={content.data}
        sectionId={sectionId}
        hasActiveFilters={hasActiveFilters}
        pageInfo={{
          total: content.total,
          page: content.page,
          limit: content.limit
        }}
      />
    </Shell>
  );
}
