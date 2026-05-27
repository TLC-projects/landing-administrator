import { PaginatedCalendarEntityResponse } from "@core/application/dto/calendar";
import { CalendarFilters } from "@/src/core/domain/entities/calendar";
import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export class GetAllCalendarsUseCase {
    constructor(private readonly calendarRepository: CalendarRepository) { }

    async execute(params: PaginationParams, filters?: CalendarFilters): Promise<PaginatedCalendarEntityResponse | null> {
        try {
            const result = await this.calendarRepository.getAllCalendars(params, filters);
            if (!result) return null;
            return {
                data: result.data,
                total: result.total,
                page: result.page,
                limit: result.limit,
            };
        } catch (error) {
            console.error(`[GetAllCalendarsUseCase] Error al obtener calendarios:`, error)
            return null
        }
    }
}