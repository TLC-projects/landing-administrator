"use client";

import { useState } from "react";

const welcomeMessages = [
  {
    title: "Hola, Bienvenido de Vuelta",
    subtitle: "Hey, bienvenido de vuelta a tu espacio especial",
  },
  {
    title: "¡Qué Alegría Verte Por Aquí!",
    subtitle: "Estamos listos para continuar donde lo dejaste",
  },
  {
    title: "Bienvenido Nuevamente",
    subtitle: "Tu contenido te está esperando",
  },
  {
    title: "¡Hola! Es Genial Tenerte De Vuelta",
    subtitle: "Listo para crear contenido increíble hoy",
  },
  {
    title: "¡Nos Alegra Verte!",
    subtitle: "Ingresa y sigue gestionando tu contenido",
  },
  {
    title: "De Vuelta en Acción",
    subtitle: "Continuemos donde quedamos",
  },
];

export function LoginHeader() {
  const [message] = useState(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    return welcomeMessages[randomIndex];
  });

  return (
    <header className="space-y-2">
      <h1
        className="text-4xl font-bold tracking-tight"
        suppressHydrationWarning
      >
        {message.title}
      </h1>
      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
        {message.subtitle}
      </p>
    </header>
  );
}
