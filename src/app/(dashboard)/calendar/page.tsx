import { CalendarDays } from 'lucide-react';
import { AppTitle, Shell } from '@components/layouts';
import { CalendarContainer } from '@components/modules/calendar';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { getCalendarService } from '@core/infrastructure/config/calendar-dependency';

import { CalendarFilters } from '@/src/core/domain/entities/calendar_';

export const metadata = {
  title: 'Calendario | Content Administrator',
  description: 'Programa y visualiza fechas clave de tus programas.'
};

interface CalendarPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    blocked?: string;
  }>;
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const params = await searchParams;

  // Parse pagination parameters from searchParams
  const pagination = PaginationParams.forCalendar(
    params?.page ? parseInt(params.page) : undefined,
    params?.limit ? parseInt(params.limit) : undefined
  );

  const calendarService = await getCalendarService();

  // Prepare filters based on searchParams
  const filters: CalendarFilters = {};
  if (params?.search) filters.search = params.search;
  if (params?.blocked !== undefined)
    filters.blocked = params.blocked === 'true' ? true : params.blocked === 'false' ? false : undefined;

  const calendar = await calendarService.getAllCalendars(pagination, filters);

  const pageInfo = {
    total: calendar.total,
    page: calendar.page,
    limit: calendar.limit
  };

  return (
    <Shell>
      <AppTitle
        title="Calendario"
        description="Programa y visualiza fechas clave de tus programas."
        icon={CalendarDays}
      />
      <CalendarContainer
        entries={calendar.data}
        initialSearch={params.search ?? ''}
        initialBlocked={filters.blocked}
        pageInfo={pageInfo}
      />
    </Shell>
  );
}
