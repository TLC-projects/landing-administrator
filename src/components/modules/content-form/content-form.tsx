"use client";

import { useState } from "react";
import {
  Clock,
  FileText,
  Eye,
  EyeOff,
  Save,
  Edit,
  X,
  ChevronLeft,
} from "lucide-react";
import { Switch, Input, Textarea, Button } from "@/src/components/ui";
import { ImageUpload } from "./image-upload";
import { useContentForm } from "./hooks/use-content-form";
import { createContent, updateContent } from "@lib/actions/content-actions";
import type { Content, ContentFormModes } from "./types/content";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Error from "../../../app/(dashboard)/projects/[projectId]/[sectionId]/[contentId]/error";
import { toast } from "sonner";

interface ContentFormProps {
  projectId: string;
  sectionId: string;
  mode?: ContentFormModes;
  content?: Content | null;
}

export function ContentForm({
  projectId,
  sectionId,
  mode = "create",
  content = null,
}: ContentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    title,
    setTitle,
    duration,
    setDuration,
    description,
    setDescription,
    imageFile,
    imagePreview,
    isVisible,
    setIsVisible,
    isDragging,
    isEditing,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeImage,
    resetForm,
    toggleEditMode,
    cancelEdit,
  } = useContentForm({ mode, initialData: content });

  const charLimit = 1000;
  const charPercent = Math.min((description.length / charLimit) * 100, 100);
  const isViewMode = mode === "view" && !isEditing;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("sectionId", sectionId);
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("description", description);
    formData.append("isVisible", String(isVisible));
    if (imageFile) formData.append("image", imageFile);

    const isUpdate =
      mode === "edit" || (mode === "view" && isEditing && content?.id);
    const result = isUpdate
      ? await updateContent(content!.id, formData)
      : await createContent(formData);

    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setIsSubmitting(false);
    } else if (mode === "create") {
      resetForm();
    }

    toast.success(
      isUpdate
        ? "Contenido actualizado correctamente"
        : "Contenido creado correctamente",
    );

    router.push(`/projects/${projectId}/${sectionId}`);
  };

  // URL de cancelacion/vuelta
  const cancelUrl = `/projects/${projectId}/${sectionId}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:w-3/5">
      {/* Header co boton de accion para modo view */}
      {mode === "view" && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl  tracking-tight">
              {isEditing ? "Editar contenido" : "Detalles del contenido"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isEditing
                ? "Modifica los campos necesarios"
                : "Visualiza la información del contenido"}
            </p>
          </div>
          {!isEditing && (
            <Button
              type="button"
              onClick={toggleEditMode}
              variant="outline"
              className="gap-2"
            >
              <Edit className="size-4" />
              Editar
            </Button>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <FileText className="size-3.5 text-primary" />
              Título del contenido
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Ej: Métodos de Evaluación Formativa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isViewMode}
              className="h-10 border-border/60 bg-card transition-all focus-visible:border-primary focus-visible:ring-primary/20 disabled:cursor-default disabled:opacity-100"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="duration"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Clock className="size-3.5 text-primary" />
              Duración
            </label>
            <Input
              id="duration"
              name="duration"
              placeholder="Ej: 20 Horas"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              disabled={isViewMode}
              className="h-10 border-border/60 bg-card transition-all focus-visible:border-primary focus-visible:ring-primary/20 disabled:cursor-default disabled:opacity-100"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Descripción
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe el contenido, objetivos y recursos necesarios..."
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= charLimit) {
                setDescription(e.target.value);
              }
            }}
            required
            disabled={isViewMode}
            className="min-h-32 resize-none border-border/60 bg-card transition-all focus-visible:border-primary focus-visible:ring-primary/20 disabled:cursor-default disabled:opacity-100"
            rows={5}
          />
          {!isViewMode && (
            <div className="flex items-center justify-between">
              <div className="h-1 w-24 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${charPercent}%` }}
                />
              </div>
              <span
                className={`text-xs ${
                  description.length >= charLimit
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {description.length}/{charLimit}
              </span>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <ImageUpload
          imagePreview={imagePreview}
          imageFile={imageFile}
          isDragging={isDragging}
          isReadOnly={isViewMode}
          onImageChange={handleImageChange}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onRemove={removeImage}
        />

        {/* Visibility */}
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-accent">
              {isVisible ? (
                <Eye className="size-4 text-primary" />
              ) : (
                <EyeOff className="size-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="visibility"
                className="text-sm font-medium text-foreground"
              >
                Visibilidad del contenido
              </label>
              <span className="text-xs text-muted-foreground">
                {isVisible
                  ? "El contenido será visible"
                  : "El contenido estará oculto"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-medium ${
                isVisible ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isVisible ? "Activo" : "Inactivo"}
            </span>
            <Switch
              id="visibility"
              checked={isVisible}
              onCheckedChange={setIsVisible}
              disabled={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border/40 pt-6">
        {isViewMode ? (
          // Modo view (solo lectura): botón "Volver" para ir a la lista
          <Button
            type="button"
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            <Link href={cancelUrl}>Volver</Link>
          </Button>
        ) : (
          <>
            {/* Botón Cancelar */}
            {mode === "view" && isEditing ? (
              // En modo view con edición activa: "cancelar" restaura valores
              <Button
                type="button"
                variant="ghost"
                onClick={cancelEdit}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
                Cancelar
              </Button>
            ) : (
              // En modos create/edit: cancelar es un link
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href={cancelUrl}>Cancelar</Link>
              </Button>
            )}

            {/* Botón Submit TODO: enviar por API cuando se guarda o edita*/}
            <Button
              type="submit"
              disabled={isSubmitting || (mode === "create" && !imageFile)}
              className="gap-2 px-6"
            >
              <Save className="size-4" />
              {isSubmitting
                ? "Guardando..."
                : mode === "create"
                  ? "Crear contenido"
                  : "Guardar cambios"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
