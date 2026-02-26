"use client";

import { useEffect } from "react";

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
    <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Error al cargar el proyecto
        </h2>
        <p className="text-muted-foreground">
          {error.message || "Ha ocurrido un error inesperado"}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
