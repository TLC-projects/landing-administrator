import { HttpClientFactory } from "@core/infrastructure/factories/http-client-factory";
import { CalendarRepositoryImpl } from "@core/infrastructure/repositories/calendar-repository";
import { CalendarService } from "@core/application/services/calendar/calendar-service";

export async function getCalendarDependencies() {
    const httpClient = await HttpClientFactory.getInstance().createHttpClient();

    const calendarRepository = new CalendarRepositoryImpl(httpClient);
    return new CalendarService(calendarRepository);
}

let calendarServiceInstance: CalendarService | null = null;

export async function getCalendarService(): Promise<CalendarService> {
    if (!calendarServiceInstance) {
        calendarServiceInstance = await getCalendarDependencies();
    }
    return calendarServiceInstance;
}