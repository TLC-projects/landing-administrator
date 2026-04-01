"use client";

import { Calendar } from "@core/domain/entities/Calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui";
import { CalendarTableColumns } from "./calendar-table-columns";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalendarTablePagination } from "./calendar-table-pagination";

interface CalendarTableProps {
  entries: Calendar[];
  pageInfo: {
    total: number;
    page: number;
    limit: number;
  };
}

export function CalendarTable({ entries, pageInfo }: CalendarTableProps) {
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
      const params = new URLSearchParams(searchParams?.toString() ?? "");

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

  // Update the pagination state when pageInfo changes
  useEffect(() => {
    setPagination({
      pageIndex: pageInfo.page - 1, // React Table uses 0-based index
      pageSize: pageInfo.limit,
    });
  }, [pageInfo.page, pageInfo.limit]);

  // Update the URL when the pagination state changes
  useEffect(() => {
    const newPage = pagination.pageIndex + 1;

    if (newPage !== pageInfo.page) {
      const newUrl = createQueryString(newPage);
      router.push(newUrl);
    }
  }, [pagination.pageIndex]);

  const columns = useMemo(() => CalendarTableColumns(), []);

  const table = useReactTable({
    data: entries,
    columns,
    rowCount: pageInfo.total,
    pageCount: Math.ceil(pageInfo.total / pageInfo.limit),
    manualPagination: true,
    onPaginationChange: setPagination,
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
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table className="px-3.5">
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b border-border/50"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-medium text-muted-foreground text-xs uppercase tracking-wider h-12"
                  >
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
                    <TableCell key={cell.id} className="text-foreground py-4">
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-12 text-muted-foreground"
                >
                  No hay recursos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CalendarTablePagination table={table} />
    </div>
  );
}
