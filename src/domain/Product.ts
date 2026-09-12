import type { Money } from './Money';

export interface ProductListItem {
  id: number;
  name: string;
  price: Money;
  imageUrl: string | null;
  inStock: boolean;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: Money;
  images: string[];
  inStock: boolean;
  sizes: string[];
  colors: string[];
}
