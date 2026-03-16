"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@lib/with-base-path";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch(withBasePath("/api/auth/logout"), {
          method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error("Error al cerrar sesión");
        }

        router.replace("/login");
      } catch (err) {
        setError("Error al cerrar sesión");
      } finally {
        setLoading(false);
      }
    };

    logout();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-sidebar to-chart-5 relative">
        <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-chart-1/30 blur-2xl" />
        <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-chart-1/30 blur-3xl" />
        <div className="w-full max-w-md p-10 text-center space-y-8 text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold tracking-tight">Hasta Pronto!</h1>
          <p>Esperamos verte de nuevo muy pronto.</p>
          <p>Procesando Logout ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-sidebar to-chart-5 relative">
        <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-chart-1/30 blur-2xl" />
        <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-chart-1/30 blur-3xl" />
        <div className="w-full max-w-md p-10 text-center space-y-8 text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold tracking-tight">{error}</h1>
          <p>Esperamos verte de nuevo muy pronto.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
};
