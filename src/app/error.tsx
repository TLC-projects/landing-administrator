'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FuzzyText } from '@components/ui';
import { AppError, HttpError, NetworkError } from '@lib/errors';

function getErrorInfo(error: Error & { digest?: string }) {
  if (error instanceof NetworkError) {
    return {
      code: 'NET',
      title: error.message,
      hint: 'No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta de nuevo.',
      detail: (error as NetworkError).code
    };
  }
  if (error instanceof HttpError) {
    return {
      code: error.status.toString(),
      title: error.message,
      hint: error.isUnauthorized
        ? 'Tu sesión puede haber expirado.'
        : error.isForbidden
          ? 'No tienes permiso para acceder a este recurso.'
          : error.isNotFound
            ? 'El recurso solicitado no existe.'
            : 'Error del servidor. Intenta más tarde.',
      detail: (error as AppError).code
    };
  }
  if (error instanceof AppError) {
    return {
      code: '500',
      title: error.message,
      hint: 'Ocurrió un error inesperado mientras cargábamos esta sección.',
      detail: (error as AppError).code
    };
  }
  return {
    code: '500',
    title: 'Algo salió mal',
    hint: 'Ocurrió un error inesperado mientras cargábamos esta sección.',
    detail: error.digest
  };
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  const { code, title, hint, detail } = getErrorInfo(error);

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
            color="white">
            {code}
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.08}
            hoverIntensity={0.2}
            fontSize="clamp(1rem, 4vw, 2rem)"
            fontWeight={500}
            color="white">
            {title}
          </FuzzyText>
        </div>

        <span className="sr-only">Error interno de la aplicación</span>

        <div className="text-white/90 text-sm md:text-base max-w-md mx-auto text-center space-y-4">
          <p>{hint}</p>
          {detail && <p className="text-white/50 text-xs font-mono">{detail}</p>}
          <div>
            <p className="inline">&nbsp;Puedes&nbsp;</p>
            <button className="underline font-bold text-white hover:text-chart-1" onClick={() => reset()}>
              intentar de nuevo
            </button>
            <p className="inline">&nbsp;o&nbsp;</p>
            <Link href="/" className="underline font-bold text-white hover:text-chart-1">
              volver al inicio.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
