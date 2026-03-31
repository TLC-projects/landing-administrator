import { PaginationParams } from "@core/domain/value-objects/pagination"
import { PaginatedCalendarEntityResponse } from "@core/application/dto/calendar-dto"
import { Calendar, CalendarFilters } from "@core/domain/entities/Calendar"

export interface CalendarRepository {
    getAllCalendars(params: PaginationParams, filters?: CalendarFilters): Promise<PaginatedCalendarEntityResponse | null>
    getCalendarById(id: string): Promise<Calendar | null>
    createNewCalendar(calendar: Omit<Calendar, 'id'>): Promise<Calendar | null>
    updateCalendar(id: string, calendar: Partial<Omit<Calendar, 'id'>>): Promise<Calendar | null>
    deleteCalendar(id: string): Promise<boolean>
}