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
import { dashboardModules } from "@lib/dashboard-modules";
export const NavMain = () => {


  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {dashboardModules.map((module) => (
            <SidebarMenuItem key={module.id}>
              <SidebarMenuButton asChild>
                <Link href={module.href}>
                  {module.icon || <Folder className="mr-2" />}
                  <span>{module.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {/* {hasMore && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                onClick={loadMore}
              >
                <Ellipsis />
                <span>{loading ? "Cargando..." : "Ver más módulos"}</span>
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
          )} */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
