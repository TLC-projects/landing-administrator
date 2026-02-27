import { Shell, AppTitle } from "@/components/layouts";
import Link from "next/link";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { projectId, sectionId, contentId } = await params;

  return (
    <Shell>
      <AppTitle
        title="Editar Contenido"
        description={`Proyecto ${projectId} | Sección ${sectionId} | Contenido ${contentId}`}
        breadcrumb={[
          { label: "Proyectos", href: "/" },
          { label: `Proyecto ${projectId}`, href: `/projects/${projectId}` },
          {
            label: `Sección ${sectionId}`,
            href: `/projects/${projectId}/${sectionId}`,
          },
          { label: "Editar" },
        ]}
      />
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
