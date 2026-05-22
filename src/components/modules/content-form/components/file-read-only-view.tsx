"use client";

import { FileText, Image as ImageIcon, FileX, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getFileType, getFileNameFromUrl } from "@lib/utils";

interface FileReadOnlyViewProps {
  filePreview: string | null;
  file: File | null;
}

export function FileReadOnlyView({ filePreview, file }: FileReadOnlyViewProps) {
  const { isPDF, isImage } = getFileType(file, filePreview);
  const fileName = file?.name || (filePreview ? getFileNameFromUrl(filePreview) : '');

  // Sin archivo
  if (!filePreview) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Brochure adjunto</label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border/40 bg-muted/30 px-6 py-10">
          <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
            <FileX className="size-6 text-muted-foreground" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              Sin brochure adjunto
            </p>
            <p className="text-xs text-muted-foreground/70">
              Este contenido no tiene un brochure asociado
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Con archivo
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">Brochure adjunto</label>
      <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
        {isImage ? (
          <>
            <div className="relative h-48 w-full bg-muted/30">
              <Image
                src={filePreview}
                alt="Brochure preview"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-border/60 bg-card px-4 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <ImageIcon className="size-4 shrink-0 text-primary" />
                <span className="truncate text-sm text-foreground">{fileName}</span>
              </div>
              <a
                href={filePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-primary hover:text-primary/80 transition-colors"
                title="Abrir en nueva pestaña"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </>
        ) : isPDF ? (
          <div className="flex items-center gap-4 p-6">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-accent">
              <FileText className="size-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {fileName}
              </p>
              <p className="text-sm text-muted-foreground">
                Documento PDF
              </p>
              <a
                href={filePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
              >
                Abrir archivo
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}