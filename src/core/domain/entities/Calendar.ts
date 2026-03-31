export interface CalendarFilters {
    search?: string;
    blocked?: boolean
}

export interface Calendar {
    id: string;
    title: string;
    date: string;
    blocked?: boolean;
}