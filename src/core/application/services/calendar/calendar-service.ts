import { GetAllCalendarsUseCase } from "@core/application/use-cases/calendar/get-all-calendars-use-case";
import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";
import { GetCalendarByIdUseCase } from "@core/application/use-cases/calendar/get-calendar-by-id-use-case";
import { CreateNewCalendarUseCase } from "@core/application/use-cases/calendar/create-new-calendar-use-case";
import { DeleteCalendarUseCase } from "@core/application/use-cases/calendar/delete-calendar-use-case";
import { UpdateCalendarUseCase } from "@core/application/use-cases/calendar/update-calendar-use-case";
import { Calendar, CalendarFilters } from "@core/domain/entities/Calendar";
import { PaginationParams } from "@/src/core/domain/value-objects/pagination";

export class CalendarService {
    private getAllCalendarsUseCase : GetAllCalendarsUseCase;
    private getCalendarByIdUseCase : GetCalendarByIdUseCase;
    private createNewCalendarUseCase : CreateNewCalendarUseCase;
    private deleteCalendarUseCase : DeleteCalendarUseCase;
    private updateCalendarUseCase : UpdateCalendarUseCase;

    constructor(CalendarRepository: CalendarRepository) {
        this.getAllCalendarsUseCase = new GetAllCalendarsUseCase(CalendarRepository);
        this.getCalendarByIdUseCase = new GetCalendarByIdUseCase(CalendarRepository);
        this.createNewCalendarUseCase = new CreateNewCalendarUseCase(CalendarRepository);
        this.deleteCalendarUseCase = new DeleteCalendarUseCase(CalendarRepository);
        this.updateCalendarUseCase = new UpdateCalendarUseCase(CalendarRepository);
    }

    async getAllCalendars(params: PaginationParams, filters?: CalendarFilters) {
        return await this.getAllCalendarsUseCase.execute(params, filters);
    }

    async getCalendarById(id: string) : Promise<Calendar | null> {
        return await this.getCalendarByIdUseCase.execute(id);
    }

    async createNewCalendar(calendarData : Omit<Calendar, 'id'>) : Promise<Calendar | null> {
        return await this.createNewCalendarUseCase.execute(calendarData);
    }

    async deleteCalendar(id: string) : Promise<boolean> {
        return await this.deleteCalendarUseCase.execute(id);
    }

    async updateCalendar(id: string, calendarData: Partial<Omit<Calendar, 'id'>>) : Promise<Calendar | null> {
        return await this.updateCalendarUseCase.execute(id, calendarData);
    }
}