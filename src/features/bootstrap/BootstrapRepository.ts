import { apiRequest } from '../../core/network/ApiClient';
import type { ApiRequester } from '../../core/network/contracts';
import {
  asRecord,
  asString,
  invalidResponse,
  mapSuccessEnvelope,
} from '../../core/network/validation';
import type { Currency } from '../../domain/Money';

export type SupportedLocale = 'tr' | 'en' | 'de' | 'ja';

export interface Bootstrap {
  supportedLocales: SupportedLocale[];
  currency: Currency;
}

function mapBootstrap(value: unknown): Bootstrap {
  const record = asRecord(value);
  if (!Array.isArray(record.supportedLocales)) {
    return invalidResponse();
  }
  const supportedLocales = record.supportedLocales.map(value => {
    const locale = asString(value);
    return locale === 'tr' || locale === 'en' || locale === 'de' || locale === 'ja'
      ? locale
      : invalidResponse();
  });
  const currency = asString(record.currency);
  if (currency !== 'TRY' && currency !== 'EUR') {
    return invalidResponse();
  }
  return { supportedLocales, currency };
}

export class BootstrapRepository {
  constructor(private readonly request: ApiRequester = apiRequest) {}

  async getBootstrap(): Promise<Bootstrap> {
    const payload = await this.request<unknown>('/api/v1/bootstrap', {
      method: 'GET',
    });
    return mapSuccessEnvelope(payload, mapBootstrap).data;
  }
}
