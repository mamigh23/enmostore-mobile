import { ApiError } from '../src/core/network/ApiError';
import type { ApiRequester } from '../src/core/network/contracts';
import { BootstrapRepository } from '../src/features/bootstrap/BootstrapRepository';
import { CategoryRepository } from '../src/features/catalog/CategoryRepository';
import { ProductRepository } from '../src/features/catalog/ProductRepository';
import { SearchRepository } from '../src/features/search/SearchRepository';

const meta = { page: 1, perPage: 20, total: 1, totalPages: 1 };
const listProduct = {
  id: 1,
  name: 'Perfume',
  price: { amount: 1200, currency: 'TRY' },
  imageUrl: null,
  inStock: true,
};

function requester(payload: unknown): {
  request: jest.MockedFunction<ApiRequester>;
} {
  const request = jest.fn(
    async (_path: string, _init?: RequestInit) => payload,
  );
  return { request: request as unknown as jest.MockedFunction<ApiRequester> };
}

describe('Phase 3 repositories', () => {
  test('maps valid bootstrap', async () => {
    const { request } = requester({
      data: { supportedLocales: ['tr', 'en', 'de', 'ja'], currency: 'EUR' },
    });
    await expect(
      new BootstrapRepository(request).getBootstrap(),
    ).resolves.toEqual({
      supportedLocales: ['tr', 'en', 'de', 'ja'],
      currency: 'EUR',
    });
    expect(request).toHaveBeenCalledWith('/api/v1/bootstrap', {
      method: 'GET',
    });
  });

  test.each([
    { supportedLocales: ['tr', 'xx'], currency: 'TRY' },
    { supportedLocales: ['tr'], currency: 'USD' },
  ])('rejects invalid bootstrap values', async (data) => {
    const { request } = requester({ data });
    await expect(
      new BootstrapRepository(request).getBootstrap(),
    ).rejects.toMatchObject({
      code: 'invalid_response',
    });
  });

  test('maps product list and pagination', async () => {
    const { request } = requester({ data: [listProduct], meta });
    const result = await new ProductRepository(request).getProducts({
      page: 1,
    });
    expect(result).toEqual({ items: [listProduct], meta });
    expect(request).toHaveBeenCalledWith('/api/v1/products?page=1', {
      method: 'GET',
    });
  });

  test('omits undefined product pagination', async () => {
    const { request } = requester({ data: [listProduct], meta });
    await new ProductRepository(request).getProducts();
    expect(request).toHaveBeenCalledWith('/api/v1/products', { method: 'GET' });
  });

  test('maps product detail', async () => {
    const detail = {
      id: 1,
      name: 'Perfume',
      description: 'Description',
      price: { amount: 100, currency: 'EUR' },
      images: ['https://example.com/a.jpg'],
      inStock: true,
      sizes: ['50ml'],
      colors: ['black'],
    };
    const { request } = requester({ data: detail });
    await expect(new ProductRepository(request).getProduct(1)).resolves.toEqual(
      detail,
    );
    expect(request).toHaveBeenCalledWith('/api/v1/products/1', {
      method: 'GET',
    });
  });

  test.each([
    { ...listProduct, id: 0 },
    { ...listProduct, name: 5 },
    { ...listProduct, inStock: 'yes' },
    { ...listProduct, price: { amount: '1200', currency: 'TRY' } },
    { ...listProduct, price: { amount: 1200, currency: 'USD' } },
  ])('rejects malformed product list values', async (product) => {
    const { request } = requester({ data: [product], meta });
    await expect(
      new ProductRepository(request).getProducts(),
    ).rejects.toMatchObject({
      code: 'invalid_response',
    });
  });

  test.each([{ images: 'bad' }, { sizes: [1] }, { colors: [false] }])(
    'rejects malformed detail arrays',
    async (change) => {
      const detail = {
        id: 1,
        name: 'Perfume',
        description: 'Description',
        price: { amount: 100, currency: 'EUR' },
        images: [],
        inStock: true,
        sizes: [],
        colors: [],
        ...change,
      };
      const { request } = requester({ data: detail });
      await expect(
        new ProductRepository(request).getProduct(1),
      ).rejects.toMatchObject({
        code: 'invalid_response',
      });
    },
  );

  test('maps root and child categories', async () => {
    const categories = [
      { id: 1, name: 'Root', parentId: null, imageUrl: null },
      {
        id: 2,
        name: 'Child',
        parentId: 1,
        imageUrl: 'https://example.com/c.jpg',
      },
    ];
    const { request } = requester({ data: categories });
    await expect(
      new CategoryRepository(request).getCategories(),
    ).resolves.toEqual(categories);
    expect(request).toHaveBeenCalledWith('/api/v1/categories', {
      method: 'GET',
    });
  });

  test('rejects malformed category parentId', async () => {
    const { request } = requester({
      data: [{ id: 2, name: 'Child', parentId: 0, imageUrl: null }],
    });
    await expect(
      new CategoryRepository(request).getCategories(),
    ).rejects.toMatchObject({
      code: 'invalid_response',
    });
  });

  test.each([
    { page: 0, perPage: 20, total: 1, totalPages: 1 },
    { page: 1.2, perPage: 20, total: 1, totalPages: 1 },
    { page: 1, perPage: -1, total: 1, totalPages: 1 },
    { page: 1, perPage: 20, total: -1, totalPages: 1 },
  ])('rejects invalid pagination metadata', async (invalidMeta) => {
    const { request } = requester({ data: [listProduct], meta: invalidMeta });
    await expect(
      new ProductRepository(request).getProducts(),
    ).rejects.toMatchObject({
      code: 'invalid_response',
    });
  });

  test('trims and safely encodes search query with pagination', async () => {
    const { request } = requester({ data: [listProduct], meta });
    await new SearchRepository(request).searchProducts('  rose & oud  ', {
      page: 2,
      perPage: 10,
    });
    const [path, init] = request.mock.calls[0];
    expect(path).toBe('/api/v1/search?q=rose%20%26%20oud&page=2&perPage=10');
    expect(init).toEqual({ method: 'GET' });
  });

  test('rejects empty search before making a request', async () => {
    const { request } = requester({
      data: [],
      meta: { ...meta, total: 0, totalPages: 0 },
    });
    await expect(
      new SearchRepository(request).searchProducts('   '),
    ).rejects.toBeInstanceOf(ApiError);
    expect(request).not.toHaveBeenCalled();
  });
});
