import { apiRequest } from '../../core/network/ApiClient';
import type {
  ApiRequester,
  PaginationMeta,
  PaginationParams,
} from '../../core/network/contracts';
import {
  buildPaginationQuery,
  mapPaginatedEnvelope,
  mapSuccessEnvelope,
} from '../../core/network/validation';
import type { ProductDetail, ProductListItem } from '../../domain/Product';
import { mapProductDetail, mapProductListItem } from './catalogMappers';

export interface ProductPage {
  items: ProductListItem[];
  meta: PaginationMeta;
}

export class ProductRepository {
  constructor(private readonly request: ApiRequester = apiRequest) {}

  async getProducts(params?: PaginationParams): Promise<ProductPage> {
    const query = buildPaginationQuery(params);
    const path = query ? `/api/v1/products?${query}` : '/api/v1/products';
    const payload = await this.request<unknown>(path, { method: 'GET' });
    const mapped = mapPaginatedEnvelope(payload, mapProductListItem);
    return { items: mapped.data, meta: mapped.meta };
  }

  async getProduct(id: number): Promise<ProductDetail> {
    const payload = await this.request<unknown>(`/api/v1/products/${id}`, {
      method: 'GET',
    });
    return mapSuccessEnvelope(payload, mapProductDetail).data;
  }
}
