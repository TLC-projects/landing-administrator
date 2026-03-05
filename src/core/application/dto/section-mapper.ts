import { SectionApiResponse, SectionViewModel } from "./section-dto";

// API ->UI sin conteo
export function sectionToViewModel(api: SectionApiResponse): SectionViewModel {
  return {
    id: String(api.id),
    projectId: String(api.project_id),
    title: api.name,
    contentNumber: 0,
  }
}
// API -> UI con conteo de contenidos, se usa en la tabla de secciones del proyecto
export function sectionToViewModelWithCount(
  api: SectionApiResponse,
  contentNumber: number
): SectionViewModel {
  return {
    id: String(api.id),
    projectId: String(api.project_id),
    title: api.name,
    contentNumber,
  }
}

// 
export function sectionsToViewModel(api: SectionApiResponse[]): SectionViewModel[] {
  return api.map(sectionToViewModel)
}
