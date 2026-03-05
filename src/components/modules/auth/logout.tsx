"use client";

import { dataFetcher } from "@lib/data-fetching";
import { withBasePath } from "@lib/with-base-path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Logout = () => {
  const router = useRouter();

  const { data, loading, error } = dataFetcher.useQuery<{ success: boolean }>(withBasePath('/api/auth/logout'));

  useEffect(() => {
    if (data?.success) {
      router.push('/login');
    }
  }, [data, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Cerrar Sesión</h1>
          <p className="text-muted-foreground">Procesando logout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 text-center">
          <h1 className="text-xl font-medium text-destructive">
            Error al cerrar sesión
          </h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
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
