import { SidebarProvider, SidebarInset } from "@components/ui";
import { AppHeader, AppSidebar } from "@components/layouts";

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
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-7xl p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
