import { getUserService } from "@/src/core/infrastructure/config/user-dependency";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const userService = await getUserService();
        const user = await userService.getCurrentUser();

        if(!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({
            id: user.getId(),
            name: user.getFullName(),
            email: user.getEmail()
        })
    } catch (error) {
        console.log('Error to get current user', error);
        return NextResponse.json({ error: 'Error to get current user' }, { status: 500 });
    }
}