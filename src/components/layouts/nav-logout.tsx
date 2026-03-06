import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/src/components/ui';

export const NavLogout = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Cerrar sesión">
          <Link href="/logout" aria-label="Cerrar sesión">
            <LogOut className="h-4 w-4" />
            <span>Cerrar sesión</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
