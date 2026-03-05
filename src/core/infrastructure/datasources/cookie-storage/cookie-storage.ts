import { cookies } from 'next/headers';


interface CookieOptions {
  path?: string;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class CookieStorage {
  async set(key: string, value: string, options: CookieOptions) {
    const cookieStore = await cookies();
    cookieStore.set(key, value, options);
  }

  async get(key: string): Promise<string | null> {
    return (await cookies()).get(key)?.value || null;
  }

  async remove(key: string) {
    (await cookies()).delete(key);
  }
}
