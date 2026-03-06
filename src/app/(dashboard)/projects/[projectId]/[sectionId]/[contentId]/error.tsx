"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button, Card, CardContent } from "@components/ui";
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
    <div className="flex items-center justify-center min-h-125 p-6">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icono de Error */}
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>

            {/* Contenido */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                Error al cargar el contenido
              </h2>
              <p className="text-muted-foreground text-sm">
                {error.message || "Ha ocurrido un error inesperado"}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground/60 font-mono">
                  ID: {error.digest}
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-2">
              <Button onClick={reset} variant="default">
                <RefreshCw className="h-4 w-4 mr-2" />
                Intentar nuevamente
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Ir al inicio
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
