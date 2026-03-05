'use client';

import { useResettableActionState } from "@/src/hooks/use-resettable-action-state";
import { loginAction } from "@/src/lib/actions/login-actions";
import { Button, Input, PasswordInput } from "@components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginForm = () => {
  const router = useRouter();

  const [state, formAction] = useResettableActionState(loginAction, {
    status: null,
    message: "",
  });

  useEffect(() => {
    if (state.status === true) {
      router.push("/");
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

      <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full h-12">
        Iniciar sesión
      </Button>
    </form>
  );
};
