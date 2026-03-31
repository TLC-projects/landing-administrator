"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Plus, ChevronLeft, ChevronRight, FunnelX } from "lucide-react";
import { Button, Card, CardContent, SearchBar } from "@/src/components/ui";
import { Calendar } from "@core/domain/entities/Calendar";
import { CalendarFilter } from "./calendar-filter";
import { CalendarViewToggle } from "./calendar-view-toggle";
import { CalendarNewDialog } from "../calendar-form/calendar-new-dialog";
import { useDebouncedCallback } from "use-debounce";
import { CalendarGrid } from "./calendar-grid";
import { CalendarTable } from "../calendar-table";
import { CalendarEditDialog } from "../calendar-form";

type ViewMode = "calendar" | "table";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface CalendarContainerProps {
  entries: Calendar[];
  initialSearch?: string;
  initialBlocked?: boolean;
  pageInfo: {
    total: number;
    page: number;
    limit: number;
  };
}

export function CalendarContainer({
  entries: initialEntries,
  initialSearch = "",
  pageInfo,
}: CalendarContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const today = new Date();
  const [view, setView] = useState<ViewMode>("table");
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [entries, setEntries] = useState<Calendar[]>(initialEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [editingEntry, setEditingEntry] = useState<Calendar | undefined>();

  const hasActiveFilters = !!(initialSearch || searchParams.get("blocked"));
  const isEmptyDatabase = entries.length === 0 && !hasActiveFilters;
  const noFilterResults = entries.length === 0 && hasActiveFilters;

  // --- Handlers ---

  const prevMonth = () =>
    setCurrent((prev) => ({
      year: prev.month === 0 ? prev.year - 1 : prev.year,
      month: prev.month === 0 ? 11 : prev.month - 1,
    }));

  const nextMonth = () =>
    setCurrent((prev) => ({
      year: prev.month === 11 ? prev.year + 1 : prev.year,
      month: prev.month === 11 ? 0 : prev.month + 1,
    }));

  const openNewDialog = () => {
    setEditingEntry(undefined);
    setSelectedDate(undefined);
    setDialogOpen(true);
  };

  const handleEditEntry = (entry: Calendar) => {
    setEditingEntry(entry);
    setSelectedDate(entry.date.slice(0, 10));
    setDialogOpen(true);
  };

  const handleDayClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setEditingEntry(undefined);
    setDialogOpen(true);
  };

  const handleSaved = (entry: Calendar) => {
    setEntries((prev) => {
      const exists = prev.find((e) => e.id === entry.id);
      return exists
        ? prev.map((e) => (e.id === entry.id ? entry : e))
        : [...prev, entry];
    });
  };

  const handleDeleted = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // --- Render ---

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  return (
    <div className="space-y-4">
      {/* Toolbar — siempre visible */}
      <div className="space-y-2.5 border shadow rounded-md px-3 pt-5 pb-3 flex flex-col md:flex-row items-start gap-4">
        <SearchBar
          className="md:max-w-7xl"
          placeholder="Buscar por nombre del evento ..."
        />
        <div className="flex items-center gap-2 ml-auto">
          <CalendarFilter />
        </div>
      </div>

      <div className="flex justify-end">
        <CalendarViewToggle view={view} onChange={setView} />
      </div>

      {/* Estado vacío — sin datos en DB */}
      {isEmptyDatabase ? (
        <Card className="w-full">
          <CardContent className="flex h-64 flex-col items-center justify-center space-y-5 text-center">
            <div className="flex items-center rounded-full bg-muted p-4">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold">
                Aún no hay eventos en el calendario
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Empieza agregando tu primer evento. Podrás organizarlo, editarlo
                y gestionarlo desde aquí.
              </p>
            </div>
            <Button onClick={openNewDialog}>
              <Plus className="h-4 w-4" />
              <span>Crear primer evento</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Nav mes + toggle vista + nuevo evento */}
          <div className="flex items-center justify-between">
            {view === "calendar" ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="min-w-36 text-center text-sm font-semibold">
                  {MONTHS[current.month]} {current.year}
                </span>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-2">
              <Button onClick={openNewDialog}>
                <Plus className="h-4 w-4 mr-1" /> Nuevo evento
              </Button>
            </div>
          </div>

          {/* Sin resultados por filtros */}
          {noFilterResults ? (
            <Card className="w-full">
              <CardContent className="flex h-64 flex-col items-center justify-center space-y-5 text-center">
                <div className="flex items-center rounded-full bg-muted p-4">
                  <FunnelX className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="max-w-sm text-sm text-muted-foreground">
                  No se encontraron eventos con los filtros aplicados.
                </p>
              </CardContent>
            </Card>
          ) : view === "calendar" ? (
            <CalendarGrid
              entries={entries}
              current={current}
              onDayClick={handleDayClick}
              onEditEntry={handleEditEntry}
            />
          ) : (
            <CalendarTable
              entries={entries}
              pageInfo={pageInfo}
            />
          )}
        </>
      )}

      <CalendarNewDialog
        open={dialogOpen && !editingEntry}
        onOpenChange={setDialogOpen}
        defaultDate={selectedDate}
        onSaved={handleSaved}
      />
      {editingEntry && (
        <CalendarEditDialog
          open={dialogOpen && !!editingEntry}
          onOpenChange={setDialogOpen}
          entry={editingEntry}
          onDeleted={handleDeleted}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
