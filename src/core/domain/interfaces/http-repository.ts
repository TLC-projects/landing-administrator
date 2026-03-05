export interface HttpRepository<T = any> {
  // Métodos HTTP básicos
  get<R = T>(url: string, options?: RequestInit): Promise<R | null>;
  post<R = T>(url: string, data: any, options?: RequestInit): Promise<R | null>;
  put<R = T>(url: string, data: any, options?: RequestInit): Promise<R | null>;
  delete<R = boolean>(url: string, options?: RequestInit): Promise<R>;
  
  // Método utilitario para añadir autenticación
  fetchWithAuth(url: string, options?: RequestInit): Promise<any>;
}