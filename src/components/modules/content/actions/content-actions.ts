"use server"

import { ContentService } from "@core/application/services/content/content-service"

const contentService = new ContentService()

export async function getContentsBySection(sectionId: number) {
  try {
    return await contentService.getContentsBySection(sectionId)
  } catch (error) {
    console.error("[getContentsBySection] Error inesperado:", error)
    return []
  }
}
