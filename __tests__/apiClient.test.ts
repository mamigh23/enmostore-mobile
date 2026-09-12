jest.mock('../src/core/storage/tokenStore', () => ({
  tokenStore: {
    getAccessToken: jest.fn(),
    clear: jest.fn(),
  },
}));

import {apiRequest} from '../src/core/network/ApiClient';
import {ApiError} from '../src/core/network/ApiError';
import {tokenStore} from '../src/core/storage/tokenStore';

const mockedTokenStore = tokenStore as jest.Mocked<typeof tokenStore>;
const mockFetch = jest.fn();

type MockResponseOptions = {
  status?: number;
  ok?: boolean;
  body?: string;
};

function mockResponse({status = 200, ok = true, body = ''}: MockResponseOptions = {}): Response {
  return {
    status,
    ok,
    text: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe('apiRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedTokenStore.getAccessToken.mockResolvedValue(null);
    mockedTokenStore.clear.mockResolvedValue(undefined);
    (globalThis as {fetch?: typeof fetch}).fetch = mockFetch as unknown as typeof fetch;
  });

  it('normalizes URL slashes', async () => {
    mockFetch.mockResolvedValue(mockResponse({body: '{"ok":true}'}));

    await apiRequest('/products');

    expect(mockFetch).toHaveBeenCalledWith(
      'http://10.0.2.2:8080/api/v1/products',
      expect.any(Object),
    );
  });

  it('returns null for successful empty responses', async () => {
    mockFetch.mockResolvedValue(mockResponse({status: 204, body: ''}));

    await expect(apiRequest('/empty')).resolves.toBeNull();
  });

  it('adds Content-Type only when a request body exists', async () => {
    mockFetch.mockResolvedValue(mockResponse({body: '{}'}));

    await apiRequest('/products');
    const firstInit = mockFetch.mock.calls[0][1] as RequestInit;
    expect(firstInit.headers).not.toHaveProperty('Content-Type');

    await apiRequest('/products', {method: 'POST', body: JSON.stringify({name: 'test'})});
    const secondInit = mockFetch.mock.calls[1][1] as RequestInit;
    expect(secondInit.headers).toHaveProperty('Content-Type', 'application/json');
  });

  it('adds a bearer token when secure storage returns one', async () => {
    mockedTokenStore.getAccessToken.mockResolvedValue('test-token');
    mockFetch.mockResolvedValue(mockResponse({body: '{}'}));

    await apiRequest('/account');

    const init = mockFetch.mock.calls[0][1] as RequestInit;
    expect(init.headers).toHaveProperty('Authorization', 'Bearer test-token');
  });

  it('normalizes malformed successful JSON to ApiError', async () => {
    mockFetch.mockResolvedValue(mockResponse({body: 'not-json'}));

    await expect(apiRequest('/broken')).rejects.toMatchObject({
      status: 200,
      code: 'invalid_response',
      name: 'ApiError',
    });
  });

  it('preserves an authoritative 401 even when token cleanup fails', async () => {
    mockedTokenStore.clear.mockRejectedValue(new Error('secure storage unavailable'));
    mockFetch.mockResolvedValue(
      mockResponse({status: 401, ok: false, body: '{"message":"Session expired"}'}),
    );

    try {
      await apiRequest('/account');
      throw new Error('Expected request to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toMatchObject({
        status: 401,
        code: 'unauthorized',
        message: 'Session expired',
      });
    }

    expect(mockedTokenStore.clear).toHaveBeenCalledTimes(1);
  });
});
