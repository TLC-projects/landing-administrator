'use client';

import { useState } from 'react';
import { ChevronLeft, Clock, Edit, FileText, FileUp, ListCheck, Plus, Save, Target, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Content } from '@core/domain/entities/content';
import { createContent, updateContent } from '@lib/actions/content-actions';

import { Button, Input, Textarea } from '@/src/components/ui';

import { FileUpload } from './components/file-upload';
import { useContentForm } from './hooks/use-content-form';
import type { ContentFormModes } from './types/content';
import { BlockedToogle } from './blocked-toggle';
import { ImageUpload } from './image-upload';

interface ContentFormProps {
  sectionId: string;
  mode?: ContentFormModes;
  content?: Content | null;
}

export function ContentForm({ sectionId, mode = 'create', content = null }: ContentFormProps) {
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
    brochureFile,
    brochurePreview,
    blocked,
    setIsBlocked,
    objective,
    setObjective,
    performances,
    isDragging,
    isBrochureDragging,
    isEditing,
    handleImageChange,
    handleBrochureChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleBrochureDragOver,
    handleBrochureDragLeave,
    handleBrochureDrop,
    updatePerformance,
    addPerformance,
    removePerformance,
    removeImage,
    removeBrochure,
    resetForm,
    toggleEditMode,
    cancelEdit
  } = useContentForm({ mode, initialData: content });

  const charLimit = 1000;
  const charPercent = Math.min((description.length / charLimit) * 100, 100);
  const isViewMode = mode === 'view' && !isEditing;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validar tamaño de archivos ANTES de enviar
    const maxImageSize = 1 * 1024 * 1024; // 1MB
    const maxBrochureSize = 8 * 1024 * 1024; // 8MB

    if (imageFile && imageFile.size > maxImageSize) {
      toast.error('Imagen muy grande', {
        description: `La imagen debe ser menor a 1MB. Tamaño actual: ${(imageFile.size / 1024 / 1024).toFixed(2)}MB`
      });
      setIsSubmitting(false);
      return;
    }

    if (brochureFile && brochureFile.size > maxBrochureSize) {
      toast.error('Brochure muy grande', {
        description: `El brochure debe ser menor a 8MB. Tamaño actual: ${(brochureFile.size / 1024 / 1024).toFixed(2)}MB`
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('sectionId', sectionId);
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('blocked', blocked ? 'true' : 'false'); // Asegurar que se envíe como string
    formData.append('objective', objective);
    formData.append('performances', JSON.stringify(performances.filter(Boolean)));

    // SOLO agregar si el archivo existe Y tiene contenido
    if (imageFile && imageFile.size > 0) {
      formData.append('image', imageFile);
    }

    if (brochureFile && brochureFile.size > 0) {
      formData.append('brochure', brochureFile);
      formData.append('brochureUrl', ''); // Agregar campo para indicar que se reemplaza el brochure existente
    } else if (mode === 'edit' && content?.brochureUrl) {
      formData.append('brochureUrl', content.brochureUrl); // Mantener brochure existente si no se sube uno nuevo
    }

    const isUpdate = mode === 'edit' || (mode === 'view' && isEditing && content?.id);

    try {
      if (isUpdate) {
        await updateContent(content!.id, formData);
      } else {
        await createContent(formData);
      }

      if (mode === 'create') resetForm();

      toast.success(isUpdate ? 'Contenido actualizado correctamente' : 'Contenido creado correctamente');

      router.push(`/sections/${sectionId}`);
    } catch (error) {
      console.error('Error en handleSubmit:', error);

      // Detectar error de tamaño del servidor
      if (error instanceof Error && error.message.includes('Body exceeded')) {
        toast.error('Archivos muy grandes', {
          description: 'Los archivos exceden el límite permitido. Imagen: máx 1MB, Brochure: máx 8MB'
        });
      } else {
        toast.error('Error al procesar', {
          description: 'Hubo un problema al guardar el contenido. Intenta de nuevo.'
        });
      }

      setError('Error al procesar el contenido');
      setIsSubmitting(false);
    }
  };

  const cancelUrl = `/sections/${sectionId}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-4xl">
      {/* Header con botón de acción para modo view */}
      {mode === 'view' && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl tracking-tight">{isEditing ? 'Editar contenido' : 'Detalles del contenido'}</h3>
            <p className="text-sm text-muted-foreground">
              {isEditing ? 'Modifica los campos necesarios' : 'Visualiza la información del contenido'}
            </p>
          </div>
          {!isEditing && (
            <Button type="button" onClick={toggleEditMode} variant="outline" className="gap-2">
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
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-foreground">
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
            <label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium text-foreground">
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
          <label htmlFor="description" className="text-sm font-medium text-foreground">
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
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${charPercent}%` }} />
              </div>
              <span
                className={`text-xs ${description.length >= charLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {description.length}/{charLimit}
              </span>
            </div>
          )}
        </div>

        {/* Objectives */}
        <div className="flex flex-col gap-2">
          <label htmlFor="objective" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Target className="size-3.5 text-primary" />
            Objetivo
          </label>
          <Textarea
            id="objective"
            name="objective"
            placeholder="Describe el objetivo principal del contenido..."
            value={objective}
            onChange={(e) => {
              if (e.target.value.length <= charLimit) {
                setObjective(e.target.value);
              }
            }}
            disabled={isViewMode}
            className="resize-none border-border/60 bg-card transition-all focus-visible:border-primary focus-visible:ring-primary/20 disabled:cursor-default disabled:opacity-100"
            rows={5}
          />
          {!isViewMode && (
            <div className="flex items-center justify-between">
              <div className="h-1 w-24 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${Math.min((objective.length / charLimit) * 100, 100)}%`
                  }}
                />
              </div>
              <span
                className={`text-xs ${objective.length >= charLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {objective.length}/{charLimit}
              </span>
            </div>
          )}
        </div>

        {/* Performances */}
        <div className="flex flex-col gap-2">
          <label htmlFor="performance" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <ListCheck className="size-3.5 text-primary" />
            Lista de Desempeños
          </label>
          <div className="flex flex-col gap-2">
            {performances.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  placeholder={`Desempeño ${index + 1}`}
                  value={item}
                  onChange={(e) => updatePerformance(index, e.target.value)}
                  disabled={isViewMode}
                  className="min-h-8 resize-none border-border/60 bg-card transition-all focus-visible:border-primary focus-visible:ring-primary/20 disabled:cursor-default disabled:opacity-100"
                  rows={1}
                />
                {!isViewMode && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePerformance(index)}
                    className="shrink-0 text-muted-foreground hover:text-destructive">
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            ))}
            {!isViewMode && (
              <Button
                type="button"
                variant="outline"
                onClick={addPerformance}
                className="mt-1 w-full gap-2 border-dashed">
                <Plus className="size-4" />
                Agregar desempeño
              </Button>
            )}
          </div>
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

        {/* Brochure Upload (PDF o Imagen) */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileUp className="size-3.5 text-primary" />
            Brochure (Opcional)
          </label>
          <FileUpload
            filePreview={brochurePreview}
            file={brochureFile}
            isDragging={isBrochureDragging}
            isReadOnly={isViewMode}
            onFileChange={handleBrochureChange}
            onDragOver={handleBrochureDragOver}
            onDragLeave={handleBrochureDragLeave}
            onDrop={handleBrochureDrop}
            onRemove={removeBrochure}
            acceptedFormats=".pdf,.jpg,.jpeg,.png,.webp"
            maxSizeMB={10}
          />
        </div>

        {/* Visibility */}
        <BlockedToogle blocked={blocked} setIsBlocked={setIsBlocked} isViewMode={isViewMode} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border/40 pt-6">
        {isViewMode ? (
          <Button type="button" variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" />
            <Link href={cancelUrl}>Volver</Link>
          </Button>
        ) : (
          <>
            {mode === 'view' && isEditing ? (
              <Button
                type="button"
                variant="ghost"
                onClick={cancelEdit}
                className="gap-2 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
                Cancelar
              </Button>
            ) : (
              <Button type="button" variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href={cancelUrl}>Cancelar</Link>
              </Button>
            )}

            <Button type="submit" disabled={isSubmitting || (mode === 'create' && !imageFile)} className="gap-2 px-6">
              <Save className="size-4" />
              {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear contenido' : 'Guardar cambios'}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
