"use client";

import { ProjectCard } from "./project-card";
import { Paginator } from "../pagination/pagination";

interface Module {
  id: string;
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ProjectListProps {
  modules: Module[];
  pageInfo?: {
    total: number;
    page: number;
    limit: number;
  };
}

export function ProjectList({ modules, pageInfo }: ProjectListProps) {
  const totalPages = pageInfo ? Math.ceil(pageInfo.total / pageInfo.limit) : 1;

  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">
          No hay módulos disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 height-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <ProjectCard
            key={module.id}
            id={module.id}
            title={module.title}
            description={module.description}
            href={module.href}
            icon={module.icon}
          />
        ))}
      </div>
      {totalPages > 1 && <Paginator totalPages={totalPages} />}
    </div>
  );
}
