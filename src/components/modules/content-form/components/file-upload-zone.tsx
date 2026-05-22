"use client";

import { FileUp } from "lucide-react";
import { type ChangeEvent, type RefObject } from "react";

interface FileUploadZoneProps {
  isDragging: boolean;
  maxSizeMB: number;
  acceptedFormats: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadZone({
  isDragging,
  maxSizeMB,
  acceptedFormats,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
}: FileUploadZoneProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border/60 hover:border-primary/50 hover:bg-accent/50"
        }`}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-accent">
          <FileUp className="size-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Arrastra tu archivo aquí o haz clic para seleccionar
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF o imágenes (máx. {maxSizeMB}MB)
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={onFileChange}
        className="sr-only"
        aria-label="Seleccionar brochure"
      />
    </div>
  );
}