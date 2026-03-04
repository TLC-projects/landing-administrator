"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Section } from "./section-table";
import { Button } from "@/src/components/ui";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";

export const SectionTableColumns = (): ColumnDef<Section>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent px-0"
        >
          ID
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium text-foreground/70">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Nombre de la sección",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "contentNumber",
    header: "N° de contenidos",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("contentNumber")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const section = row.original;
      return (
        <Button asChild variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
          <Link
            href={`/projects/${section.projectId}/${section.id}`}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            <span>Ver</span>
          </Link>
        </Button>
      );
    },
  },
];
