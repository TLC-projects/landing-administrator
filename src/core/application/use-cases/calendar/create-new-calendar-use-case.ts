import { CreateCalendarDto } from '@core/application/dto/calendar';
import { Calendar } from '@/src/core/domain/entities/calendar_';
import { CalendarRepository } from '@core/domain/interfaces/calendar-repository';
import { AppError } from '@lib/errors';

/**
 * Create Calendar (Use Case)
 * This use case is responsible for creating a new calendar entry in the system. 
 * It validates the input data and interacts with the CalendarRepository to persist the new calendar.
 */
export class CreateNewCalendarUseCase {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async execute(calendar: CreateCalendarDto): Promise<Calendar | null> {
    if (!calendar) throw new AppError('Calendar data is required', 'MISSING_PARAMS');
    return await this.calendarRepository.createNewCalendar(calendar);
  }
}
