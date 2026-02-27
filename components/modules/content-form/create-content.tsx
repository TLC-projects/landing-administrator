"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createContent(formData: FormData) {
  const title = formData.get("title") as string
  const duration = formData.get("duration") as string
  const description = formData.get("description") as string
  const isVisible = formData.get("isVisible") === "true"
  const image = formData.get("image") as File

  if (!title || !duration || !description) {
    return { error: "Todos los campos son requeridos" }
  }

  try {
    // TODO: Guardar en base de datos
    // const content = await db.content.create({ ... })

    const projectId = formData.get("projectId") as string
    const sectionId = formData.get("sectionId") as string

    // TODO: Guardar imagen en base de datos
    // const imageUrl = await uploadImage(image)
    console.log(isVisible, image);
    


    revalidatePath(`/projects/${projectId}/${sectionId}`)
    redirect(`/projects/${projectId}/${sectionId}`)
  } catch (error) {
    console.error("Error creating content:", error)
    return { error: "Error al crear el contenido" }
  }
}

export async function updateContent(contentId: string, formData: FormData) {
  const title = formData.get("title") as string
  const duration = formData.get("duration") as string
  const description = formData.get("description") as string
  const isVisible = formData.get("isVisible") === "true"
  const image = formData.get("image") as File

  if (!title || !duration || !description) {
    return { error: "Todos los campos son requeridos" }
  }

  try {
    // TODO: Actualizar en base de datos
    // const content = await db.content.update({ where: { id: contentId }, data: { ... } })

    const projectId = formData.get("projectId") as string
    const sectionId = formData.get("sectionId") as string

    // TODO: Actualizar imagen en base de datos
    // const imageUrl = await uploadImage(image)
    console.log(isVisible, image);

    revalidatePath(`/projects/${projectId}/${sectionId}`)
    redirect(`/projects/${projectId}/${sectionId}`)
  } catch (error) {
    console.error("Error updating content:", error)
    return { error: "Error al actualizar el contenido" }
  }
}

export async function getContent(contentId: string) {
  try {
    // TODO: Obtener de base de datos
    // const content = await db.content.findUnique({ where: { id: contentId } })
    
    // Mock data para ejemplo
    return {
      id: contentId,
      title: "Métodos de Evaluación Formativa",
      duration: "20 Horas",
      description: "Este contenido explora diferentes métodos...",
      imageUrl: "/placeholder.jpg",
      isVisible: true,
      projectId: "1",
      sectionId: "1",
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return null
  }
}

export async function deleteContent(contentId: string) {
    try {
      // TODO: Eliminar de base de datos
      // await db.content.delete({ where: { id: contentId } })
  
      const projectId = "1"
      const sectionId = "1"
  
      revalidatePath(`/projects/${projectId}/${sectionId}`)
      redirect(`/projects/${projectId}/${sectionId}`)
    } catch (error) {
      console.error(`Error deleting content: ${contentId}`, error)
      return { error: "Error al eliminar el contenido" }
    }
}