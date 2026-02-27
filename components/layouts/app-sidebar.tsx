import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavLogout } from "./nav-logout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavLogout/>
      </SidebarFooter>
    </Sidebar>
  );
}
