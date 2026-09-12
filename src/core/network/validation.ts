import { ApiError } from './ApiError';
import type {
  PaginatedEnvelope,
  PaginationMeta,
  SuccessEnvelope,
} from './contracts';

export function invalidResponse(message = 'Invalid API response'): never {
  throw new ApiError(0, message, 'invalid_response');
}

export function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return invalidResponse();
  }
  return value as Record<string, unknown>;
}

export function asString(value: unknown): string {
  return typeof value === 'string' ? value : invalidResponse();
}

export function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : invalidResponse();
}

export function asFiniteNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : invalidResponse();
}

export function asPositiveId(value: unknown): number {
  const id = asFiniteNumber(value);
  return Number.isInteger(id) && id > 0 ? id : invalidResponse();
}

export function asNullableString(value: unknown): string | null {
  return value === null ? null : asString(value);
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return invalidResponse();
  }
  return value.map(asString);
}

export function mapSuccessEnvelope<T>(
  value: unknown,
  mapper: (data: unknown) => T,
): SuccessEnvelope<T> {
  const record = asRecord(value);
  return { data: mapper(record.data) };
}

export function mapPaginationMeta(value: unknown): PaginationMeta {
  const record = asRecord(value);
  const page = asFiniteNumber(record.page);
  const perPage = asFiniteNumber(record.perPage);
  const total = asFiniteNumber(record.total);
  const totalPages = asFiniteNumber(record.totalPages);

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(perPage) ||
    perPage < 1 ||
    !Number.isInteger(total) ||
    total < 0 ||
    !Number.isInteger(totalPages) ||
    totalPages < 0 ||
    (total > 0 && totalPages < 1)
  ) {
    return invalidResponse();
  }

  return { page, perPage, total, totalPages };
}

export function mapPaginatedEnvelope<T>(
  value: unknown,
  mapper: (data: unknown) => T,
): PaginatedEnvelope<T> {
  const record = asRecord(value);
  if (!Array.isArray(record.data)) {
    return invalidResponse();
  }
  return {
    data: record.data.map(mapper),
    meta: mapPaginationMeta(record.meta),
  };
}

export function buildPaginationQuery(params?: {
  page?: number;
  perPage?: number;
}): URLSearchParams {
  const query = new URLSearchParams();
  if (params?.page !== undefined) {
    query.set('page', String(params.page));
  }
  if (params?.perPage !== undefined) {
    query.set('perPage', String(params.perPage));
  }
  return query;
}
