"use server";

import { getAuthService } from "@/src/core/infrastructure/config/auth-dependency";

export const loginAction = async (
    state: { message: string; status: null | boolean }, 
    formData: FormData
): Promise<{ status: boolean | null; message: string }> => {
    try {

        if (!formData) {
            return {
                status: null,
                message: ''
            };
        }

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log(email, password);

        const response = await (await getAuthService()).login({ email, password });

        // Handle unsuccessful login attempts
        if (!response || response.success === false) {
            return {
                status: false,
                message: response?.message || 'No se pudo iniciar sesión. Revisa los campos e inténtalo de nuevo.'
            };
        }

        return {
            status: true,
            message: '¡Inicio de sesión exitoso!'
        };

    } catch (error) {
        console.log('Error en login:', error);
        return {
            status: false,
            message: 'No se pudo iniciar sesión. Revisa los campos e inténtalo de nuevo.'
        };
    }
}