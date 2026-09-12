import { apiRequest } from '../../core/network/ApiClient';
import type {
  ApiRequester,
  PaginationMeta,
  PaginationParams,
} from '../../core/network/contracts';
import {
  buildPaginationQuery,
  mapPaginatedEnvelope,
} from '../../core/network/validation';
import { ApiError } from '../../core/network/ApiError';
import type { ProductListItem } from '../../domain/Product';
import { mapProductListItem } from '../catalog/catalogMappers';

export interface SearchPage {
  items: ProductListItem[];
  meta: PaginationMeta;
}

export class SearchRepository {
  constructor(private readonly request: ApiRequester = apiRequest) {}

  async searchProducts(
    rawQuery: string,
    params?: PaginationParams,
  ): Promise<SearchPage> {
    const searchTerm = rawQuery.trim();
    if (!searchTerm) {
      throw new ApiError(0, 'Search query is required', 'validation');
    }

    const query = buildPaginationQuery(params);
    query.set('q', searchTerm);
    const payload = await this.request<unknown>(
      `/api/v1/search?${query.toString()}`,
      { method: 'GET' },
    );
    const mapped = mapPaginatedEnvelope(payload, mapProductListItem);
    return { items: mapped.data, meta: mapped.meta };
  }
}
