export interface SectionApiResponse {
  id: number
  name: string
  project_id: number
}

/*TODO: no se si esto va aca es lo que recibe la ui en la tabla de secciones */
export interface SectionViewModel {
  id: string
  projectId: string
  title: string
  contentNumber: number
}


/* export interface CreateSectionDto {
    name: string;
    projectId: number;
}

export interface UpdateSectionDto {
    name?: string;
    projectId?: number;
} */