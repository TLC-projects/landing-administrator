import Link from "next/link";
import { Shell, AppTitle } from "@/components/layouts";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  // TODO: Fetch real sections data
  const mockSections = [
    { id: "1", title: "Sección 1" },
    { id: "2", title: "Sección 2" },
  ];

  return (
    <Shell>
      <AppTitle
        title={`Proyecto ${projectId}`}
        description="Selecciona una sección para gestionar su contenido."
      />
      <div className="space-y-2">
        {mockSections.map((section) => (
          <Link
            key={section.id}
            href={`/projects/${projectId}/${section.id}`}
            className="block p-4 border rounded hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">{section.title}</h3>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return {
    title: `Proyecto ${projectId} | Content Admin`,
    description: `Gestiona las secciones del proyecto ${projectId}`,
  };
}