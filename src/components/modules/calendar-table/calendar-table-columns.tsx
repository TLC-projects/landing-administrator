"use client";

import { Calendar } from "@core/domain/entities/Calendar";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button } from "@components/ui";
import { ArrowUpDown, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { CalendarTableActions } from "./calendar-table-actions";
import { formatDate } from "./lib/format-date";

export const CalendarTableColumns = (): ColumnDef<Calendar>[] => [
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
    cell: ({ row }) => (
      <div className="font-medium text-foreground/70 px-4">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Nombre del evento",
    cell: ({ row }) => (
      <div className="font-medium lowercase">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const raw = row.getValue("date") as string;
      const formatted = formatDate(raw);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "blocked",
    header: "Estado",
    cell: ({ row }) => {
      const content = row.original;
      const blocked = content.blocked ? "Oculto" : "Visible";
      const backgroundColor = content.blocked ? "#DDDDDD" : "#DBFCE7";
      const color = content.blocked ? "#121212" : "green";
      return (
        <Badge
          className={`capitalize border-0`}
          style={{ backgroundColor: backgroundColor, color: color }}
        >
          <span className="flex items-center gap-1.5">
            {content.blocked ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {blocked}
          </span>
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const calendar = row.original;
      return <CalendarTableActions calendar={calendar} />;
    },
  },
];
