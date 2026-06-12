import { Calendar } from '@/src/core/domain/entities/calendar_';
import { CalendarRepository } from '@core/domain/interfaces/calendar-repository';
import { AppError } from '@lib/errors';

/**
 * Get Calendar By ID (Use Case)
 * This use case is responsible for retrieving a calendar entry by its ID.
 * It validates the input data and interacts with the CalendarRepository to fetch the calendar.
 */
export class GetCalendarByIdUseCase {
  constructor(private readonly calendarRepo: CalendarRepository) {}

  async execute(id: string): Promise<Calendar | null> {
    if (!id) throw new AppError('Calendar ID is required', 'MISSING_PARAMS');
    return await this.calendarRepo.getCalendarById(id);
  }
}
