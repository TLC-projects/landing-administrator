"use client"

import { useRef, type ChangeEvent } from "react"
import { Upload, ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  imagePreview: string | null
  imageFile: File | null
  isDragging: boolean
  isReadOnly?: boolean
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onRemove: () => void
}

export function ImageUpload({
  imagePreview,
  imageFile,
  isDragging,
  isReadOnly = false,
  onImageChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (isReadOnly && imagePreview) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Imagen adjunta</label>
        <div className="overflow-hidden rounded-lg border border-border/60">
          <Image
            src={imagePreview}
            alt="Imagen del contenido"
            width={800}
            height={192}
            className="h-48 w-full object-cover"
          />
        </div>
      </div>
    )
  }

  if (isReadOnly) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">Adjuntar imagen</label>

      {imagePreview ? (
        <div className="overflow-hidden rounded-lg border border-border/60">
          <div className="relative">
            <Image
              src={imagePreview}
              alt="Vista previa"
              width={800}
              height={192}
              className="h-48 w-full object-cover"
            />
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
          <div className="flex items-center gap-2 border-t border-border/60 bg-card px-4 py-2.5">
            <ImageIcon className="size-4 text-primary" />
            <span className="truncate text-sm text-foreground">{imageFile?.name || "Imagen actual"}</span>
            {imageFile && (
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                {(imageFile.size / 1024).toFixed(1)} KB
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border/60 hover:border-primary/40 hover:bg-accent/30"
          }`}
        >
          <div className="flex size-11 items-center justify-center rounded-lg bg-accent">
            <Upload className="size-5 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-foreground">
              Arrastra una imagen o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG o WebP(No más de 1 MB)</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="sr-only"
        aria-label="Seleccionar imagen"
      />
    </div>
  )
}