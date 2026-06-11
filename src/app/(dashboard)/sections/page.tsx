import { BookOpen } from 'lucide-react';
import { AppTitle, Shell } from '@components/layouts';
import { SectionTable } from '@components/modules/sections';
import { SectionFilters } from '@core/domain/entities/section';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { getSectionService } from '@core/infrastructure/config/section-dependency';

interface SectionPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function SectionPage({ searchParams }: SectionPageProps) {
  const params = await searchParams;

  // Parse pagination parameters from searchParams
  const pagination = PaginationParams.forSections(
    params?.page ? parseInt(params.page) : undefined,
    params?.limit ? parseInt(params.limit) : undefined
  );

  const sectionService = await getSectionService();

  // Prepare filters based on searchParams
  const filters: SectionFilters = {};
  if (params?.search) filters.search = params.search;

  const sections = await sectionService.getSectionsWithContentCount(pagination, filters);

  const sectionsWithCount = sections.data.map((section) => ({
    id: section.id,
    name: section.name,
    contentNumber: section.content_number ?? 0
  }));

  return (
    <Shell>
      <AppTitle title="Secciones" description="Selecciona una sección para gestionar su contenido." icon={BookOpen} />
      <SectionTable
        sections={sectionsWithCount}
        pageInfo={{
          total: sections.total,
          page: sections.page,
          limit: sections.limit
        }}
      />
    </Shell>
  );
}

export const metadata = {
  title: 'Secciones | Content Administrator',
  description: 'Selecciona una sección para gestionar su contenido.'
};
