import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";
import { Calendar } from "@/src/core/domain/entities/Calendar";

export class GetCalendarByIdUseCase {
    constructor(private readonly calendarRepo: CalendarRepository) {}

    async execute(id: string): Promise<Calendar | null> {
        try {
            if (!id) return null;
            return await this.calendarRepo.getCalendarById(id);
        } catch (error) {
            console.log('Error to get calendar by id', error);
            return null
        }
    }
}