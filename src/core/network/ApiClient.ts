import {environment} from '../../config/environment';
import {ApiError, mapHttpStatusToCode} from './ApiError';
import {tokenStore} from '../storage/tokenStore';

const TIMEOUT_MS = 15000;

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function hasRequestBody(init: RequestInit): boolean {
  return init.body !== undefined && init.body !== null;
}

async function parseJsonSafely(response: Response): Promise<unknown | null> {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const text = await response.text();
  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    if (response.ok) {
      throw new ApiError(response.status, 'Invalid JSON response', 'invalid_response');
    }
    return null;
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const token = await tokenStore.getAccessToken();
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...(hasRequestBody(init) ? {'Content-Type': 'application/json'} : {}),
      ...(init.headers as Record<string, string> | undefined),
    };

    const response = await fetch(joinUrl(environment.apiBaseUrl, path), {
      ...init,
      signal: controller.signal,
      headers,
    });

    const payload = (await parseJsonSafely(response)) as
      | {message?: string; code?: string}
      | null;

    if (!response.ok) {
      if (response.status === 401) {
        try {
          await tokenStore.clear();
        } catch {
          // Never allow local cleanup failure to mask the original HTTP 401.
        }
      }

      throw new ApiError(
        response.status,
        payload?.message ?? 'Request failed',
        payload?.code ?? mapHttpStatusToCode(response.status),
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(0, 'Request timed out', 'timeout');
    }

    throw new ApiError(0, error instanceof Error ? error.message : 'Network request failed', 'network');
  } finally {
    clearTimeout(timeout);
  }
}
