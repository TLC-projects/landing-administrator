import Link from "next/link";
import { Breadcrumb } from "@/components/ui";

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
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Proyectos", href: "/" },
          { label: `Proyecto ${projectId}` },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Proyecto {projectId}</h1>
      <p className="text-muted-foreground mb-6">
        Selecciona una sección para gestionar su contenido.
      </p>
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
    </div>
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