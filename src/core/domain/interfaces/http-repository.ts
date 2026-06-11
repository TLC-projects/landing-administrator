import { Result } from '@lib/errors';
export interface HttpRepository<T = any> {
  get<R = T>(url: string, options?: RequestInit): Promise<Result<R | null>>;
  post<R = T>(url: string, data: any, options?: RequestInit): Promise<Result<R | null>>;
  put<R = T>(url: string, data: any, options?: RequestInit): Promise<Result<R | null>>;
  delete<R = boolean>(url: string, options?: RequestInit): Promise<Result<R>>;
  fetchWithAuth(url: string, options?: RequestInit): Promise<any>;
}
