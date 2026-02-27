'use client';

import { SearchBar, Table, TableHeader } from "@/components/ui";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { SectionTableColumns } from "./section-table-columns";

export type Section = {
  id: string;
  title: string;
  contentNumber: number;
};

interface SectionTableProps {
  sections: Section[];
  pageInfo?: {
    total: number;
    page: number;
    limit: number;
  };
}

export const SectionTable: React.FC<SectionTableProps> = ({
  sections,
  pageInfo,
}) => {
  const columns = useMemo(() => SectionTableColumns(), []);

  const table = useReactTable({
    data: sections,
    columns: columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center">
        <SearchBar placeholder="Filtrar por nombre de la seccion" />
      </div>
      <div className="rounded-md border">
        <Table className="px-3.5">
          <TableHeader className="bg-muted"></TableHeader>
        </Table>
      </div>
    </div>
  );
};
