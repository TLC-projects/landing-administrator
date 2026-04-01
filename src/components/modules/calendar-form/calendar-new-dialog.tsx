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
import { createCalendarAction } from "@lib/actions/calendar-actions";
import { toast } from "sonner";
import { VisibilityToggle } from "./visibility-toggle";
import { useLocalState } from "./lib/use-local-state";

interface CalendarNewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDate?: string;
  onSaved: (entry: Calendar) => void;
}

export function CalendarNewDialog({
  open,
  onOpenChange,
  defaultDate,
  onSaved,
}: CalendarNewDialogProps) {
  const [actionState, formAction, isLoading, reset] = useResettableActionState(
    createCalendarAction,
    { message: "", status: null, data: undefined },
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [blocked, setBlocked] = useLocalState(false);

  // Reset the form fields and blocked state when the dialog is opened
  useEffect(() => {
    if (open) {
      reset();
      setBlocked(false);
    }
  }, [open]);

  // Show success or error messages based on the action state and call the onSaved callback with the new entry
  useEffect(() => {
    if (!actionState.message) return;
    if (actionState.status === true) {
      toast.success(actionState.message, { onAutoClose: () => reset() });
      if (actionState.data) onSaved(actionState.data);
      onOpenChange(false);
    } else {
      toast.error(actionState.message)
      reset();
    }
  }, [actionState.message, actionState.status]);

  /**
   * Submits the new event form and creates a new calendar entry with the provided values.
   * Before submitting, it checks if the title and date fields are valid. If they are not, it reports their validity.
   * After submitting, it starts a transition that calls formAction with the new form data.
   */
  const handleSubmit = () => {
    if (
      !titleRef.current?.checkValidity() ||
      !dateRef.current?.checkValidity()
    ) {
      titleRef.current?.reportValidity();
      dateRef.current?.reportValidity();
      return;
    }

    // Create a new FormData object and append the title, date, and blocked status to it
    const formData = new FormData();
    formData.append("title", titleRef.current?.value ?? "");
    formData.append("date", dateRef.current?.value ?? defaultDate ?? "");
    formData.append("blocked", blocked ? "on" : "off");
    startTransition(() => formAction(formData));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo evento</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-title">Título</Label>
            <Input
              ref={titleRef}
              required
              id="new-title"
              placeholder="Ej: Cierre de inscripciones"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-date">Fecha</Label>
            <Input
              ref={dateRef}
              required
              id="new-date"
              type="date"
              defaultValue={defaultDate ?? ""}
            />
          </div>
          <VisibilityToggle blocked={blocked} onChange={setBlocked} />
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Crear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
