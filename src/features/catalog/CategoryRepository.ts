import { apiRequest } from '../../core/network/ApiClient';
import type { ApiRequester } from '../../core/network/contracts';
import { asRecord, invalidResponse } from '../../core/network/validation';
import type { Category } from '../../domain/Category';
import { mapCategory } from './catalogMappers';

export class CategoryRepository {
  constructor(private readonly request: ApiRequester = apiRequest) {}

  async getCategories(): Promise<Category[]> {
    const payload = asRecord(
      await this.request<unknown>('/api/v1/categories', { method: 'GET' }),
    );
    if (!Array.isArray(payload.data)) {
      return invalidResponse();
    }
    return payload.data.map(mapCategory);
  }
}
