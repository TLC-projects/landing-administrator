"use client";

import { LayoutGrid, Table2 } from "lucide-react";

type ViewMode = "calendar" | "table";

interface CalendarViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function CalendarViewToggle({ view, onChange }: CalendarViewToggleProps) {
  return (
    <div className="flex overflow-hidden rounded-md border border-input">
      <button
        onClick={() => onChange("calendar")}
        className={[
          "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors border-r border-input",
          view === "calendar"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted",
        ].join(" ")}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Calendario
      </button>
      <button
        onClick={() => onChange("table")}
        className={[
          "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors",
          view === "table"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted",
        ].join(" ")}
      >
        <Table2 className="h-3.5 w-3.5" />
        Tabla
      </button>
    </div>
  );
}