import { decodeJwt } from 'jose';

/**
 * Checks if a JWT token is near expiration
 * @param token - The JWT token to check
 * @param thresholdMinutes - Minutes before expiration to consider "near" (default: 3)
 * @returns boolean indicating if token needs renewal
 */
export function isTokenNearExpiration(token: string, thresholdMinutes: number = 3): boolean {
  try {
    const payload = decodeJwt(token);
    if (typeof payload.exp !== 'number') return false;
    const thresholdMs = thresholdMinutes * 60 * 1000;
    return payload.exp * 1000 - Date.now() < thresholdMs;
  } catch {
    return false;
  }
}

/**
 * Gets the expiration time of a JWT token
 * @param token - The JWT token
 * @returns Date object of expiration or null if invalid
 */
export function getTokenExpiration(token: string): Date | null {
  try {
    const payload = decodeJwt(token);
    if (typeof payload.exp !== 'number') return null;
    return new Date(payload.exp * 1000);
  } catch {
    return null;
  }
}

/**
 * Gets the remaining time until token expiration
 * @param token - The JWT token
 * @returns milliseconds until expiration or 0 if expired/invalid
 */
export function getTimeUntilExpiration(token: string): number {
  try {
    const payload = decodeJwt(token);
    if (typeof payload.exp !== 'number') return 0;
    const timeLeft = payload.exp * 1000 - Date.now();
    return Math.max(0, timeLeft);
  } catch {
    return 0;
  }
}