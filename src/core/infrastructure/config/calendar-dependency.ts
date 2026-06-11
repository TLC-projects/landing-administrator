import { CalendarService } from '@core/application/services/calendar/calendar-service';
import { HttpClientFactory } from '@core/infrastructure/factories/http-client-factory';
import { CalendarRepositoryImpl } from '@core/infrastructure/repositories/calendar-repository';

// Calendar Service Initialization
export async function initializeCalendarService() {
  // Create an HTTP cliente instance using the factory
  const httpClient = await HttpClientFactory.getInstance().createHttpClient();

  // Create repository with the HTTP client
  const calendarRepository = new CalendarRepositoryImpl(httpClient);

  return new CalendarService(calendarRepository);
}

// Singleton instance of CalendarService
// This ensures that the CalenderService is initialized only once and reused throughout the application
let calendarServiceInstance: CalendarService | null = null;

export async function getCalendarService(): Promise<CalendarService> {
  if (!calendarServiceInstance) {
    calendarServiceInstance = await initializeCalendarService();
  }
  return calendarServiceInstance;
}
