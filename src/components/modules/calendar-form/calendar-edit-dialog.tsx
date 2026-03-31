"use client";

import { startTransition, useEffect, useRef } from "react";
import { Calendar } from "@core/domain/entities/Calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Button, Input, Label } from "@components/ui";
import { useResettableActionState } from "@/src/hooks/use-resettable-action-state";
import {
  updateCalendarAction,
  deleteCalendarAction,
} from "@lib/actions/calendar-actions";
import { toast } from "sonner";
import { VisibilityToggle } from "./visibility-toggle";
import { useLocalState } from "./lib/use-local-state";

interface CalendarEditDialogProps {
  open: boolean;
  fromTable?: boolean;
  onOpenChange: (open: boolean) => void;
  entry: Calendar;
  onDeleted: (id: string) => void;
  onSaved: (entry: Calendar) => void;
}

export function CalendarEditDialog({
  open,
  fromTable = false,
  onOpenChange,
  entry,
  onDeleted,
  onSaved,
}: CalendarEditDialogProps) {
  const updateWithId = updateCalendarAction.bind(null, entry.id);

  const [actionState, formAction, isLoading, reset] = useResettableActionState(
    updateWithId,
    { message: "", status: null, data: undefined },
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [blocked, setBlocked] = useLocalState(entry.blocked);

  useEffect(() => {
    if (open) {
      reset();
      setBlocked(entry.blocked);
    }
  }, [open, entry]);

  useEffect(() => {
    if (!actionState.message) return;
    if (actionState.status === true) {
      toast.success(actionState.message, { onAutoClose: () => reset() });
      if (actionState.data) onSaved(actionState.data);
      onOpenChange(false);
    } else {
      toast.error(actionState.message);
    }
  }, [actionState.message, actionState.status]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", titleRef.current?.value ?? "");
    formData.append("date", dateRef.current?.value ?? "");
    formData.append("blocked", blocked ? "on" : "off");
    startTransition(() => formAction(formData));
  };

  const handleDelete = async () => {
    const result = await deleteCalendarAction(entry.id);
    if (result.status) {
      toast.success(result.message);
      onDeleted(entry.id);
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar evento</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-title">Título</Label>
            <Input
              ref={titleRef}
              id="edit-title"
              placeholder="Ej: Cierre de inscripciones"
              defaultValue={entry.title}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-date">Fecha</Label>
            <Input
              ref={dateRef}
              id="edit-date"
              type="date"
              defaultValue={entry.date?.slice(0, 10)}
            />
          </div>
          <VisibilityToggle blocked={blocked ?? false} onChange={setBlocked} />
        </div>
        <DialogFooter className="gap-2">
          {fromTable ? (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Eliminando..." : "Eliminar"}
            </Button>
          )}

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
