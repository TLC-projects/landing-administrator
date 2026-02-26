import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Content Administrator",
  description: "Inicia sesión en el administrador de contenido",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <p className="text-muted-foreground">Formulario de login...</p>
      </div>
    </div>
  );
}