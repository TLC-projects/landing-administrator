"use client";

import { Ellipsis, Folder } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui";
import Link from "next/link";
import { dataFetcher } from "@lib/data-fetching";
import { withBasePath } from "@lib/with-base-path";
import { Project } from "@core/domain/entities/Project";

type ProjectsResponse = {
  projects: Project[];
};

export const NavMain = () => {
  const { data } = dataFetcher.useQuery<ProjectsResponse>(
    withBasePath("/api/projects"),
  );
  console.log(data);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Proyectos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.projects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild>
                <Link href={`/projects/${project.id}`}>
                  <Folder className="mr-2" />
                  <span>{project.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
              <Link href="/">
                <Ellipsis />
                <span>Ver todos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
