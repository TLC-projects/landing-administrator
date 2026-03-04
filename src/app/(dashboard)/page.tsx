import { Metadata } from "next";
import { Library } from "lucide-react";
import { Shell, AppTitle } from "@/src/components/layouts";
import { ProjectList } from "@/src/components/modules/project";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};

export default function Page() {
  // TODO: Fetch real projects data
  const mockProjects = [
    {
      id: "1",
      title: "Proyecto Marketing",
      description: "Contenidos y recursos para campañas de marketing digital",
    },
    {
      id: "2",
      title: "Proyecto Ventas",
      description: "Materiales y documentación del equipo de ventas",
    },
    {
      id: "3",
      title: "Proyecto Formación",
      description: "Cursos y material educativo para empleados",
    },
  ];

  return (
    <Shell>
      <AppTitle
        title="Proyectos"
        description="Gestiona tus proyectos y sus contenidos de manera eficiente."
        icon={Library}
      />
      <ProjectList projects={mockProjects} />
    </Shell>
  );
}
