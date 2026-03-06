import { Shell, AppTitle } from "@/src/components/layouts";
import { ContentForm } from "@/src/components/modules/content-form/content-form";
import { getContentService } from "@core/infrastructure/config/content-dependency";

export default async function EditContentPage({
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
        title="Editar Contenido"
        description="Modifica los campos necesarios para actualizar el contenido."
      />
      
      <div className="mt-6">
        <ContentForm projectId={projectId} sectionId={sectionId} mode="edit" content={content} />
      </div>
    </Shell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { contentId } = await params;
  return {
    title: `Editar Contenido ${contentId} | Content Administrator`,
    description: `Editar el contenido ${contentId}`,
  };
}
