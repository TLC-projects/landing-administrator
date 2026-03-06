"use client";

import { Project } from "@/src/core/domain/entities/Project";
import { ProjectCard } from "./project-card";
import { Paginator } from "../pagination/pagination";

interface ProjectListProps {
  projects: Project[];
  pageInfo: {
    total: number;
    page: number;
    limit: number;
  };
}

export function ProjectList({ projects, pageInfo }: ProjectListProps) {
  const totalPages = Math.ceil(pageInfo.total / pageInfo.limit);

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">
          No hay proyectos disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 height-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            description={project.description}
          />
        ))}
      </div>
      {totalPages > 1 && <Paginator totalPages={totalPages} />}
    </div>
  );
}
