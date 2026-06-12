import { UpdateCalendarDto } from '@core/application/dto/calendar';
import { CalendarRepository } from '@core/domain/interfaces/calendar-repository';
import { AppError } from '@lib/errors';

import { Calendar } from '@/src/core/domain/entities/calendar';

/**
 * Update Calendar (Use Case)
 * This use case is responsible for updating an existing calendar entry in the system.
 * It validates the input data and interacts with the CalendarRepository to perform the update.
 */
export class UpdateCalendarUseCase {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async execute(id: string, calendar: UpdateCalendarDto): Promise<Calendar | null> {
    if (!id || !calendar) throw new AppError('Calendar ID and data are required', 'MISSING_PARAMS');
    return await this.calendarRepository.updateCalendar(id, calendar);
  }
}
