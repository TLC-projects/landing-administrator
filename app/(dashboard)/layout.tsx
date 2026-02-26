import { SidebarProvider, SidebarTrigger } from "@/components/ui";
import { AppSidebar } from "@/components/layouts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
