"use client";

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Content } from "./content-table";
import {
  ArrowUpDown,
  Ban,
  Eye,
  EyeOff,
  MoreHorizontal,
  SquarePen,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface Props {
  projectId: string;
}

export const ContentTableColumns = ({
  projectId,
}: Props): ColumnDef<Content>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Nombre de la sección",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "blocked",
    header: "Estado",
    cell: ({ row }) => {
      const content = row.original;
      const blocked = content.blocked ? "Visible" : "Oculto";
      const backgroundColor = content.blocked ? "#DBFCE7" : "#DDDDDD";
      const color = content.blocked ? "green" : "#121212";
      return (
        <Badge className={`capitalize border-0`} style={{ backgroundColor: backgroundColor, color: color }}>
          <span>
            {content.blocked ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </span>
          {blocked}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const content = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/projects/${projectId}/${content.sectionId}/${content.id}`}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4 " />
                <span>Ver contenido</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/projects/${projectId}/${content.sectionId}/${content.id}/edit`}
                className="flex items-center gap-2"
              >
                <SquarePen className="h-4 w-4 " />
                <span>Editar contenido</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              aria-label="No publicar recurso"
              className="text-red-600"
              onClick={() =>
                console.log(`Eliminando el contenido con ID: ${content.id}`)
              }
            >
              <Ban className="h-4 w-4 text-gray-500" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
