"use client";

import { Calendar } from "@core/domain/entities/Calendar";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@components/ui";
import { Ban, MoreHorizontal, SquarePen } from "lucide-react";
import { CalendarDeleteDialog } from "./calendar-delete-dialog";
import { CalendarEditDialog } from "../calendar-form";

interface CalendarTableActionsProps {
  calendar: Calendar;
}

export const CalendarTableActions = ({
  calendar,
}: CalendarTableActionsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [modals, setModals] = useState({
    edit: false,
    delete: false,
  });

  const handleToggleDeleteModal = () => {
    setModals((prev) => ({ ...prev, delete: !prev.delete }));
  };

  const handleToggleEditModal = () => {
    setModals((prev) => ({ ...prev, edit: !prev.edit }));
  };
  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              handleToggleEditModal();
              setIsDropdownOpen(false);
            }}
          >
            <SquarePen className="h-4 w-4 " />
            <span>Editar</span>
          </DropdownMenuItem>
          <Separator orientation="horizontal" className="h-px bg-border" />
          <DropdownMenuItem
            variant="destructive"
            aria-label="Eliminar evento"
            className="text-red-600"
            onClick={() => {
              handleToggleDeleteModal();
              setIsDropdownOpen(false);
            }}
          >
            <Ban className="h-4 w-4 text-gray-500" />
            <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {modals.delete && (
        <CalendarDeleteDialog
          isOpen={modals.delete}
          onClose={handleToggleDeleteModal}
          calendarId={calendar.id}
        />
      )}
      {modals.edit && (
        <CalendarEditDialog
          open={modals.edit}
          onOpenChange={handleToggleEditModal}
          entry={calendar}
          onDeleted={() => handleToggleEditModal()}
          onSaved={() => handleToggleEditModal()}
          fromTable
        />
      )}
    </>
  );
};
