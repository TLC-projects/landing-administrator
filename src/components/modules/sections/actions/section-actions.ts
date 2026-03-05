"use server"

import { SectionService } from "@core/application/services/section/section-service"

const sectionService = new SectionService()

export async function getSectionsByProject(projectId: number) {
  try {
    return await sectionService.getSectionsByProject(projectId)
  } catch (error) {
    console.error("[getSectionsByProject] Error inesperado:", error)
    return []
  }
}