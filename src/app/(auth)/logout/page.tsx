import { Metadata } from "next";
import { Button, Card, CardContent } from "@/components/ui";
import Link from "next/link";
import { Shell } from "@/components/layouts";
import { LogOut, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cerrar Sesión | Content Administrator",
  description: "Cierra tu sesión",
};

export default function LogoutPage() {
  return (
    <Shell className="flex items-center justify-center min-h-screen bg-sidebar">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 space-y-8 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative h-24 w-24 rounded-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg">
                <LogOut className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              ¡Hasta Pronto!
            </h1>
            <p className="text-muted-foreground text-lg">
              Has cerrado sesión exitosamente
            </p>
            <p className="text-sm text-muted-foreground/80">
              Esperamos verte de nuevo pronto
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button asChild size="lg" className="w-full h-12">
              <Link href="/login">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Iniciar Sesión
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Shell>
  );
}
