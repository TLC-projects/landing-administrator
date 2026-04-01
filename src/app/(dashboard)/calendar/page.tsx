import { PaginationParams } from "@core/domain/value-objects/pagination";
import { getCalendarService } from "@core/infrastructure/config/calendar-dependency";
import { AppTitle, Shell } from "@components/layouts";
import { CalendarDays } from "lucide-react";
import {
  CalendarContainer,
} from "@components/modules/calendar";

interface CalendarPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    blocked?: string;
  }>;
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const paramsSearch = await searchParams;

  const pagination = PaginationParams.forContents(
    paramsSearch?.page ? parseInt(paramsSearch.page) : undefined,
    paramsSearch?.limit ? parseInt(paramsSearch.limit) : undefined,
  );

  const calendarService = await getCalendarService();

  const filters = {
    search: paramsSearch.search,
    blocked:
      paramsSearch.blocked === "true"
        ? true
        : paramsSearch.blocked === "false"
          ? false
          : undefined,
  };

  const data = await calendarService.getAllCalendars(pagination, filters);

  const pageInfo = {
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? pagination.limit,
  };

  return (
    <Shell>
      <AppTitle
        title={`Calendario`}
        description="Programa y visualiza fechas clave de tus programas."
        icon={CalendarDays}
      />
      <CalendarContainer
        entries={data?.data ?? []}
        initialSearch={paramsSearch.search ?? ""}
        initialBlocked={filters.blocked}
        pageInfo={pageInfo}
      />
    </Shell>
  );
}

export const metadata = {
  title: "Calendario | Content Administrator",
  description: "Programa y visualiza fechas clave de tus programas.",
};
