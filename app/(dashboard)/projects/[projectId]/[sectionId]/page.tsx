import Link from "next/link";
import { Shell, AppTitle } from "@/components/layouts";

export default async function ContentsListPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
}) {
  const { projectId, sectionId } = await params;

  // TODO: Fetch real data
  const mockContents = [
    { id: "1", title: "Contenido 1" },
    { id: "2", title: "Contenido 2" },
    { id: "3", title: "Contenido 3" },
  ];

  return (
    <Shell>
      <AppTitle
        title="Sección 1"
        description=""
        breadcrumb={[
          { label: "Proyectos", href: "/" },
          { label: `Proyecto ${projectId}`, href: `/projects/${projectId}` },
          { label: `Sección ${sectionId}` }
        ]}
        action={
          <Link
            href={`/projects/${projectId}/${sectionId}/new`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ➕ Crear contenido
          </Link>
        }
      />
      <div className="space-y-2">
        {mockContents.map((content) => (
          <Link
            key={content.id}
            href={`/projects/${projectId}/${sectionId}/${content.id}`}
            className="block p-4 border rounded hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">{content.title}</h3>
          </Link>
        ))}
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
    title: `Contenidos - Sección ${sectionId} | Content Admin`,
    description: `Lista de contenidos de la sección ${sectionId}`,
  };
}
