import { Metadata } from "next";
import { Library } from "lucide-react";
import { Shell, AppTitle } from "@/src/components/layouts";
import { ProjectList } from "@/src/components/modules/project";
import { getProjectService } from "@/src/core/infrastructure/config/project-dependency";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};

export default async function Page() {

  const projectService = await getProjectService();
  const projects = await projectService.getAllProjects({ page: 1, limit: 10 });


  return (
    <Shell>
      <AppTitle
        title="Proyectos"
        description="Gestiona tus proyectos y sus contenidos de manera eficiente."
        icon={Library}
      />
      <ProjectList projects={projects} />
    </Shell>
  );
}
