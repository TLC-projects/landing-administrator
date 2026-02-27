import Link from "next/link";
import { Metadata } from "next";
import { Shell, AppTitle } from "@/components/layouts";

export const metadata: Metadata = {
  title: "Inicio | Content Administrator",
  description: "Panel de administración de contenidos",
};

export default function Page() {
  return (
    <Shell>
      <AppTitle
        title="Biblioteca"
        description="Aquí puedes encontrar todos los recursos disponibles para ti."
      />
      {/* TODO: Lista dinámica de proyectos */}
      <div className="space-y-2">
        <Link
          href="/projects/1"
          className="block p-4 border rounded hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-medium">Proyecto 1</h3>
          <p className="text-sm text-muted-foreground">
            Descripción del proyecto 1
          </p>
        </Link>
      </div>
    </Shell>
  );
}
