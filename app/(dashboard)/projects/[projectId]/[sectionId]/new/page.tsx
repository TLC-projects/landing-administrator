import { Shell, AppTitle } from "@/components/layouts";
import { ContentForm } from "@/components/modules/content-form";

export default async function NewContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
}) {
  const { projectId, sectionId } = await params;

  return (
    <Shell>
      <AppTitle
        title="Crear Nuevo Contenido"
        description={`Proyecto ${projectId} | Sección ${sectionId}`}
      />
      <div className="mt-6 ">
      <ContentForm 
        projectId={projectId} 
        sectionId={sectionId}
        mode="create"
      />
      </div>
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
    title: `Crear Contenido - Sección ${sectionId} | Content Admin`,
    description: "Crear un nuevo contenido",
  };
}
