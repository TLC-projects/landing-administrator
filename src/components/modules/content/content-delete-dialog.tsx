"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Button } from "@components/ui";
import { deleteContent } from "@lib/actions/content-actions";
import { useState } from "react";
import { toast } from "sonner";

interface ContentProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  projectId: string;
  sectionId: string;
}
export const ContentDeleteDialog = ({
  isOpen,
  onClose,
  contentId,
  projectId,
  sectionId,
}: ContentProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsSubmitting(true);
    setError(null);

    const result = await deleteContent(contentId, projectId, sectionId);

    if (result?.error) {
      setError(result.error);
      toast.error(error);
      setIsSubmitting(false);
    }

    toast.success("Contenido eliminado correctamente.");
    onClose();

    router.push(`/projects/${projectId}/${sectionId}`);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Estás seguro que deseas eliminar este contenido?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará de forma permanente
            el contenido.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleDelete}>
            {isSubmitting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
