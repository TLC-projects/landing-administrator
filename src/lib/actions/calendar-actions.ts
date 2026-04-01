"use server";

import { getCalendarService } from "@core/infrastructure/config/calendar-dependency";
import { Calendar } from "@core/domain/entities/Calendar";
import { revalidatePath } from "next/cache";

type CalendarActionResult = {
  message: string;
  status: boolean | null;
  data?: Calendar;
};

/**
 * Creates a new calendar entry with the provided data.
 * Before submitting, it checks if the title and date fields are valid. If they are not, it reports their validity.
 * After submitting, it starts a transition that calls formAction with the new form data.
 * @returns {Promise<CalendarActionResult>} A promise that resolves when the creation is complete.
 * @throws {Error} If the request fails or if the calendar data is invalid.
 */
export const createCalendarAction = async (
  state: CalendarActionResult,
  formData: FormData | null
): Promise<CalendarActionResult> => {
  try {
    if (!formData) return { status: null, message: "" };

    const calendar = {
      title: formData.get("title")?.toString() ?? "",
      date: formData.get("date")?.toString() ?? "",
      blocked: formData.get("blocked") === "on",
    };

    const service = await getCalendarService();
    const created = await service.createNewCalendar(calendar);

    if (!created) {
      return { message: "Ya existe un evento con ese nombre. Usa un título diferente.", status: false };
    }

    return { message: "Evento creado exitosamente.", status: true, data: created ?? undefined };
  } catch (error) {
    console.error("Error creating calendar:", error);
    return { message: "Error al crear el evento.", status: false };
  }
};

/**
 * Updates a calendar entry with the provided data.
 * Before submitting, it checks if the title and date fields are valid. If they are not, it reports their validity.
 * After submitting, it starts a transition that calls formAction with the new form data.
 * @returns {Promise<CalendarActionResult>} A promise that resolves when the update is complete.
 * @throws {Error} If the request fails or if the calendar data is invalid.
 */
export const updateCalendarAction = async (
  id: string,
  state: CalendarActionResult,
  formData: FormData
): Promise<CalendarActionResult> => {
  try {

    const newCalendar = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      blocked: formData.get("blocked") === "on",
    };

    const service = await getCalendarService();
    const updatedCalendar = await service.updateCalendar(id, newCalendar);

    revalidatePath("/calendar", "page");

    return { message: "Evento actualizado exitosamente.", status: true, data: updatedCalendar ?? undefined };
  } catch (error) {
    console.error("Error updating calendar:", error);
    return { message: "Error al actualizar el evento.", status: false };
  }
};

/**
 * Deletes a calendar entry by its ID.
 * Before deleting, it checks if the calendar entry exists. If it does not, it reports its validity.
 * After deleting, it starts a transition that calls formAction with the new form data.
 * @returns {Promise<{message:string,status:boolean}>} A promise that resolves when the deletion is complete.
 * @throws {Error} If the request fails or if the calendar data is invalid.
 */
export const deleteCalendarAction = async (id: string): Promise<{ message: string; status: boolean }> => {
  try {
    await (await getCalendarService()).deleteCalendar(id);

    revalidatePath("/(dashboard)/calendar");

    return { message: 'Evento eliminado exitosamente.', status: true };
  } catch (error) {
    console.error("Error deleting calendar:", error);
    return { message: 'Error al eliminar el evento.', status: false };
  }
}