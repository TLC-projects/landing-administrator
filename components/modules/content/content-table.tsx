"use client";

import {
  Button,
  Card,
  CardContent,
  SearchBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { FunnelX, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentTableColumns } from "./content-columns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ContentTablePagination } from "./content-pagination";
import { ContentFilter } from "./content-filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  pageInfo: {
    total: number;
    page: number;
    limit: number;
  };
}

export const ContentTable: React.FC<ContentTableProps> = ({
  content = [],
  projectId,
  hasActiveFilters,
  pageInfo,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageInfo.page - 1, // React Table uses 0-based index
    pageSize: pageInfo.limit,
  });

  // Check if the database is empty
  const isEmptyDatabase = content.length === 0 && !hasActiveFilters;

  // Check if there are no results from filters
  // const noResultsFromFilters = content.length === 0 && hasActiveFilters;

  const columns = useMemo(
    () =>
      ContentTableColumns({
        projectId: projectId,
      }),
    [projectId],
  );

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
    const newPage = pagination.pageIndex + 1;
    const currentPage = Number(searchParams.get("page") ?? 1);

    if (newPage !== currentPage) {
      router.replace(createQueryString(newPage));
    }
  }, [pagination.pageIndex]);

  const table = useReactTable({
    data: content,
    columns,
    rowCount: pageInfo.total ?? -1,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
  });

  if (isEmptyDatabase) {
    return (
      <div className="flex items-center justify-center flex-col space-y-4">
        <Card className="w-full">
          <CardContent className="flex h-48 text-center items-center justify-center flex-col space-y-4">
            <div className="flex items-center p-4 bg-primary-500 rounded-full">
              <FunnelX className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                No hay recursos disponibles
              </h3>
              <p className="text-sm text-muted-foreground">
                Te notificaremos cuando haya nuevos recursos disponibles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2.5 border shadow rounded-md px-3 py-5 flex flex-col md:flex-row items-start gap-4">
        <SearchBar
          className="md:max-w-7xl"
          onSearch={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
        />
        <ContentFilter />
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-primary/10 transition-colors border-b border-border/30 last:border-0 group"
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
                    colSpan={columns.length}
                    className="text-center w-full"
                  >
                    No se encontraron resultados.
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
