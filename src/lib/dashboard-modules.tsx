import { BookOpen, CalendarDays } from "lucide-react";

export const dashboardModules = [
  {
    id: "sections",
    title: "Secciones",
    description: "Organiza y edita el contenido de tus cursos por secciones.",
    href: "/sections",
    icon: <BookOpen size={22} />
  },
  {
    id: "calendar",
    title: "Calendario",
    description: "Programa y visualiza fechas clave de tus programas.",
    href: "/calendar",
    icon: <CalendarDays size={22} />
  },
];