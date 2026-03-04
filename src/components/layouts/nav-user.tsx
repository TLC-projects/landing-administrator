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

export const NavUser = () => {
   const { data, loading, error } = dataFetcher.useQuery<User>(withBasePath('/api/user/me'));
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg" aria-hidden="true">
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
              {getInitials("Sabrina Carpenter")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span
              className="truncate capitalize font-medium"
              aria-label="Nombre del usuario"
            >
              Sabrina Carpenter
            </span>
            <span
              className="truncate text-xs text-muted-foreground"
              aria-label="Correo electrónico del usuario"
            >
              johndue@email.com
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
