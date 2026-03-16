import Link from "next/link";

import { Button, FuzzyText } from "@components/ui";

export default function NotFound() {
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
            404
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.08}
            hoverIntensity={0.2}
            fontSize="clamp(1rem, 4vw, 2rem)"
            fontWeight={500}
            color="white"
          >
            ¡Ups! Página no encontrada
          </FuzzyText>
        </div>

        <span className="sr-only">Error 404: Página no encontrada</span>

        <div className="text-white/90 text-sm md:text-base  max-w-md mx-auto text-center space-y-4">
          <p>
            Lo sentimos, la página que estás buscando parece que se ha perdido
            en el ciberespacio.
          </p>
          <p>
            Puedes regresar a la&nbsp;
              <Link href="/" aria-label="Regresar a la página de inicio" className="underline font-bold text-white hover:text-chart-1">
                página de inicio.
              </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
