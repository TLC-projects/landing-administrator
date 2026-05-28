import { CalendarRepository } from '@core/domain/interfaces/calendar-repository';
import { AppError } from '@lib/errors';

/**
 * Delete Calendar (Use Case)
 * This use case is responsible for deleting a calendar entry from the system.
 * It validates the input data and interacts with the CalendarRepository to perform the deletion.
 */
export class DeleteCalendarUseCase {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new AppError('Calendar ID is required', 'MISSING_PARAMS');
    await this.calendarRepository.deleteCalendar(id);
  }
}
