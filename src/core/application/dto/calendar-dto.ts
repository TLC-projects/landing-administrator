import { Calendar } from "@core/domain/entities/Calendar";

export interface CalendarDto {
    id: string;
    title: string;
    date: string;
    blocked?: boolean;
}

export interface PaginatedCalendarEntityResponse {
  data: Calendar[]
  total: number
  page: number
  limit: number
}

export interface CalendarServerResponseDto {
  data: CalendarDto[] | CalendarDto
  page?: number
  limit?: number
  total?: number
}