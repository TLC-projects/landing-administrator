import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cerrar Sesión | Content Administrator",
  description: "Cierra tu sesión",
};

export default function LogoutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Cerrar Sesión</h1>
        <p className="text-muted-foreground">Procesando logout...</p>
      </div>
    </div>
  );
}