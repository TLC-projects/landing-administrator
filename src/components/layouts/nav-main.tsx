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
import { PaginatedProjectResponse } from "@core/application/dto/project-dto";


export const NavMain = () => {
  const { data } = dataFetcher.useQuery<PaginatedProjectResponse>(
    withBasePath("/api/projects"),
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Proyectos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.data.map((project) => (
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
