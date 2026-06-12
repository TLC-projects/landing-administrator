import { CalendarMapper, CreateCalendarDto, UpdateCalendarDto } from '@core/application/dto/calendar';
import {
  CalendarDto,
  CalendarServerResponseDto,
  PaginatedCalendarResponse
} from '@core/application/dto/calendar/calendar-response-dto';
import { Calendar, CalendarFilters } from '@/src/core/domain/entities/calendar';
import { CalendarRepository } from '@core/domain/interfaces/calendar-repository';
import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { PaginationParams } from '@core/domain/value-objects/pagination';
import { AppError, unwrap } from '@lib/errors';

export class CalendarRepositoryImpl implements CalendarRepository {
  private baseUrl: string;
  private httpClient: HttpRepository<CalendarServerResponseDto>;

  constructor(httpClient: HttpRepository<CalendarServerResponseDto>) {
    this.baseUrl = 'calendar';
    this.httpClient = httpClient;
  }

  /**
   * Retrieves a list of calendars based on the given pagination parameters.
   *
   * @param {PaginationParams} params The pagination parameters to use for the request.
   * @param {CalendarFilters} filters The search filter to use for the request.
   * @returns {Promise<PaginatedCalendarResponse | null>} A promise that resolves to a paginated calendar response.
   * @throws {Error} If the request fails or if the pagination parameters are invalid.
   */
  async getAllCalendars(params: PaginationParams, filters?: CalendarFilters): Promise<PaginatedCalendarResponse> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString()
    });

    if (filters) {
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.blocked !== undefined) queryParams.append('blocked', String(filters.blocked));
    }

    const response = unwrap(await this.httpClient.get(`${this.baseUrl}?${queryParams.toString()}`));

    if (!response || !Array.isArray(response.data)) {
      return {
        data: [],
        total: 0,
        page: params.page,
        limit: params.limit
      };
    }

    // Map the response data to Calendar entities using the CalendarMapper
    const calendar = response.data.map((event) => CalendarMapper.toCalendar(event));

    return {
      data: calendar,
      total: response.total || 0,
      page: response.page || params.page,
      limit: response.limit || params.limit
    };
  }

  /**
   * Retrieves a calendar by its ID.
   * @param id  The ID of the calendar to retrieve.
   * @returns  A promise that resolves to the calendar with the specified ID, or null if not found.
   * @throws  An error if the request fails or if the ID is invalid.
   */
  async getCalendarById(id: string): Promise<Calendar | null> {
    const response = unwrap(await this.httpClient.get(`${this.baseUrl}/${id}`));
    if (!response || !response.data) return null;

    return CalendarMapper.toCalendar(response.data as CalendarDto);
  }

  /**
   * Creates a new calendar with the provided data.
   * @param calendarData  The data for the new calendar, excluding the ID.
   * @returns  A promise that resolves when the creation is complete.
   */
  async createNewCalendar(calendar: CreateCalendarDto): Promise<Calendar | null> {
    const { title, date, blocked } = calendar;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('blocked', String(blocked));

    const response = unwrap(await this.httpClient.post(this.baseUrl, formData));

    if (!response || !response.data) return null;

    return CalendarMapper.toCalendar(response.data as CalendarDto);
  }

  /**
   *  Updates an existing calendar with the provided data.
   * @param id  The ID of the calendar to update.
   * @param calendar The data to update the calendar with, excluding the ID.
   * @return  A promise that resolves when the update is complete.
   */
  async updateCalendar(id: string, calendar: UpdateCalendarDto): Promise<Calendar | null> {
    const formData = new FormData();

    if (calendar.title) formData.append('title', calendar.title);
    if (calendar.date) formData.append('date', calendar.date);
    if (calendar.blocked !== undefined) formData.append('blocked', String(calendar.blocked));

    const response = unwrap(await this.httpClient.put(`${this.baseUrl}/${id}`, formData));

    if (!response || !response.data) return null;

    return CalendarMapper.toCalendar(response.data as CalendarDto);
  }

  /**
   *  Deletes a calendar by its ID.
   * @param id  The ID of the calendar to delete.
   * @returns  A promise that resolves when the deletion is complete.
   * @throws  An error if the request fails or if the ID is invalid.
   */
  async deleteCalendar(id: string): Promise<void> {
    if (!id) throw new AppError('Invalid calendar ID', 'INVALID_ID');
    unwrap(await this.httpClient.delete(`${this.baseUrl}/${id}`));
  }
}
