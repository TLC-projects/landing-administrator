import { Shell, AppTitle } from "@/src/components/layouts";
import { ContentTable } from "@/src/components/modules/content";
import { getContentService } from "@core/infrastructure/config/content-dependency";

export default async function ContentsListPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
}) {
  const { projectId, sectionId } = await params;

  const contentService = await getContentService();
  const contents = await contentService.getContentsBySection(Number(sectionId));
  
  return (
    <Shell>
      <AppTitle
        title={`Sección ${sectionId}`}
        description="Lista de contenidos, puedes administrar tus contenidos."
      />
      <ContentTable
        content={contents}
        projectId={projectId}
        hasActiveFilters={false}
        pageInfo={{ page: 1, limit: 10, total: contents.length }}
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
