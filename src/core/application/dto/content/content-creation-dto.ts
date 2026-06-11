export interface CreateContentDto {
  title: string;
  description: string;
  duration: string;
  blocked: boolean;
  objectives?: string;
  performance?: string;
  section_id: number;
  resource: File; // Archivo principal (video, audio, documento, etc.)
  brochure?: File; // Archivo brochure (PDF, documento, etc.)
}

export interface UpdateContentDto {
  title?: string;
  description?: string;
  duration?: string;
  blocked?: boolean;
  objectives?: string;
  performance?: string;
  resource?: File; // Archivo principal opcional para actualizar
  brochure?: File; // Brochure opcional para actualizar
  brochureUrl?: string; // URL del brochure existente para mantener si no se sube uno nuevo
}
