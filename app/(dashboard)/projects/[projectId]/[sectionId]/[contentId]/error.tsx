"use client";

import { useEffect } from "react";
import Link from "next/link";

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
          Error al cargar el contenido
        </h2>
        <p className="text-muted-foreground">
          {error.message || "Ha ocurrido un error inesperado"}
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Intentar nuevamente
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
