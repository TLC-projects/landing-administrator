"use server";

import { getContentService } from "@/src/core/infrastructure/config/content-dependency";
import { revalidatePath } from "next/cache";



export async function createContent(formData: FormData) {
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const isVisible = formData.get("isVisible") === "true";
  const image = formData.get("image") as File;
  const sectionId = formData.get("sectionId") as string;

  const objectives = formData.get("objective") as string;
  const performances = formData.get('performances') as string;

  
  if (!title || !duration || !description) {
    return { error: "Todos los campos son requeridos" };
  }

  try {
    const contentService = await getContentService();
     await contentService.createContent({
      title,
      description,
      duration,
      blocked: !isVisible,
      section_id: Number(sectionId),
      resource: image instanceof File && image.size > 0 ? image : new File([], ''),
      objectives,
      performance: performances
    });
  } catch (error) {
    console.error("Error creating content:", error);
    return { error: "Error al crear el contenido" };
  }
  revalidatePath(`/sections/${sectionId}`);
}

export async function updateContent(contentId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const isVisible = formData.get("isVisible") === "true";
  const image = formData.get("image") as File;
  const sectionId = formData.get("sectionId") as string;

   const objectives = formData.get("objective") as string;
  const performances = formData.get('performances') as string;

  if (!title || !duration || !description) {
    return { error: "Todos los campos son requeridos" };
  }

  try {
    const contentService = await getContentService();
    await contentService.updateContent(Number(contentId), {
      title,
      description,
      duration,
      blocked: !isVisible,
      resource: image instanceof File && image.size > 0 ? image : undefined,
      objectives,
      performance: performances
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return { error: "Error al actualizar el contenido" };
  }

  revalidatePath(`/sections/${sectionId}`);
}

export async function deleteContent(
  contentId: string,
  sectionId: string,
) {
  try {
    const contentService = await getContentService();
    await contentService.deleteContent(Number(contentId));
  } catch (error) {
    console.error(`Error deleting content: ${contentId}`, error);
    return { error: "Error al eliminar el contenido" };
  }

  revalidatePath(`/sections/${sectionId}`);
}
