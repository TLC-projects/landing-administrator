"use client";

import {
  Button,
  SearchBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { ContentTableColumns } from "./content-columns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ContentTablePagination } from "./content-pagination";
import { ContentFilter } from "./content-filter";

export type Content = {
  id: string;
  sectionId: string;
  duration: string;
  url: string;
  title: string;
  blocked: boolean;
};

interface ContentTableProps {
  content: Content[];
  projectId: string;
  hasActiveFilters?: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export const ContentTable: React.FC<ContentTableProps> = ({
  content = [],
  projectId,
  hasActiveFilters,
  pagination,
}) => {
  const columns = useMemo(
    () =>
      ContentTableColumns({
        projectId: projectId,
      }),
    [projectId],
  );

  const table = useReactTable({
    data: content,
    columns: columns,
    // rowCount: pageInfo.total ?? -1, // Use -1 for unknown total
    // onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    // onSortingChange: setSorting,
    // state: {
    //   sorting,
    //   columnFilters,
    //   pagination,
    // },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2.5 border shadow rounded-md px-3 py-5">
        <SearchBar />
        <div className="flex items-center justify-between gap-2">
          <ContentFilter />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <Button asChild>
            <Link
              href={`/projects/${projectId}/${content[0].sectionId}/new`}
              className="flex items-center gap-2"
            >
              <Plus /> <span>Crear contenido</span>
            </Link>
          </Button>
        </div>
        <div className="rounded-md border">
          <Table className="px-3.5">
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getPaginationRowModel().rows?.length ? (
                table.getPaginationRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-muted-foreground truncate"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={ContentTableColumns.length}
                    className="text-center"
                  >
                    No hay recursos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ContentTablePagination table={table} />
      </div>
    </div>
  );
};
