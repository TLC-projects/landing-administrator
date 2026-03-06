import { Metadata } from "next";
import { Library } from "lucide-react";
import { Shell, AppTitle } from "@components/layouts";
import { ProjectList } from "@components/modules/project";
import { getProjectService } from "@core/infrastructure/config/project-dependency";
import { PaginationParams } from "@/src/core/domain/value-objects/pagination";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  // Parse pagination parameters from searchParams
  const pagination = PaginationParams.forProjects(
    params?.page ? parseInt(params.page) : undefined,
    params?.limit ? parseInt(params.limit) : undefined,
  );

  const projectService = await getProjectService();
  const projects = await projectService.getAllProjects(
    pagination,
    params.search,
  );

  return (
    <Shell>
      <AppTitle
        title="Proyectos"
        description="Gestiona tus proyectos y sus contenidos de manera eficiente."
        icon={Library}
      />
      <ProjectList
        projects={projects.data}
        pageInfo={{
          total: projects.total,
          page: projects.page,
          limit: projects.limit,
        }}
      />
    </Shell>
  );
}
