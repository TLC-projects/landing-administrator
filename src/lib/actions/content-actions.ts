"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getContentService } from "@core/infrastructure/config/content-dependency";



export async function createContent(formData: FormData) {
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const isVisible = formData.get("isVisible") === "true";
  const image = formData.get("image") as File;
  const projectId = formData.get("projectId") as string;
  const sectionId = formData.get("sectionId") as string;

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
    });
  } catch (error) {
    console.error("Error creating content:", error);
    return { error: "Error al crear el contenido" };
  }
  revalidatePath(`/projects/${projectId}/${sectionId}`);
}

export async function updateContent(contentId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const isVisible = formData.get("isVisible") === "true";
  const image = formData.get("image") as File;
  const projectId = formData.get("projectId") as string;
  const sectionId = formData.get("sectionId") as string;

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
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return { error: "Error al actualizar el contenido" };
  }

  revalidatePath(`/projects/${projectId}/${sectionId}`);
}

export async function deleteContent(
  contentId: string,
  projectId: string,
  sectionId: string,
) {
  try {
    const contentService = await getContentService();
    await contentService.deleteContent(Number(contentId));
  } catch (error) {
    console.error(`Error deleting content: ${contentId}`, error);
    return { error: "Error al eliminar el contenido" };
  }

  revalidatePath(`/projects/${projectId}/${sectionId}`);
}
