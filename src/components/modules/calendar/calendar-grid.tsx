"use client";

import { Calendar } from "@core/domain/entities/Calendar";
import { CalendarDayCell } from "./calendar-day-cell";

const DAYS = [
  { short: "D", long: "Dom" },
  { short: "L", long: "Lun" },
  { short: "M", long: "Mar" },
  { short: "X", long: "Mié" },
  { short: "J", long: "Jue" },
  { short: "V", long: "Vie" },
  { short: "S", long: "Sáb" },
];

interface CalendarGridProps {
  entries: Calendar[];
  current: { year: number; month: number };
  onDayClick: (dateStr: string) => void;
  onEditEntry: (entry: Calendar) => void;
}

export function CalendarGrid({
  entries,
  current,
  onDayClick,
  onEditEntry,
}: CalendarGridProps) {
  const today = new Date();

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  // Group entries by date for easier access when rendering the cells
  const entriesByDate = entries
    .filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === current.year && d.getMonth() === current.month;
    })
    .reduce<Record<string, Calendar[]>>((acc, e) => {
      const key = e.date.slice(0, 10);
      acc[key] = [...(acc[key] ?? []), e];
      return acc;
    }, {});

  const emptyCells = Array.from({ length: firstDay }, (_, i) => (
    <div
      key={`empty-${i}`}
      className="min-h-10 md:min-h-20 border-b border-r border-neutral-100 dark:border-neutral-800"
    />
  ));

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${current.year}-${String(current.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday =
      day === today.getDate() &&
      current.month === today.getMonth() &&
      current.year === today.getFullYear();
    return (
      <CalendarDayCell
        key={dateStr}
        date={dateStr}
        day={day}
        isToday={isToday}
        entries={entriesByDate[dateStr] ?? []}
        onClick={onDayClick}
        onEdit={onEditEntry}
      />
    );
  });

  return (
    <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-700">
        {DAYS.map((d) => (
          <div
            key={d.long}
            className="py-2 text-center text-xs font-medium ..."
          >
            <span className="md:hidden">{d.short}</span>
            <span className="hidden md:inline">{d.long}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{[...emptyCells, ...dayCells]}</div>
    </div>
  );
}
