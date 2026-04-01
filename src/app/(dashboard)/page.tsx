import { Metadata } from "next";
import { Library } from "lucide-react";
import { Shell, AppTitle } from "@components/layouts";
import { ProjectList } from "@components/modules/project";
import { dashboardModules } from "@lib/dashboard-modules";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};

export default async function ProjectsPage() {
  return (
    <Shell>
      <AppTitle
        title="Dashboard"
        description="Bienvenido al panel de administración. Desde aquí puedes gestionar todos los módulos de la plataforma de contenidos."
        icon={Library}
      />
      <ProjectList
        modules={dashboardModules}
      />
    </Shell>
  );
}
