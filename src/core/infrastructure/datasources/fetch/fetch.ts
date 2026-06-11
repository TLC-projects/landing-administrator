import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { SessionRepository } from '@core/domain/interfaces/session-repository';
import { isTokenNearExpiration } from '@lib/auth/token-utils';
import { AppError, fail, HttpError, NetworkError, ok, Result } from '@lib/errors';

export class FetchClient<T = any> implements HttpRepository<T> {
  private baseApiUrl: string;
  private sessionRepository: SessionRepository;

  constructor(baseApiUrl: string = process.env.NEXT_PUBLIC_API_URL || '/api', sessionRepository: SessionRepository) {
    this.baseApiUrl = baseApiUrl;
    this.sessionRepository = sessionRepository;
  }

  /**
   * Method to get a valid token, if the token is near expiration, it waits a bit for the middleware to renew it
   * and then retrieves the updated token from the session repository.
   *
   * @returns A valid token string or null if no session/token is available.
   */
  private async getValidToken(): Promise<string | null> {
    const session = await this.sessionRepository.getSession();
    if (!session || !session.token) {
      return null;
    }

    // If the token is near expiration, wait a bit for the middleware to renew it
    if (isTokenNearExpiration(session.token)) {
      // Wait for a short period to allow the middleware to renew the token
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedSession = await this.sessionRepository.getSession();
      return updatedSession?.token || null;
    }

    return session.token;
  }

  /***
   * Method to perform fetch requests with automatic token handling and error management.
   * It retrieves a valid token, adds it to the Authorization header, and processes the response.
   * If the response is not ok, it throws an HttpError with the status code and message.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the request is sent.
   * @param options Optional RequestInit object to customize the fetch request (method, headers, body, etc.).
   * @returns The parsed JSON response from the server or null for 204 No Content responses.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getValidToken();

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`, // Add the Authorization header with the valid token
      ...((options.headers as Record<string, string>) || {})
    };

    let response: Response;

    // Try to perform the fetch request and catch any network errors to throw a custom NetworkError
    try {
      response = await fetch(`${this.baseApiUrl}/${url}`, {
        ...options,
        headers
      });
    } catch {
      throw new NetworkError();
    }

    // If the response is not ok, try to parse the error message from the response body and throw an custom HttpError
    if (!response.ok) {
      const fetchError = await response.json().catch(() => ({}));
      throw new HttpError(response.status, fetchError.message || `HTTP ${response.status}`);
    }

    // If the response status is 204 No Content, return null instead of trying to parse JSON
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  /**
   * Method to perform a GET request to the specified URL with optional fetch options.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the GET request is sent.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.).
   * @returns The parsed JSON response from the server or null if no content is returned.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async get<R = T>(url: string, options: RequestInit = {}): Promise<Result<R | null>> {
    try {
      const data = await this.fetchWithAuth(url, { method: 'GET', ...options });
      return ok(data as R | null);
    } catch (err) {
      if (err instanceof AppError) return fail(err);
      return fail(new AppError(String(err), 'UNKNOWN_ERROR'));
    }
  }

  /**
   * Method to perform a POST request to the specified URL with the provided data and optional fetch options.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the POST request is sent.
   * @param data The data to be sent in the body of the POST request. It can be an object (which will be JSON-stringified) or FormData.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.). Note that the Content-Type header will be set automatically based on the data type (JSON or FormData).
   * @returns The parsed JSON response from the server or null if no content is returned.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async post<R = T>(url: string, data: any, options: RequestInit = {}): Promise<Result<R | null>> {
    const isFormData = data instanceof FormData;
    try {
      const result = await this.fetchWithAuth(url, {
        method: 'POST',
        body: isFormData ? data : JSON.stringify(data),
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        ...options
      });
      return ok(result as R | null);
    } catch (err) {
      if (err instanceof AppError) return fail(err);
      return fail(new AppError(String(err), 'UNKNOWN_ERROR'));
    }
  }

  /**
   * Method to perform a PUT request to the specified URL with the provided data and optional fetch options.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the PUT request is sent.
   * @param data The data to be sent in the body of the PUT request. It can be an object (which will be JSON-stringified) or FormData.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.). Note that the Content-Type header will be set automatically based on the data type (JSON or FormData).
   * @returns The parsed JSON response from the server or null if no content is returned.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async put<R = T>(url: string, data: any, options: RequestInit = {}): Promise<Result<R | null>> {
    const isFormData = data instanceof FormData;
    try {
      const result = await this.fetchWithAuth(url, {
        method: 'PUT',
        body: isFormData ? data : JSON.stringify(data),
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        ...options
      });
      return ok(result as R | null);
    } catch (err) {
      if (err instanceof AppError) return fail(err);
      return fail(new AppError(String(err), 'UNKNOWN_ERROR'));
    }
  }

  /**
   * Method to perform a DELETE request to the specified URL with optional fetch options.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the DELETE request is sent.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.).
   * @returns The parsed JSON response from the server, true if the response is ok but has no content, or null if the response is ok but has no content (204 No Content).
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async delete<R = boolean>(url: string, options: RequestInit = {}): Promise<Result<R>> {
    try {
      const result = await this.fetchWithAuth(url, { method: 'DELETE', ...options });
      return ok((result !== null ? result : true) as R);
    } catch (err) {
      if (err instanceof AppError) return fail(err);
      return fail(new AppError(String(err), 'UNKNOWN_ERROR'));
    }
  }
}
