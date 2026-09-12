import type { apiRequest } from './ApiClient';

export interface SuccessEnvelope<T> {
  data: T;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginatedEnvelope<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export type ApiRequester = typeof apiRequest;
