import { Shell, AppTitle } from "@/components/layouts";
import { ContentTable } from "@/components/modules/content";

export default async function ContentsListPage({
  params,
}: {
  params: Promise<{ projectId: string; sectionId: string }>;
}) {
  const { projectId, sectionId } = await params;

  // TODO: Fetch real data
  const mockContents = [
    {
      id: "1",
      sectionId: sectionId,
      duration: "60 horas",
      url: "",
      title: "Contenido 1",
      blocked: true,
    },
    {
      id: "2",
      sectionId: sectionId,
      duration: "60 horas",
      url: "",
      title: "Contenido 2",
      blocked: true,
    },
    {
      id: "3",
      sectionId: sectionId,
      duration: "60 horas",
      url: "",
      title: "Contenido 3",
      blocked: false,
    },
  ];

  return (
    <Shell>
      <AppTitle
        title="Sección 1"
        description="Lista de contenidos, puedes administrar tus contenidos."
      />
      <ContentTable
        content={mockContents}
        projectId={projectId}
        hasActiveFilters={false}
        pagination={{ page: 1, limit: 10, total: mockContents.length }}
      />
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
