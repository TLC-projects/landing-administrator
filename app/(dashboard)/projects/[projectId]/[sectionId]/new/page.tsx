import { Breadcrumb } from "@/components/ui";

export default async function NewContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
}) {
  const { projectId, sectionId } = await params;

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Proyectos", href: "/" },
          { label: `Proyecto ${projectId}`, href: `/projects/${projectId}` },
          {
            label: `Sección ${sectionId}`,
            href: `/projects/${projectId}/${sectionId}`,
          },
          { label: "Nuevo" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Contenido</h1>
      <p className="text-muted-foreground mb-6">
        Proyecto {projectId} | Sección {sectionId}
      </p>
      {/* Aquí va tu formulario de creación */}
      <div className="mt-6">
        <p>Formulario para crear contenido...</p>
      </div>
    </div>
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
