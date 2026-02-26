import { Breadcrumb } from "@/components/ui";
import Link from "next/link";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { projectId, sectionId, contentId } = await params;

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
          { label: "Editar" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Editar Contenido</h1>
      <p className="text-muted-foreground mb-6">
        Proyecto {projectId} | Sección {sectionId} | Contenido {contentId}
      </p>
      {/* Aquí va tu formulario de edición */}
      <div className="mt-6">
        <p>Formulario para editar contenido...</p>
      </div>
      <div className="mt-6">
        <Link
          href={`/projects/${projectId}/${sectionId}`}
          className="text-gray-500 hover:underline"
        >
          ← Cancelar y volver
        </Link>
      </div>
    </div>
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
