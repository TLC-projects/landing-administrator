"use client";

import { useResettableActionState } from "@/src/hooks/use-resettable-action-state";
import { loginAction } from "@/src/lib/actions/login-actions";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Input,
  PasswordInput,
} from "@components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { LoginFormValues } from "./schema/login-form-scheme";
import { CircleCheck, Loader2, TriangleAlert, X } from "lucide-react";
import { dataFetcher } from "@/src/lib/data-fetching";
import { withBasePath } from "@/src/lib/with-base-path";
import { toast } from "sonner";

export const LoginForm = () => {
  const router = useRouter();

  const [state, formAction, isLoading, reset] = useResettableActionState(
    loginAction,
    {
      status: null,
      message: "",
    },
  );

  const onSubmit = (formData: FormData) => {
    const data: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const newFormData = new FormData();
    newFormData.append("email", data.email);
    newFormData.append("password", data.password);

    startTransition(() => {
      formAction(newFormData);
    });
  };

  const resend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;

    if (!emailInput?.value) {
      toast.error("Por favor ingresa tu correo primero.");
      return;
    }

    const toastId = toast.loading("Enviando solicitud...");

    try {
      const res = await fetch(withBasePath("/api/auth/forgot-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput.value }),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success(
        "Hemos notificado al administrador para ayudarte a recuperar tu acceso.",
        { id: toastId },
      );
    } catch (error) {
      toast.error("No se pudo enviar la solicitud. Intenta nuevamente.", {
        id: toastId,
      });
    }
  };

  // Redirect on successful login
  useEffect(() => {
    if (state.status === true && state.message) {
      router.push("/");
    }
  }, [state.status, state.message, router]);

  const handleCleanUp = () => {
    startTransition(() => {
      reset();
    });
  };

  return (
    <>
      <form className="space-y-5" action={onSubmit}>
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
          <Button
            type="button"
            variant="link"
            className="text-sm text-primary hover:underline"
            onClick={resend}
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </div>

        <Button
          type="submit"
          aria-label={isLoading ? "Cargando..." : "Iniciar sesión"}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </form>
      {state.message && (
        <Alert
          variant={state.status ? "default" : "destructive"}
          className="mb-4 relative"
        >
          {state.status ? (
            <CircleCheck className="h-4 w-4 text-success" />
          ) : (
            <TriangleAlert className="h-4 w-4 text-destructive" />
          )}
          <AlertTitle>{state.status ? "Éxito" : "Error"}</AlertTitle>
          <AlertDescription className="pr-8 flex items-center gap-2">
            {state.message}
          </AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={handleCleanUp}
            aria-label="Cerrar mensaje"
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}
    </>
  );
};
