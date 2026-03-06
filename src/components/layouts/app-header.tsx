"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger, Separator } from "@/src/components/ui";
import { AppBreadcrumb } from "./app-breadcrumb";

export function AppHeader() {
  const pathname = usePathname();

  /**
   * Generates an array of breadcrumb objects based on the current pathname.
   * 
   * @returns {Array<{label: string; href?: string}>} An array of breadcrumb objects containing label and optional href properties.
   * 
   * @description
   * - Starts with a "Inicio" (Home) breadcrumb pointing to "/"
   * - Splits the pathname by "/" and processes each segment
   * - Skips the "projects" segment as the root path represents the projects list
   * - Translates special segments: "new" → "Nuevo", "edit" → "Editar"
   * - For numeric IDs, generates descriptive labels based on the segment hierarchy:
   *   - If preceded by "projects": "Proyecto {id}"
   *   - If preceded by two segments back "projects": "Sección {id}"
   *   - If preceded by three segments back "projects": "Contenido {id}"
   * - The last breadcrumb in the array has no href (non-clickable), while others link to their respective paths
   */
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: { label: string; href?: string }[] = [
      { label: "Inicio", href: "/" },
    ];

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Saltar el segmento "projects" ya que / es la lista de proyectos
      if (segment === "projects") {
        return;
      }

      // Personalizar labels según el segmento
      let label = segment;
      
      if (segment === "new") {
        label = "Nuevo";
      } else if (segment === "edit") {
        label = "Editar";
      } else if (!isNaN(Number(segment))) {
        // Si es un ID numérico, construir un label más descriptivo
        if (segments[index - 1] === "projects") {
          label = `Proyecto ${segment}`;
        } else if (segments[index - 2] === "projects") {
          label = `Sección ${segment}`;
        } else if (segments[index - 3] === "projects") {
          label = `Contenido ${segment}`;
        }
      }

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <AppBreadcrumb breadcrumb={breadcrumbs} />
      </div>
    </header>
  );
}
