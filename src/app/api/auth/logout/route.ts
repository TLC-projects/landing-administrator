import { getAuthService } from '@core/infrastructure/config/auth-dependency';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const authService = await getAuthService();
        const result = await authService.logout();

        if (!result.success) {
            return NextResponse.json({ message: 'Error al cerrar sesión' }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
