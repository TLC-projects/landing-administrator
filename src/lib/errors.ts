export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class HttpError extends AppError {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message, `HTTP_${status}`);
    this.name = 'HttpError';
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isServerError() {
    return this.status >= 500 && this.status < 600;
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Error de conexión') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

export const ok = <T>(data: T): Result<T> => ({ ok: true, data });
export const fail = (error: AppError): Result<never> => ({ ok: false, error });
export const unwrap = <T>(result: Result<T>): T => {
  if (!result.ok) throw result.error;
  return result.data;
};
