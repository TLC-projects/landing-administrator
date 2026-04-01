"use server";

import { getCalendarService } from "@core/infrastructure/config/calendar-dependency";
import { Calendar } from "@core/domain/entities/Calendar";
import { revalidatePath } from "next/cache";

// calendar-actions.ts

type CalendarActionResult = {
  message: string;
  status: boolean | null;
  data?: Calendar;
};

export const createCalendarAction = async (
  state: CalendarActionResult,
  formData: FormData | null
): Promise<CalendarActionResult> => {
  try {
    if (!formData) return { status: null, message: "" };

    const calendar = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      blocked: formData.get("blocked") === "on",
    };

    const service = await getCalendarService();
    const created = await service.createNewCalendar(calendar);

    return { message: "Evento creado exitosamente.", status: true, data: created ?? undefined };
  } catch (error) {
    console.error("Error creating calendar:", error);
    return { message: "Error al crear el evento.", status: false };
  }
};

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
   const updatedCalendar =  await service.updateCalendar(id, newCalendar);

    revalidatePath("/calendar", "page");

    return { message: "Evento actualizado exitosamente.", status: true, data: updatedCalendar ?? undefined }; 
  } catch (error) {
    console.error("Error updating calendar:", error);
    return { message: "Error al actualizar el evento.", status: false };
  }
};

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