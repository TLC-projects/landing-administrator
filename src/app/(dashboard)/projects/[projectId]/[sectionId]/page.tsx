import { Shell, AppTitle } from "@/src/components/layouts";
import { ContentTable } from "@/src/components/modules/content";
import { getContentService } from "@core/infrastructure/config/content-dependency";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export default async function ContentsListPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    blocked?: string;
  }>;
}) {
  const { projectId, sectionId } = await params;
  const paramsSearch = await searchParams;

  const pagination = PaginationParams.forContents(
    paramsSearch?.page ? parseInt(paramsSearch.page) : undefined,
    paramsSearch?.limit ? parseInt(paramsSearch.limit) : undefined,
  );

  const contentService = await getContentService();
  const result = await contentService.getContentsBySection(
    Number(sectionId),
    pagination,
    paramsSearch.search,
  );

  const hasActiveFilters = !!(paramsSearch.search || paramsSearch.blocked);

  return (
    <Shell>
      <AppTitle
        title={`Sección ${sectionId}`}
        description="Lista de contenidos, puedes administrar tus contenidos."
      />
      <ContentTable
        content={result.data}
        projectId={projectId}
        sectionId={sectionId}
        hasActiveFilters={hasActiveFilters}
        pageInfo={{ page: result.page, limit: result.limit, total: result.total }}
      />
    </Shell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
}) {
  const { sectionId } = await params;
  return {
    title: `Contenidos - Sección ${sectionId} | Content Admin`,
    description: `Lista de contenidos de la sección ${sectionId}`,
  };
}
