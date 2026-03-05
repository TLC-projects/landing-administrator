import { Logout } from "@components/modules/auth/logout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cerrar Sesión | Content Administrator",
  description: "Cierra tu sesión",
};

export default function LogoutPage() {
  return <Logout />;
}
