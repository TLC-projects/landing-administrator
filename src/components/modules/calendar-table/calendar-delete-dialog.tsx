"use client";

import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@components/ui/dialog";
import { Button } from "@components/ui";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCalendarAction } from "@/src/lib/actions/calendar-actions";

interface CalendarDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  calendarId: string;
}

export const CalendarDeleteDialog = ({
  isOpen, onClose, calendarId,
}: CalendarDeleteDialogProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const result = await deleteCalendarAction(calendarId);
      if (result.status) {
        toast.success(result.message);
        onClose();
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Estás seguro que deseas eliminar este evento del calendario?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará de forma permanente
            el evento.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};