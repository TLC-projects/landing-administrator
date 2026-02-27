import { Shell, AppTitle } from "@/components/layouts";
import { ContentForm } from "@/components/modules/content-form/content-form";
import { getContent } from "@/components/modules/content-form/create-content";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { projectId, sectionId, contentId } = await params;

  const content = await getContent(contentId);

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
