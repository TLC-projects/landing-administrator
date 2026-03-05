import { HttpRepository } from "@/src/core/domain/interfaces/http-repository";


export class BasicFetchClient<T = any> implements HttpRepository<T> {
  private baseApiUrl: string;

  constructor(baseApiUrl: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
    this.baseApiUrl = baseApiUrl;
  }

  async get<R = T>(url: string, options: RequestInit = {}): Promise<R | null> {
    try {
      const response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: 'GET',
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Error in GET ${url}:`, error);
      return null;
    }
  }

  async post<R = T>(url: string, data: any, options: RequestInit = {}): Promise<R | null> {
    try {
      const isFormData = data instanceof FormData;

      const response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: 'POST',
        body: isFormData ? data : JSON.stringify(data),
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          ...((options.headers as Record<string, string>) || {})
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Error in POST ${url}:`, error);
      return null;
    }
  }

  async put<R = T>(url: string, data: any, options: RequestInit = {}): Promise<R | null> {
    try {
      const response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...((options.headers as Record<string, string>) || {})
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error in PUT ${url}:`, error);
      return null;
    }
  }

  async delete<R = boolean>(url: string, options: RequestInit = {}): Promise<R> {
    try {
      const response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: 'DELETE',
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true as unknown as R;
    } catch (error) {
      console.error(`Error in DELETE ${url}:`, error);
      return false as unknown as R;
    }
  }

  // Método requerido por la interfaz, pero sin autenticación
  async fetchWithAuth(url: string, options?: RequestInit): Promise<any> {
    const method = options?.method || 'GET';

    switch (method.toUpperCase()) {
      case 'GET':
        return this.get(url, options);
      case 'POST':
        const body = options?.body;
        const data = body instanceof FormData ? body : body ? JSON.parse(body as string) : {};
        return this.post(url, data, options);
      case 'PUT':
        return this.put(url, JSON.parse((options?.body as string) || '{}'), options);
      case 'DELETE':
        return this.delete(url, options);
      default:
        throw new Error(`Method ${method} not implemented`);
    }
  }
}
