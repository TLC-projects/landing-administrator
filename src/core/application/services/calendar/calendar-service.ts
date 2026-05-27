import { CreateNewCalendarUseCase, DeleteCalendarUseCase, GetAllCalendarsUseCase, GetCalendarByIdUseCase, UpdateCalendarUseCase } from "@core/application/use-cases/calendar";
import { Calendar, CalendarFilters } from "@core/domain/entities/calendar";
import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";
import { PaginationParams } from "@core/domain/value-objects/pagination";

export class CalendarService {
    private getAllCalendarsUseCase: GetAllCalendarsUseCase;
    private getCalendarByIdUseCase: GetCalendarByIdUseCase;
    private createNewCalendarUseCase: CreateNewCalendarUseCase;
    private deleteCalendarUseCase: DeleteCalendarUseCase;
    private updateCalendarUseCase: UpdateCalendarUseCase;

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

    async getCalendarById(id: string): Promise<Calendar | null> {
        return await this.getCalendarByIdUseCase.execute(id);
    }

    async createNewCalendar(calendarData: Omit<Calendar, 'id'>): Promise<Calendar | null> {
        return await this.createNewCalendarUseCase.execute(calendarData);
    }

    async deleteCalendar(id: string): Promise<boolean> {
        return await this.deleteCalendarUseCase.execute(id);
    }

    async updateCalendar(id: string, calendarData: Partial<Omit<Calendar, 'id'>>): Promise<Calendar | null> {
        return await this.updateCalendarUseCase.execute(id, calendarData);
    }
}