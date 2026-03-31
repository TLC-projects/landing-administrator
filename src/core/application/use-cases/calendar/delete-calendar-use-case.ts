import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";

export class DeleteCalendarUseCase {
    constructor(private readonly calendarRepository: CalendarRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            if (!id) return false;
            return await this.calendarRepository.deleteCalendar(id);
        } catch (error) {
            console.log('Error to delete calendar', error);
            return false;
        }
    }
}