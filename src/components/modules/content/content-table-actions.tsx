"use client";

import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@components/ui";
import { Ban, Eye, MoreHorizontal, SquarePen } from "lucide-react";
import Link from "next/link";
import { ContentDeleteDialog } from "./content-delete-dialog";
import { Content } from "./content-table";

interface ContentTableActionsProps {
  content: Content;
}

export const ContentTableActions = ({
  content,
}: ContentTableActionsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [modals, setModals] = useState({
    edit: false,
    delete: false,
  });

  const handleToggleDeleteModal = () => {
    setModals((prev) => ({ ...modals, delete: !prev.delete }));
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
          <DropdownMenuItem asChild>
            <Link
              href={`/sections/${content.sectionId}/${content.id}`}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4 " />
              <span>Ver</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/sections/${content.sectionId}/${content.id}/edit`}
              className="flex items-center gap-2"
            >
              <SquarePen className="h-4 w-4 " />
              <span>Editar</span>
            </Link>
          </DropdownMenuItem>
          <Separator orientation="horizontal" className="h-px bg-border" />
          <DropdownMenuItem
            variant="destructive"
            aria-label="Eliminar recurso"
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
        <ContentDeleteDialog
          isOpen={modals.delete}
          onClose={handleToggleDeleteModal}
          contentId={content.id.toString()}
          sectionId={content.sectionId.toString()}
        />
      )}
    </>
  );
};
