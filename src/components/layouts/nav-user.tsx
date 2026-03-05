"use client";

import { getInitials } from "@/src/lib/get-initials";

import {
  Avatar,
  AvatarFallback,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui";
import { dataFetcher } from "@lib/data-fetching";
import { User } from "@core/domain/entities/User";
import { withBasePath } from "@lib/with-base-path";
import { ProfileSkeleton } from "../modules/skeleton";

export const NavUser = () => {
  const { data, loading } = dataFetcher.useQuery<User>(
    withBasePath("/api/user/me"),
  );

  if (loading) {
    <ProfileSkeleton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg" aria-hidden="true">
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
              {getInitials(data?.fullName || "")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span
              className="truncate capitalize font-medium"
              aria-label="Nombre del usuario"
            >
              {data?.fullName}
            </span>
            <span
              className="truncate text-xs text-muted-foreground"
              aria-label="Correo electrónico del usuario"
            >
              {data?.email}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
