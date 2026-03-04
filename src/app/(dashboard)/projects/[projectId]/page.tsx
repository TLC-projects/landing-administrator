import { FolderOpen } from "lucide-react";
import { Shell, AppTitle } from "@/src/components/layouts";
import { SectionTable } from "@/src/components/modules/sections";
import { getSectionsByProject } from "@/src/components/modules/sections/actions/section-actions";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

 const sections = await getSectionsByProject(Number(projectId))
 
  return (
    <Shell>
      <AppTitle
        title={`Proyecto ${projectId}`}
        description="Selecciona una sección para gestionar su contenido."
        icon={FolderOpen}
      />
      <SectionTable
        sections={sections}
        pageInfo={{ total: sections.length, page: 1, limit: 10 }}
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
