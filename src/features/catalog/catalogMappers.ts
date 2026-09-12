import type { Category } from '../../domain/Category';
import type { Money, Currency } from '../../domain/Money';
import type { ProductDetail, ProductListItem } from '../../domain/Product';
import {
  asBoolean,
  asFiniteNumber,
  asNullableString,
  asPositiveId,
  asRecord,
  asString,
  asStringArray,
  invalidResponse,
} from '../../core/network/validation';

export function mapMoney(value: unknown): Money {
  const record = asRecord(value);
  const amount = asFiniteNumber(record.amount);
  const currency = asString(record.currency);
  if (currency !== 'TRY' && currency !== 'EUR') {
    return invalidResponse();
  }
  return { amount, currency: currency as Currency };
}

export function mapProductListItem(value: unknown): ProductListItem {
  const record = asRecord(value);
  return {
    id: asPositiveId(record.id),
    name: asString(record.name),
    price: mapMoney(record.price),
    imageUrl: asNullableString(record.imageUrl),
    inStock: asBoolean(record.inStock),
  };
}

export function mapProductDetail(value: unknown): ProductDetail {
  const record = asRecord(value);
  return {
    id: asPositiveId(record.id),
    name: asString(record.name),
    description: asString(record.description),
    price: mapMoney(record.price),
    images: asStringArray(record.images),
    inStock: asBoolean(record.inStock),
    sizes: asStringArray(record.sizes),
    colors: asStringArray(record.colors),
  };
}

export function mapCategory(value: unknown): Category {
  const record = asRecord(value);
  const parentId = record.parentId === null ? null : asPositiveId(record.parentId);
  return {
    id: asPositiveId(record.id),
    name: asString(record.name),
    parentId,
    imageUrl: asNullableString(record.imageUrl),
  };
}
