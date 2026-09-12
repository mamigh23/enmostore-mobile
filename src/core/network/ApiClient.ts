import {environment} from '../../config/environment';
import {ApiError} from './ApiError';
import {tokenStore} from '../storage/tokenStore';

const TIMEOUT_MS = 15000;

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const token = await tokenStore.getAccessToken();
    const response = await fetch(`${environment.apiBaseUrl}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
        ...(init.headers ?? {}),
      },
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      const message = payload?.message ?? 'Request failed';
      throw new ApiError(response.status, message, payload?.code);
    }
    return payload as T;
  } finally {
    clearTimeout(timeout);
  }
}
