import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};

export default function Page() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Content Administrator</h1>
            <p className="text-muted-foreground mb-6">
                Bienvenido al administrador de contenido. Selecciona un proyecto para comenzar.
            </p>
            {/* TODO: Lista dinámica de proyectos */}
            <div className="space-y-2">
                <Link 
                    href="/projects/1" 
                    className="block p-4 border rounded hover:bg-gray-50 transition-colors"
                >
                    <h3 className="font-medium">Proyecto 1</h3>
                    <p className="text-sm text-muted-foreground">Descripción del proyecto 1</p>
                </Link>
            </div>
        </div>
    )
}