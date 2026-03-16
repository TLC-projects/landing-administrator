"use client";

import { useEffect } from "react";
import Link from "next/link";

import { FuzzyText } from "@components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-sidebar to-chart-5 relative">
      <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-chart-1/30 blur-2xl" />
      <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-chart-1/30 blur-3xl" />
      <div className="space-y-6">
        <div aria-hidden="true" className="flex flex-col items-center gap-2">
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.35}
            fontSize="clamp(3rem, 11vw, 11rem)"
            fontWeight={900}
            color="white"
          >
            500
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.08}
            hoverIntensity={0.2}
            fontSize="clamp(1rem, 4vw, 2rem)"
            fontWeight={500}
            color="white"
          >
            ¡Ups! Algo salió mal
          </FuzzyText>
        </div>

        <span className="sr-only">Error interno de la aplicación</span>

        <div className="text-white/90 text-sm md:text-base  max-w-md mx-auto text-center space-y-4">
          <p className="inline">
            Ocurrió un error inesperado mientras cargábamos esta sección.
          </p>
          <p className="inline">&nbsp;Puedes&nbsp;</p>
          <button
            className="underline font-bold text-white hover:text-chart-1"
            onClick={() => reset()}
          >
            intentar de nuevo
          </button>
          <p className="inline">&nbsp;o&nbsp;</p>
          <Link
            href="/"
            className="underline font-bold text-white hover:text-chart-1"
          >
            volver al inicio.
          </Link>
        </div>
      </div>
    </div>
  );
}
