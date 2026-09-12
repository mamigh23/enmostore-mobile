export type Currency = 'TRY' | 'EUR';

export interface Money {
  amount: number;
  currency: Currency;
}
