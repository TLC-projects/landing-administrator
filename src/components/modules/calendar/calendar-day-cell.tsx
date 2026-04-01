"use client";

import { Calendar } from "@core/domain/entities/Calendar";

interface CalendarDayCellProps {
  date: string;
  day: number;
  isToday: boolean;
  entries: Calendar[];
  onClick: (date: string) => void;
  onEdit: (entry: Calendar) => void;
}

export function CalendarDayCell({
  date,
  day,
  isToday,
  entries,
  onClick,
  onEdit,
}: CalendarDayCellProps) {
  return (
    <div
      className="min-h-10 md:min-h-20 border-b border-r border-neutral-100 dark:border-neutral-800 p-1.5 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      onClick={() => onClick(date)}
    >
      <span
        className={[
          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium mb-1",
          isToday
            ? "bg-primary text-primary-foreground"
            : "text-neutral-700 dark:text-neutral-300",
        ].join(" ")}
      >
        {day}
      </span>
      <div className="flex flex-col gap-1">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
            className={[
              "w-full rounded px-1 py-0.5 text-left text-[10px] font-medium truncate lg:overflow-visible lg:whitespace-normal lg:text-clip transition-opacity hover:opacity-80",
              entry.blocked
                ? "bg-secondary-foreground/20 text-secondary-foreground"
                : "bg-primary/10 text-primary",
            ].join(" ")}
          >
            {entry.title}
          </button>
        ))}
      </div>
    </div>
  );
}
