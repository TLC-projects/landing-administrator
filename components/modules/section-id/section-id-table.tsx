import { Button, SearchBar, Table } from "@/components/ui";
import { Plus } from "lucide-react";
import Link from "next/link";

export type Section = {
  id: string;
  sectionId: string;
  duration: string;
  url: string;
  title: string;
  blocked: boolean;
};

interface SectionIdTableProps {
  section: Section[];
  projectId: string;
  hasActiveFilters?: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export const SectionIdTable: React.FC<SectionIdTableProps> = ({
  section,
  projectId,
  hasActiveFilters,
  pagination,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        <SearchBar />
        <div className="flex items-center justify-between gap-2">
          {/* <GalleryFilters showStatusFilter={showToggleViewButton} /> */}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <Button asChild>
            <Link
              href={`/projects/${projectId}/${section[0].sectionId}/new`}
              className="flex items-center gap-2"
            >
              <Plus /> <span>Crear contenido</span>
            </Link>
          </Button>
        </div>
        <div className="rounded-md border">
          <Table className="px-3.5"></Table>
        </div>
      </div>
    </div>
  );
};
