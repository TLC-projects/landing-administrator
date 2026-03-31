import { Calendar } from "@core/domain/entities/Calendar";
import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";

export class CreateNewCalendarUseCase {
    constructor(private readonly calendarRepository: CalendarRepository) { }

    async execute(calendar: Omit<Calendar, 'id'>): Promise<Calendar | null> {
        try {
            return await this.calendarRepository.createNewCalendar(calendar);
        } catch (error) {
            console.error("Error creating new calendar:", error);
            throw new Error("Failed to create new calendar");
        }
    }
}