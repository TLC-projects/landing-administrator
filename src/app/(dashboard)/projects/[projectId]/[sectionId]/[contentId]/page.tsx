import { Shell, AppTitle } from "@/src/components/layouts";
import { ContentForm } from "@/src/components/modules/content-form/content-form";
import { getContentService } from "@core/infrastructure/config/content-dependency";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { projectId, sectionId, contentId } = await params;

  const contentService = await getContentService();
  const result = await contentService.getContentById(Number(contentId));

  const content = result ? {
    id: result.id,
    title: result.title,
    duration: result.duration,
    description: result.description,
    imageUrl: result.url,
    isVisible: !result.blocked,
    projectId,
    sectionId,
  } : null;

  return (
    <Shell>
      <AppTitle
        title={`Contenido ${contentId}`}
        description={`Proyecto ${projectId} | Sección ${sectionId}`}
      />
      <div className="space-y-2">
        <ContentForm projectId={projectId} sectionId={sectionId} mode="view" content={content} />
      </div>
    </Shell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { sectionId, contentId } = await params;
  return {
    title: `Contenido ${contentId} - Sección ${sectionId} | Content Admin`,
    description: `Ver detalles del contenido ${contentId}`,
  };
}
