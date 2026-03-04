import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { SessionRepository } from '@core/domain/interfaces/session-repository';

export class FetchClient<T = any> implements HttpRepository<T> {
  private baseApiUrl: string;
  private sessionRepository: SessionRepository;

  constructor(baseApiUrl: string, sessionRepository: SessionRepository) {
    this.baseApiUrl = baseApiUrl;
    this.sessionRepository = sessionRepository;
  }

  private async getValidToken(): Promise<string | null> {
    const session = await this.sessionRepository.getSession();
    if (!session || !session.token) {
      return null;
    }

    return session.token;
  }

  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getValidToken();

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      ...((options.headers as Record<string, string>) || {})
    };

    const response = await fetch(`${this.baseApiUrl}/${url}`, {
      ...options,
      headers
    });

    // Manage HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  async get<R = T>(url: string, options: RequestInit = {}): Promise<R | null> {
    try {
      return await this.fetchWithAuth(url, {
        method: 'GET',
        ...options
      });
    } catch (error) {
      console.error(`Error in GET ${url}:`, error);
      return null;
    }
  }

  async post<R = T>(url: string, data: any, options: RequestInit = {}): Promise<R | null> {
    try {
      // Verify if data is FormData, this is useful for conditions if the request is multipart/form-data
      const isFormData = data instanceof FormData;

      return await this.fetchWithAuth(url, {
        method: 'POST',
        body: isFormData ? data : JSON.stringify(data),
        headers: isFormData ? {} : { 'Content-Type': 'application/json' }, // Set content type only if not FormData
        ...options
      });
    } catch (error) {
      console.error(`Error in POST ${url}:`, error);
      return null;
    }
  }

  async put<R = T>(url: string, data: any, options: RequestInit = {}): Promise<R | null> {
    try {
      const isFormData = data instanceof FormData;

      return await this.fetchWithAuth(url, {
        method: 'PUT',
        body: isFormData ? data : JSON.stringify(data),
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        ...options
      });
    } catch (error) {
      console.error(`Error in PUT ${url}:`, error);
      return null;
    }
  }

  async delete<R = boolean>(url: string, options: RequestInit = {}): Promise<R> {
    try {
      const result = await this.fetchWithAuth(url, {
        method: 'DELETE',
        ...options
      });

      return (result !== null ? result : true) as R;
    } catch (error) {
      console.error(`Error in DELETE ${url}:`, error);
      return false as unknown as R;
    }
  }
}
