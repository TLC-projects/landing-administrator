"use client";

import { useRef, type ChangeEvent } from "react";
import { toast } from "sonner";
import { FileReadOnlyView } from "./file-read-only-view";
import { FilePreview } from "./file-preview";
import { FileUploadZone } from "./file-upload-zone";

interface FileUploadProps {
  filePreview: string | null;
  file: File | null;
  isDragging: boolean;
  isReadOnly?: boolean;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemove: () => void;
  acceptedFormats?: string;
  maxSizeMB?: number;
}

export function FileUpload({
  filePreview,
  file,
  isDragging,
  isReadOnly = false,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
  acceptedFormats = ".pdf,.jpg,.jpeg,.png,.webp",
  maxSizeMB = 10,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validar archivo
  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast.error("Formato no válido", {
        description: "Solo se permiten archivos PDF, JPG, PNG o WebP"
      });
      return false;
    }

    if (file.size > maxSizeBytes) {
      toast.error("Archivo muy grande", {
        description: `El archivo debe ser menor a ${maxSizeMB}MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      });
      return false;
    }

    return true;
  };

  // Handler mejorado para cambio de archivo
  const handleFileChangeWithValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        onFileChange(e);
        toast.success("Archivo cargado", {
          description: `${selectedFile.name} se ha cargado correctamente`
        });
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  // Handler mejorado para drop
  const handleDropWithValidation = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragLeave(e);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (validateFile(droppedFile)) {
        onDrop(e);
        toast.success("Archivo cargado", {
          description: `${droppedFile.name} se ha cargado correctamente`
        });
      }
    }
  };

  // Handler mejorado para eliminar
  const handleRemoveWithFeedback = () => {
    const fileName = file?.name || "Archivo";
    onRemove();
    toast.info("Archivo eliminado", {
      description: `${fileName} se ha eliminado de la vista previa`
    });
  };

  // Modo solo lectura
  if (isReadOnly) {
    return (
      <FileReadOnlyView 
        filePreview={filePreview} 
        file={file}
      />
    );
  }

  // Modo edición/creación CON archivo (vista previa)
  if (filePreview || file) {
    return (
      <FilePreview
        filePreview={filePreview}
        file={file}
        onRemove={handleRemoveWithFeedback}
      />
    );
  }

  // Modo edición/creación SIN archivo (zona de carga)
  return (
    <FileUploadZone
      isDragging={isDragging}
      maxSizeMB={maxSizeMB}
      acceptedFormats={acceptedFormats}
      fileInputRef={fileInputRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDropWithValidation}
      onFileChange={handleFileChangeWithValidation}
    />
  );
}