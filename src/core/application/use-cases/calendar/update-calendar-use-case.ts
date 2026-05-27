import { Calendar } from "@/src/core/domain/entities/calendar";
import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";

export class UpdateCalendarUseCase {
    constructor(private readonly calendarRepository: CalendarRepository) { }

    async execute(id: string, calendar: Partial<Omit<Calendar, 'id'>>): Promise<Calendar | null> {
        try {
            if (!id || !calendar) return null;
            return await this.calendarRepository.updateCalendar(id, calendar);
        } catch (error) {
            console.error('Error updating calendar:', error);
            throw new Error("Failed to update calendar");
        }
    }
}