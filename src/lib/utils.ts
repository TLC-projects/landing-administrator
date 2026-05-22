import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Detectar tipo de archivo basándose en la URL o el tipo de File
export function getFileType(file: File | null, filePreview: string | null) {
  // Si hay un archivo File, usar su tipo
  if (file) {
    return {
      isPDF: file.type === "application/pdf",
      isImage: file.type.startsWith("image/")
    };
  }
  
  // Si solo hay preview (URL del servidor), detectar por extensión
  if (filePreview) {
    const lowerPreview = filePreview.toLowerCase();
    return {
      isPDF: lowerPreview.endsWith('.pdf') || lowerPreview.includes('.pdf?'),
      isImage: lowerPreview.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i) !== null
    };
  }
  
  return { isPDF: false, isImage: false };
}

// Extraer nombre del archivo de la URL
export function getFileNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileName = pathname.split('/').pop() || 'archivo';
    // Decodificar y limpiar el nombre
    return decodeURIComponent(fileName).replace(/\?.*$/, '');
  } catch {
    return 'Documento';
  }
}