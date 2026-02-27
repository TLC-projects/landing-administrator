import { Shell, AppTitle } from "@/components/layouts";
import { SectionTable } from "@/components/modules/sections";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  // TODO: Fetch real sections data
  const mockSections = [
    { id: "1", projectId: projectId, title: "Sección 1", contentNumber: 3 },
    { id: "2", projectId: projectId, title: "Sección 2", contentNumber: 5 },
  ];

  return (
    <Shell>
      <AppTitle
        title={`Proyecto ${projectId}`}
        description="Selecciona una sección para gestionar su contenido."
      />
      <SectionTable
        sections={mockSections}
        pageInfo={{ total: mockSections.length, page: 1, limit: 10 }}
      />
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
