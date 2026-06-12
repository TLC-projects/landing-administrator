import { CreateCalendarDto, PaginatedCalendarResponse, UpdateCalendarDto } from '@core/application/dto/calendar';
import { Calendar, CalendarFilters } from '@/src/core/domain/entities/calendar';
import { PaginationParams } from '@core/domain/value-objects/pagination';

export interface CalendarRepository {
  getAllCalendars(params: PaginationParams, filters?: CalendarFilters): Promise<PaginatedCalendarResponse>;
  getCalendarById(id: string): Promise<Calendar | null>;
  createNewCalendar(calendar: CreateCalendarDto): Promise<Calendar | null>;
  updateCalendar(id: string, calendar: UpdateCalendarDto): Promise<Calendar | null>;
  deleteCalendar(id: string): Promise<void>;
}
