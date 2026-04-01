import { BookOpen } from "lucide-react";
import { Shell, AppTitle } from "@components/layouts";
import { SectionTable } from "@components/modules/sections";
import { getSectionService } from "@core/infrastructure/config/section-dependency";
import { PaginationParams } from "@core/domain/value-objects/pagination";

interface SectionPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function SectionPage({ searchParams }: SectionPageProps) {
  const paramsSearch = await searchParams;

  // Parse pagination parameters from searchParams
  const pagination = PaginationParams.forSections(
    paramsSearch?.page ? parseInt(paramsSearch.page) : undefined,
    paramsSearch?.limit ? parseInt(paramsSearch.limit) : undefined,
  );

  const sectionService = await getSectionService();
  const sections = await sectionService.getSectionsWithContentCount(
    pagination,
    paramsSearch.search,
  );

  const sectionsWithCount = sections.data.map((section) => ({
    id: section.id,
    name: section.name,
    contentNumber: section.content_number ?? 0,
  }));

  return (
    <Shell>
      <AppTitle
        title={`Secciones`}
        description="Selecciona una sección para gestionar su contenido."
        icon={BookOpen}
      />
      <SectionTable
        sections={sectionsWithCount}
        pageInfo={{
          total: sections.total,
          page: sections.page,
          limit: sections.limit,
        }}
      />
    </Shell>
  );
}

export const metadata = {
  title: "Secciones | Content Administrator",
  description: "Selecciona una sección para gestionar su contenido.",
};
