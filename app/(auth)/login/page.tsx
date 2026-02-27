import { Metadata } from "next";
import { Input, PasswordInput, Button } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { Shell } from "@/components/layouts";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Content Administrator",
  description: "Inicia sesión en el administrador de contenido",
};

export default function LoginPage() {
  return (
    <Shell className="grid min-h-screen lg:grid-cols-2">

      <section className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <header className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Admin</h1>
            <p className="text-sm text-muted-foreground">
              Ingresa tu correo abajo para iniciar sesión en tu cuenta
            </p>
          </header>

          <form className="space-y-4 gap-4 grid" action="#" method="POST">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Correo
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contraseña
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  ¿Se te olvidó la contraseña?
                </Link>
              </div>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="*********"
                required
              />
            </div>

            <Button type="submit" size="lg">
              Iniciar sesión
            </Button>
          </form>
        </div>
      </section>

      <aside className="hidden lg:flex items-center justify-center bg-muted/50 p-8">
        <div className="flex items-center justify-center w-full max-w-md h-96 bg-muted rounded-lg">
          <Image
            src="/placeholder-image.svg"
            alt=""
            width={200}
            height={200}
            className="opacity-50"
            aria-hidden="true"
          />
        </div>
      </aside>
    </Shell>
  );
}