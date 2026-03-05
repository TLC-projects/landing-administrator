"use client";

import { useResettableActionState } from "@/src/hooks/use-resettable-action-state";
import { loginAction } from "@/src/lib/actions/login-actions";
import { Badge, Button, Input, PasswordInput } from "@components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const [state, formAction] = useResettableActionState(loginAction, {
    status: null,
    message: "",
  });


  useEffect(() => {
    if (state.status === true) {
      router.push("/");
    }

    if (state.status === false) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <form className="space-y-5" action={formAction}>
      <div className="space-y-2">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          className="h-12"
          required
        />
      </div>

      <div className="space-y-2">
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Ingresa contraseña"
          className="h-12"
          required
        />
      </div>
      

      {/* Mensaje de error */}
      {showError && (
        <Badge className="text-sm text-center mb-2 bg-primary/10 self-center">
          {state.message || "Credenciales incorrectas"}
        </Badge>
      )}

      <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full h-12">
        {state.status === null ? "Iniciando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};
