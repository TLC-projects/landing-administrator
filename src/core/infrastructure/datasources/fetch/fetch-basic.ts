import { HttpRepository } from '@core/domain/interfaces/http-repository';
import { fail, HttpError, NetworkError, ok, Result } from '@lib/errors';
export class BasicFetchClient<T = any> implements HttpRepository<T> {
  private baseApiUrl: string;

  constructor(baseApiUrl: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
    this.baseApiUrl = baseApiUrl;
  }

  /***
   * Method to perform fetch requests without authentication, with error management.
   * It processes the response and if the response is not ok, it throws an HttpError with the status code and message.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the request is sent.
   * @param options Optional RequestInit object to customize the fetch request (method, headers, body, etc.).
   * @returns The parsed JSON response from the server or null for 204 No Content responses.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async get<R = T>(url: string, options: RequestInit = {}): Promise<Result<R | null>> {
    let response: Response;
    try {
      response = await fetch(`${this.baseApiUrl}/${url}`, { method: 'GET', ...options });
    } catch {
      return fail(new NetworkError());
    }
    if (!response.ok) {
      const fetchError = await response.json().catch(() => ({}));
      return fail(new HttpError(response.status, fetchError.message || `HTTP ${response.status}`));
    }
    if (response.status === 204) return ok(null);
    return ok(await response.json());
  }

  /**
   * Method to perform a POST request to the specified URL with the provided data and optional fetch options.
   * It checks if the data is an instance of FormData to determine how to set the body and headers.
   * If the response is not ok, it throws an HttpError with the status code and message.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the POST request is sent.
   * @param data The data to be sent in the body of the POST request, can be an object or FormData.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.).
   * @returns The parsed JSON response from the server or null if no content is returned.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async post<R = T>(url: string, data: any, options: RequestInit = {}): Promise<Result<R | null>> {
    const isFormData = data instanceof FormData;
    let response: Response;
    try {
      response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: 'POST',
        body: isFormData ? data : JSON.stringify(data),
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          ...((options.headers as Record<string, string>) || {})
        },
        ...options
      });
    } catch {
      return fail(new NetworkError());
    }
    if (!response.ok) {
      const fetchError = await response.json().catch(() => ({}));
      return fail(new HttpError(response.status, fetchError.message || `HTTP ${response.status}`));
    }
    if (response.status === 204) return ok(null);
    return ok(await response.json());
  }

  /**
   * Method to perform a PUT request to the specified URL with the provided data and optional fetch options.
   * It sends the data as JSON and sets the appropriate Content-Type header.
   * If the response is not ok, it throws an HttpError with the status code and message.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the PUT request is sent.
   * @param data The data to be sent in the body of the PUT request, should be an object that will be JSON-stringified.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.).
   * @returns The parsed JSON response from the server or null if no content is returned.
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async put<R = T>(url: string, data: any, options: RequestInit = {}): Promise<Result<R | null>> {
    let response: Response;
    try {
      response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...((options.headers as Record<string, string>) || {})
        },
        ...options
      });
    } catch {
      return fail(new NetworkError());
    }
    if (!response.ok) {
      const fetchError = await response.json().catch(() => ({}));
      return fail(new HttpError(response.status, fetchError.message || `HTTP ${response.status}`));
    }
    return ok(await response.json());
  }

  /**
   * Method to perform a DELETE request to the specified URL with optional fetch options.
   * If the response is not ok, it throws an HttpError with the status code and message.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the DELETE request is sent.
   * @param options Optional RequestInit object to customize the fetch request (headers, etc.).
   * @returns True if the deletion was successful (response status is ok).
   * @throws HttpError if the response status is not ok, containing the status code and error message.
   */
  async delete<R = boolean>(url: string, options: RequestInit = {}): Promise<Result<R>> {
    let response: Response;
    try {
      response = await fetch(`${this.baseApiUrl}/${url}`, { method: 'DELETE', ...options });
    } catch {
      return fail(new NetworkError());
    }
    if (!response.ok) {
      const fetchError = await response.json().catch(() => ({}));
      return fail(new HttpError(response.status, fetchError.message || `HTTP ${response.status}`));
    }
    return ok(true as unknown as R);
  }

  /**
   * Method to perform a fetch request with authentication. It determines the HTTP method from the options and calls the corresponding method (get, post, put, delete).
   * If the method is not implemented, it throws an error.
   *
   * @param url The endpoint URL (relative to the base API URL) to which the request is sent.
   * @param options Optional RequestInit object to customize the fetch request (method, headers, body, etc.). The method defaults to GET if not specified.
   * @returns The parsed JSON response from the server or null if no content is returned.
   */
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
