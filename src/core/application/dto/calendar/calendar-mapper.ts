import { Calendar } from "@core/domain/entities/calendar";

import { CalendarDto } from "./calendar-response-dto";


export class CalendarMapper {
    static toCalendars(events: CalendarDto[]): Calendar[] {
        return events.map(event => this.toCalendar(event))
    }

    static toCalendar(event: CalendarDto): Calendar {
        return {
            id: event.id,
            title: event.title,
            date: event.date,
            blocked: event.blocked === 1
        }
    }
}