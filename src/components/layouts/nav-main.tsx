"use client";

import { Ellipsis, Folder } from "lucide-react";

import {
  Button,
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
import { useEffect, useState } from "react";
import { PAGINATION_CONFIG } from "@/src/core/domain/value-objects/pagination";

export const NavMain = () => {
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState<any[]>([]);

  const { data, loading } = dataFetcher.useQuery<PaginatedProjectResponse>(
    withBasePath(`/api/projects?page=${page}&limit=${PAGINATION_CONFIG.SECTIONS.DEFAULT_LIMIT}`),
  );

  useEffect(() => {
    if (data?.data) {
      setProjects((prev) => {
        const merged = [...prev, ...data.data];
        return merged.slice(0, PAGINATION_CONFIG.SECTIONS.MAX_LIMIT); // 👈 máximo 30
      });
    }
  }, [data]);

  const hasMore =
    projects.length < (data?.total ?? 0) &&
    projects.length < PAGINATION_CONFIG.SECTIONS.MAX_LIMIT;

  const loadMore = () => {
    if (projects.length < PAGINATION_CONFIG.SECTIONS.MAX_LIMIT) {
      setPage((prev) => prev + 1);
    }
  };

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
          {hasMore && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                onClick={loadMore}
              >
                <Ellipsis />
                <span>{loading ? "Cargando..." : "Ver más proyectos"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {!hasMore && (
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
                <Button
                  variant="ghost"
                  size={"icon-xs"}
                  className="justify-start"
                  asChild
                >
                  <Link href="/">
                    <span>Ver todos</span>
                  </Link>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
