import { SidebarProvider, SidebarInset } from "@/components/ui";
import { AppHeader, AppSidebar } from "@/components/layouts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-1 flex-col">
        <AppHeader />
        <div className="@container/main flex flex-1 px-6 py-8 flex-col gap-2">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
