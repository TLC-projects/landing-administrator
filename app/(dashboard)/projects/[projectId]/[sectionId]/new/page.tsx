import { Shell, AppTitle } from "@/components/layouts";

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
        breadcrumb={[
          { label: "Proyectos", href: "/" },
          { label: `Proyecto ${projectId}`, href: `/projects/${projectId}` },
          {
            label: `Sección ${sectionId}`,
            href: `/projects/${projectId}/${sectionId}`,
          },
          { label: "Nuevo" },
        ]}
      />
      {/* Aquí va tu formulario de creación */}
      <div className="mt-6">
        <p>Formulario para crear contenido...</p>
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
