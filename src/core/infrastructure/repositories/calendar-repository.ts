import { CalendarRepository } from "@core/domain/interfaces/calendar-repository";
import { CalendarDto, CalendarServerResponseDto, PaginatedCalendarEntityResponse } from "@core/application/dto/calendar-dto";
import { HttpRepository } from "@core/domain/interfaces/http-repository";
import { Calendar, CalendarFilters } from "@core/domain/entities/Calendar";
import { PaginationParams } from "@core/domain/value-objects/pagination";
import { revalidatePath } from "next/cache";

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
     * @returns {Promise<PaginatedCalendarEntityResponse | null>} A promise that resolves to a paginated calendar response.
     * @throws {Error} If the request fails or if the pagination parameters are invalid.
     */
    async getAllCalendars(params: PaginationParams, filters?: CalendarFilters): Promise<PaginatedCalendarEntityResponse | null> {
        try {
            let url = `${this.baseUrl}?page=${params.page}&limit=${params.limit}`;

            if (filters) {
                const params = new URLSearchParams();
                if (filters.search) params.set("search", filters.search);
                if (filters.blocked !== undefined) params.set("blocked", String(filters.blocked));
                url += `&${params.toString()}`;
            }

            const response = await this.httpClient.get(url);
            if (!response || !Array.isArray(response.data)) {
                return null;
            }

            const paginatedResponse: PaginatedCalendarEntityResponse = {
                data: response.data,
                page: response.page || params.page,
                limit: response.limit || params.limit,
                total: response.total || 0
            };

            return paginatedResponse;

        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}:`, error);
            throw error instanceof Error ? error : new Error('Error in GET');
        }
    }

    /**
     *  Retrieves a calendar by its ID.
     * @param id  The ID of the calendar to retrieve.
     * @returns  A promise that resolves to the calendar with the specified ID, or null if not found.
     * @throws  An error if the request fails or if the ID is invalid.
     */
    async getCalendarById(id: string): Promise<Calendar | null> {
        try {
            const response = await this.httpClient.get(`${this.baseUrl}/${id}`);

            if (!response || !response.data) {
                return null;
            }

            return response.data as CalendarDto;
        } catch (error) {
            console.error(`Error in GET ${this.baseUrl}/${id}:`, error);
            throw error instanceof Error ? error : new Error('Error in GET');
        }
    }

    /**
     *  Creates a new calendar with the provided data.
     * @param calendarData  The data for the new calendar, excluding the ID.
     * @returns  A promise that resolves to the created calendar, or null if creation fails.
     * @throws  An error if the request fails or if the calendar data is invalid.
     */
    async createNewCalendar(calendarData: Omit<Calendar, 'id'>): Promise<Calendar | null> {
        try {
            const formData = new FormData();
            formData.append('title', calendarData.title);
            formData.append('date', calendarData.date);
            formData.append('blocked', String(calendarData.blocked));

            const response = await this.httpClient.post(`${this.baseUrl}`, formData);
            if (!response || !response.data) {
                return null;
            }

            return response.data as CalendarDto;

        } catch (error) {
            console.error(`Error in POST ${this.baseUrl}:`, error);
            throw error instanceof Error ? error : new Error('Error in POST');
        }
    }

    /**
     *  Updates an existing calendar with the provided data.
     * @param id  The ID of the calendar to update.
     * @param calendarData  The data to update the calendar with, excluding the ID. Only provided fields will be updated.
     * @returns  A promise that resolves when the update is complete.
     * @throws  An error if the request fails, if the ID is invalid, or if the calendar data is invalid.
     */
    async updateCalendar(id: string, calendarData: Partial<Omit<Calendar, 'id'>>): Promise<Calendar | null> {
        try {
            const formData = new FormData();

            if (calendarData.title) formData.append('title', calendarData.title);
            if (calendarData.date) formData.append('date', calendarData.date);
            if (calendarData.blocked !== undefined) formData.append('blocked', String(calendarData.blocked));

            const response = await this.httpClient.put(`${this.baseUrl}/${id}`, formData);

            if (!response || !response.data) {
                return null;
            }
            return response.data as CalendarDto;
        } catch (error) {
            console.error(`Error in PUT ${this.baseUrl}/${id}:`, error);
            throw error instanceof Error ? error : new Error('Error in PUT');
        }
    }

    /**
     *  Deletes a calendar by its ID.
     * @param id  The ID of the calendar to delete.
     * @returns  A promise that resolves to true if the calendar was successfully deleted, or false if deletion fails.
     * @throws  An error if the request fails or if the ID is invalid.
     */
    async deleteCalendar(id: string): Promise<boolean> {
        try {
            await this.httpClient.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error in DELETE ${this.baseUrl}/${id}:`, error);
            throw error instanceof Error ? error : new Error('Error in DELETE');
        }
    }
}