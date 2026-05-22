"use client";

import { getFileNameFromUrl, getFileType } from "@lib/utils";
import { X, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import Image from "next/image";

interface FilePreviewProps {
  filePreview: string | null;
  file: File | null;
  onRemove: () => void;
}

export function FilePreview({ filePreview, file, onRemove }: FilePreviewProps) {
  const { isPDF, isImage } = getFileType(file, filePreview);
  const fileName = file?.name || getFileNameFromUrl(filePreview || '');

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-lg border border-border/60">
        <div className="relative">
          {isImage ? (
            <div className="relative h-48 w-full bg-muted/30">
              <Image
                src={filePreview!}
                alt="Vista previa del brochure"
                fill
                className="object-contain p-4"
              />
            </div>
          ) : isPDF ? (
            <div className="flex items-center gap-4 bg-card p-6">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-accent">
                <FileText className="size-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {fileName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Documento PDF"}
                </p>
                {!file && filePreview && (
                  <a
                    href={filePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    Ver archivo actual
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          ) : null}
          
          {/* Overlay con botón eliminar */}
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all hover:bg-foreground/40 hover:opacity-100">
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg transition-transform hover:scale-105"
            >
              <X className="size-4" />
              Eliminar
            </button>
          </div>
        </div>
        
        {/* Footer con info del archivo */}
        {file && (
          <div className="flex items-center justify-between gap-2 border-t border-border/60 bg-card px-4 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              {isPDF ? (
                <FileText className="size-4 shrink-0 text-primary" />
              ) : (
                <ImageIcon className="size-4 shrink-0 text-primary" />
              )}
              <span className="truncate text-sm text-foreground">{fileName}</span>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        )}
      </div>
    </div>
  );
}