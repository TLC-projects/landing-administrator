import { Metadata } from "next";
import { Shell, AppTitle } from "@/components/layouts";
import { ProjectCard } from "@/components/modules/library";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};


interface ProjectI {
  id: number;
  name: string;
  img?: string;
}

// Lista que viene de la API con los proyectos del usuario
const projects: ProjectI[] = [
  {
    id: 1,
    name: "Proyecto 1",
  },
  /* {
    id: 2,
    name: "Proyecto 2",
  },
  {
    id: 3,
    name: "Proyecto 3",
  } */
];

export default function Page() {
  return (
    <Shell>
      <AppTitle
        title="Biblioteca"
        description="Aquí puedes encontrar todos los recursos disponibles para ti."
      />
      {/* TODO: Lista dinámica de proyectos */}
      <div className="space-y-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
       {projects.map((project) => 
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            img={project.img}
          />
        )}
      </div>
    </Shell>
  );
}
