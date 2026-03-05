import { jwtVerify, SignJWT } from 'jose';

/**
 * This module provides functions to encrypt, decrypt, and verify JWT tokens.
 * It uses the 'jose' library for handling JWTs.
 */
const getJWTSecretKey = () => {
    const secretKey = process.env.SESSION_SECRET;
    if (!secretKey ) {
        throw new Error('JWT secret is not defined');
    }
    return new TextEncoder().encode(secretKey);
}

export async function encrypt<T>(payload: T): Promise<string> {
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour

    return new SignJWT(payload as Record<string, any>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(getJWTSecretKey());
}

export async function decrypt<T>(token: string): Promise<T> {
    try {
        const { payload } = await jwtVerify<T>(token, getJWTSecretKey(), {
            algorithms: ['HS256'],
        });
        return payload;
    } catch  {
        throw new Error('Invalid token');
    }
}

export async function verify(token: string | undefined): Promise<boolean> {
    if (!token) return false;
    try {
        await decrypt(token);
        return true;
    } catch {
        return false;
    }
}