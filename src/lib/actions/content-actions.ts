'use server';

import { revalidatePath } from 'next/cache';

import { UpdateContentDto } from '@/src/core/application/dto/content';
import { getContentService } from '@/src/core/infrastructure/config/content-dependency';

import { AppError, HttpError } from '../errors';

import { ActionResult } from './types/types';

/**
 * Create a new content item using the provided form data. Validates required fields and handles file uploads for the main resource and brochure.
 * After successful creation, it revalidates the path to update the content list.
 * @param formData The form data containing the content details, including title, description, duration, blocked status, section ID, objectives, performance, resource file, and brochure file.
 * @returns A promise that resolves when the content creation is complete, or an error message if validation fails or if there is an error during the creation process.
 */
export async function createContent(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const duration = formData.get('duration') as string;
    const description = formData.get('description') as string;
    const blocked = formData.get('blocked') as string;
    const image = formData.get('image') as File;
    const brochure = formData.get('brochure') as File; // Agregar brochure
    const sectionId = formData.get('sectionId') as string;

    const objectives = formData.get('objective') as string;
    const performances = formData.get('performances') as string;

    if (!title || !duration || !description) {
      throw new AppError('Todos los campos son requeridos');
    }

    // Validar que haya imagen en modo creación
    if (!image || image.size === 0) {
      throw new AppError('La imagen es requerida para crear un contenido');
    }

    const contentService = await getContentService();
    await contentService.createContent({
      title,
      description,
      duration,
      blocked: blocked === 'true' ? true : false, // Convertir string a boolean
      section_id: Number(sectionId),
      resource: image instanceof File && image.size > 0 ? image : new File([], ''), // Cambiar 'resource' por 'file'
      brochure: brochure instanceof File && brochure.size > 0 ? brochure : undefined, // Agregar brochure
      objectives,
      performance: performances
    });

    revalidatePath(`/sections/${sectionId}`);
  } catch (error) {
    console.error('Error creating content:', error);

    if (error instanceof HttpError) {
      console.error('AppError:', error.cause, 'Code:', error.code, 'Message:', error.message);
      if (error.isServerError) throw error;
      return { status: false, message: error.message, code: error.code, httpStatus: error.status };
    }
    if (error instanceof AppError) {
      console.error('AppError:', error.cause, 'Code:', error.code, 'Message:', error.message);
      return { status: false, message: error.message, code: error.code };
    }

    throw error;
  }
}

/**
 * Update an existing content item with the provided content ID and form data. Validates required fields and handles file uploads for the main resource and brochure.
 * After successful update, it revalidates the path to update the content list.
 * @param contentId The ID of the content item to update.
 * @param formData The form data containing the updated content details, including title, description, duration, blocked status, section ID, objectives, performance, resource file, brochure file, and brochure URL.
 * @returns A promise that resolves when the content update is complete, or an error message if validation fails or if there is an error during the update process.
 */
export const updateContent = async (contentId: string, formData: FormData): Promise<ActionResult> => {
  try {
    const title = formData.get('title') as string;
    const duration = formData.get('duration') as string;
    const description = formData.get('description') as string;
    const blocked = formData.get('blocked') as string;
    const image = formData.get('image') as File;
    const brochure = formData.get('brochure') as File;
    const sectionId = formData.get('sectionId') as string;
    const brochureUrl = formData.get('brochureUrl') as string; // Obtener URL del brochure existente

    const objectives = formData.get('objective') as string;
    const performance = formData.get('performances') as string;

    if (!title || !duration || !description) {
      throw new AppError('Todos los campos son requeridos');
    }

    const updateData: UpdateContentDto = {
      title,
      description,
      duration,
      blocked: blocked === 'true' ? true : false, // Convertir string a boolean
      objectives,
      performance
    };

    // Solo agregar resource si hay nueva imagen
    if (image instanceof File && image.size > 0) {
      updateData.resource = image;
    }

    // Solo agregar brochure si hay nuevo brochure
    if (brochure instanceof File && brochure.size > 0) {
      updateData.brochure = brochure;
    } else {
      // Si no hay nuevo brochure pero existe uno previo, mantener la URL existente
      updateData.brochureUrl = brochureUrl;
    }

    const contentService = await getContentService();

    // Si no hay nuevo brochure, NO agregar el campo (mantener existente)
    await contentService.updateContent(contentId, updateData);

    revalidatePath(`/sections/${sectionId}`);

    return {
      message: 'Contenido actualizado exitosamente.',
      status: true
    };
  } catch (error) {
    console.error('Error updating content:', error);

    if (error instanceof HttpError) {
      console.error('AppError:', error.cause, 'Code:', error.code, 'Message:', error.message);
      if (error.isServerError) throw error;
      return { status: false, message: error.message, code: error.code, httpStatus: error.status };
    }
    if (error instanceof AppError) {
      console.error('AppError:', error.cause, 'Code:', error.code, 'Message:', error.message);
      return { status: false, message: error.message, code: error.code };
    }

    throw error;
  }
};

/**
 * Delete a content item with the provided content ID and section ID. After successful deletion, it revalidates the path to update the content list.
 * @param contentId The ID of the content item to delete.
 * @param sectionId The ID of the section to which the content item belongs, used for revalidating the path after deletion.
 * @returns A promise that resolves when the content deletion is complete, or an error message if there is an error during the deletion process.
 */
export const deleteContent = async (contentId: string, sectionId: string): Promise<ActionResult> => {
  try {
    if (!contentId || typeof contentId !== 'string') throw new AppError('ID de contenido inválido');

    const contentService = await getContentService();
    await contentService.deleteContent(contentId);

    revalidatePath(`/sections/${sectionId}`);

    return {
      message: 'Contenido eliminado exitosamente.',
      status: true
    };
  } catch (error) {
    console.error('Error deleting content:', error);

    if (error instanceof HttpError) {
      console.error('AppError:', error.cause, 'Code:', error.code, 'Message:', error.message);
      if (error.isServerError) throw error;
      return { status: false, message: error.message, code: error.code, httpStatus: error.status };
    }
    if (error instanceof AppError) {
      console.error('AppError:', error.cause, 'Code:', error.code, 'Message:', error.message);
      return { status: false, message: error.message, code: error.code };
    }

    throw error;
  }
};
