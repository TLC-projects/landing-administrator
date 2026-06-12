import { PaginatedCalendarResponse } from '@core/application/dto/calendar';
import { CalendarFilters } from '@/src/core/domain/entities/calendar_';
import { CalendarRepository } from '@core/domain/interfaces/calendar-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';

import { AppError } from '@/src/lib/errors';

/**
 * GetAllCalendars (Use Case)
 * This use case is responsible for retrieving a paginated list of calendars based on the provided pagination parameters and optional filters.
 * It validates the input parameters and interacts with the CalendarRepository to fetch the data.
 */
export class GetAllCalendarsUseCase {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async execute(params: PaginationParams, filters?: CalendarFilters): Promise<PaginatedCalendarResponse> {
    if (params.page < 1 || params.limit < 1) {
     throw new AppError('Page and limit must be greater than 0', 'INVALID_PAGINATION_PARAMS');
    }

    return await this.calendarRepository.getAllCalendars(params, filters);
  }
}
