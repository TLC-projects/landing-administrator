import { FolderOpen } from "lucide-react";
import { Shell, AppTitle } from "@components/layouts";
import { SectionTable } from "@components/modules/sections";
import { getProjectService } from "@core/infrastructure/config/project-dependency";
import { getSectionService } from "@core/infrastructure/config/section-dependency";
import { PaginationParams } from "@core/domain/value-objects/pagination";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function ProjectPage({
  searchParams,
  params,
}: ProjectPageProps) {
  const { projectId } = await params;

  const projectService = await getProjectService();
  const project = await projectService.getProjectById(projectId);

  const paramsSearch = await searchParams;
  // Parse pagination parameters from searchParams
  const pagination = PaginationParams.forProjects(
    paramsSearch?.page ? parseInt(paramsSearch.page) : undefined,
    paramsSearch?.limit ? parseInt(paramsSearch.limit) : undefined
  );

  if(paramsSearch.search) console.log(paramsSearch.search);

  const sectionService = await getSectionService();
  const sections = await sectionService.getSectionsByProjectId(projectId, pagination, paramsSearch.search);

  const mockSections = sections.data.map((section) => ({
    id: section.id,
    name: section.name,
    project_id: section.project_id,
    contentNumber: section.content_number ?? 0,
  }));

  return (
    <Shell>
      <AppTitle
        title={`Proyecto ${project?.name}`}
        description="Selecciona una sección para gestionar su contenido."
        icon={FolderOpen}
      />
      <SectionTable
        sections={mockSections}
        pageInfo={{ total: sections.total, page: sections.page, limit: sections.limit }}
      />
    </Shell>
  );
}
