"use client";

import {
  SearchBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SectionTableColumns } from "./section-table-columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SectionTablePagination } from "./section-table-pagination";
import { Section } from "@/src/core/domain/entities/Section";

interface SectionTableProps {
  sections: Section[];
  pageInfo: {
    total: number;
    page: number;
    limit: number;
  };
}

export const SectionTable: React.FC<SectionTableProps> = ({
  sections,
  pageInfo,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageInfo.page - 1, // React Table uses 0-based index
    pageSize: pageInfo.limit,
  });

  const createQueryString = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams?.toString());

      // If page is less than 1, return the base URL without page parameter
      if (newPage < 1) {
        return `${pathname}`;
      }

      // Set the page parameter and return the complete URL
      params.set("page", newPage.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname],
  );

  useEffect(() => {
    setPagination({
      pageIndex: pageInfo.page - 1, // React Table uses 0-based index
      pageSize: pageInfo.limit,
    });
  }, [pageInfo.page, pageInfo.limit]);

  useEffect(() => {
    // Update the URL when pagination changes
    const newPage = pagination.pageIndex + 1; // Convert to 1-based index for URL
    const newUrl = createQueryString(newPage);
    router.push(newUrl);
  }, [pagination]);

  const columns = useMemo(() => SectionTableColumns(), []);

  const table = useReactTable({
    data: sections,
    columns: columns,
    rowCount: pageInfo.total ?? -1, // Use -1 for unknown total
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center border shadow rounded-md px-3 py-5">
        <SearchBar
          className="md:max-w-7xl"
          placeholder="Filtrar por nombre de la seccion"
          onSearch={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-lg border border-border/50 overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-medium text-muted-foreground text-xs uppercase tracking-wider h-12">
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
                  className="hover:bg-primary/10 transition-colors border-b border-border/30 last:border-0 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-foreground py-4"
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
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  No hay recursos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <SectionTablePagination table={table} />
    </div>
  );
};
