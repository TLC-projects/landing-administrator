import { Shell, AppTitle } from "@/src/components/layouts";
import { ContentForm } from "@/src/components/modules/content-form/content-form";
import { getContent } from "@/src/components/modules/content-form/actions/create-content";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { projectId, sectionId, contentId } = await params;

   const content = await getContent(contentId);

  return (
    <Shell>
      <AppTitle
        title="Editar Contenido"
        description={`Proyecto ${projectId} | Sección ${sectionId} | Contenido ${contentId}`}
      />
      {/* Aquí va tu formulario de edición */}
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
    title: `Editar Contenido ${contentId} | Content Admin`,
    description: `Editar el contenido ${contentId}`,
  };
}
