import Link from "next/link";
import { Shell, AppTitle } from "@/components/layouts";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { projectId, sectionId, contentId } = await params;

  return (
    <Shell>
      <AppTitle
        title={`Contenido ${contentId}`}
        description={`Proyecto ${projectId} | Sección ${sectionId}`}
      />
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
