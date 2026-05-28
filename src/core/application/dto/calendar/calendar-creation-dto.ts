export interface CreateCalendarDto {
  title: string;
  date: string;
  blocked?: boolean;
}

export interface UpdateCalendarDto {
  title?: string;
  date?: string;
  blocked?: boolean;
}
