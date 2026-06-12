import { Calendar } from '@/src/core/domain/entities/calendar';

export interface CalendarDto {
  id: string;
  title: string;
  date: string;
  blocked: number;
}

export interface PaginatedCalendarResponse {
  total: number;
  page: number;
  limit: number;
  data: Calendar[];
}

export interface CalendarServerResponseDto {
  page?: number;
  limit?: number;
  total?: number;
  data: CalendarDto[] | CalendarDto;
}
