'use server';

import { revalidatePath } from 'next/cache';
import { getCalendarService } from '@core/infrastructure/config/calendar-dependency';

import { Calendar } from '@/src/core/domain/entities/calendar_';

import { AppError, HttpError } from '../errors';

import { ActionResult } from './types/types';

/**
 * Creates a new calendar entry with the provided data.
 * Before submitting, it checks if the title and date fields are valid. If they are not, it reports their validity.
 * After submitting, it starts a transition that calls formAction with the new form data.
 *
 * @return {Promise<ActionResult>} A promise that resolves when the creation is complete.
 */
export const createCalendarAction = async (
  state: { message: string; status: null | boolean },
  formData: FormData
): Promise<ActionResult<Calendar | null>> => {
  try {
    // Create a new calendar object with the title, date, and blocked status from the form data
    const calendar = {
      title: formData.get('title')?.toString() ?? '',
      date: formData.get('date')?.toString() ?? '',
      blocked: formData.get('blocked') === 'on'
    };

    // Get the calendar service and call the createNewCalendar method with the new calendar object. If the creation is successful, it returns a success message and status.
    // If the creation fails, it returns an error message and status.
    const service = await getCalendarService();
    const created = await service.createNewCalendar(calendar);

    if (!created) {
      return {
        message: 'Ya existe un evento con ese nombre. Usa un título diferente.',
        status: false
      };
    }

    return {
      message: 'Evento creado exitosamente.',
      status: true,
      data: created
    };
  } catch (error) {
    console.error('Error creating calendar:', error);

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
 * Updates a calendar entry with the provided data.
 * Before submitting, it checks if the title and date fields are valid. If they are not, it reports their validity.
 * After submitting, it starts a transition that calls formAction with the new form data.
 *
 * @return {Promise<ActionResult>} A promise that resolves when the update is complete.
 */
export const updateCalendarAction = async (
  state: { message: string; status: null | boolean },
  formData: FormData
): Promise<ActionResult<Calendar | null>> => {
  try {
    const id = formData.get('id') as string;
    if (!id || typeof id !== 'string') throw new AppError('ID inválido');

    // Create a new calendar object with the title, date, and blocked status from the form data
    const calendar = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      blocked: formData.get('blocked') === 'on'
    };

    // Get the calendar service and call the updateCalendar method with the calendar ID and the new calendar object.
    // If the update is successful, it returns a success message and status.
    const service = await getCalendarService();
    const updatedCalendar = await service.updateCalendar(id, calendar);

    revalidatePath('/calendar', 'page');

    return {
      message: 'Evento actualizado exitosamente.',
      status: true,
      data: updatedCalendar ?? undefined
    };
  } catch (error) {
    console.error('Error updating calendar:', error);

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
 * Deletes a calendar entry by its ID.
 * Before deleting, it checks if the calendar entry exists. If it does not, it reports its validity.
 * After deleting, it starts a transition that calls formAction with the new form data.
 * @returns {Promise<{message:string,status:boolean}>} A promise that resolves when the deletion is complete.
 * @throws {Error} If the request fails or if the calendar data is invalid.
 */
export const deleteCalendarAction = async (id: string): Promise<ActionResult> => {
  try {
    if (!id || typeof id !== 'string') throw new AppError('ID inválido');

    const service = await getCalendarService();
    await service.deleteCalendar(id);

    revalidatePath('/(dashboard)/calendar');

    return {
      message: 'Evento eliminado exitosamente.',
      status: true
    };
  } catch (error) {
    console.error('Error deleting calendar:', error);

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
