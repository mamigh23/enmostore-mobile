export type ApiErrorCode =
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'validation'
  | 'rate_limited'
  | 'server_error'
  | 'timeout'
  | 'network'
  | 'invalid_response'
  | 'unknown';

export function mapHttpStatusToCode(status: number): ApiErrorCode {
  switch (status) {
    case 400:
      return 'bad_request';
    case 401:
      return 'unauthorized';
    case 403:
      return 'forbidden';
    case 404:
      return 'not_found';
    case 409:
      return 'conflict';
    case 422:
      return 'validation';
    case 429:
      return 'rate_limited';
    default:
      return status >= 500 ? 'server_error' : 'unknown';
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code: string = mapHttpStatusToCode(status),
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
