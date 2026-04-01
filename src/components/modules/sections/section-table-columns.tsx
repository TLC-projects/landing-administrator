"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/src/components/ui";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import { Section } from "@core/domain/entities/Section";

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
    cell: ({ row }) => <div className="font-medium text-foreground/70 px-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Nombre de la sección",
    cell: ({ row }) => (
      <div className="font-medium lowercase">{row.getValue("name")}</div>
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
            href={`/sections/${section.id}`}
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
