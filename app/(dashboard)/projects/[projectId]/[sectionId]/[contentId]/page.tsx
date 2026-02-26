import Link from "next/link";
import { Breadcrumb } from "@/components/ui";

export default async function ContentPage({
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
          { label: `Contenido ${contentId}` },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Contenido {contentId}</h1>
      <p className="text-muted-foreground mb-6">
        Proyecto {projectId} | Sección {sectionId}
      </p>
      <div className="space-y-2">
        <Link
          href={`/projects/${projectId}/${sectionId}/${contentId}/edit`}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          ✏️ Editar este contenido
        </Link>
        <div className="mt-4">
          <Link
            href={`/projects/${projectId}/${sectionId}`}
            className="text-gray-500 hover:underline block"
          >
            ← Volver a la lista de contenidos
          </Link>
        </div>
      </div>
    </div>
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
