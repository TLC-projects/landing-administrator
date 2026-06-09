'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@components/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@components/ui/dialog';
import { deleteContent } from '@lib/actions/content-actions';

interface ContentProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  sectionId: string;
}

export const ContentDeleteDialog = ({ isOpen, onClose, contentId, sectionId }: ContentProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);

    await deleteContent(contentId, sectionId);

    toast.success('Contenido eliminado correctamente.');
    onClose();

    router.push(`/sections/${sectionId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro que deseas eliminar este contenido?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará de forma permanente el contenido.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleDelete}>
            {isSubmitting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
