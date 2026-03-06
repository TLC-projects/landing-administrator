import { NextRequest } from 'next/server';

/**
 * Get the request path stripped of the base path
 * @param request NextRequest object
 * @returns Stripped path as string
 */
export function getStrippedPath(request: NextRequest): string {
  // Get the base path from the .env variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // If the base path is empty, return the full path
  if (!basePath) {
    return request.nextUrl.pathname || '/';
  }

  const fullPath = request.nextUrl.pathname;

  return fullPath.startsWith(basePath) ? fullPath.slice(basePath.length) || '/' : fullPath;
}
