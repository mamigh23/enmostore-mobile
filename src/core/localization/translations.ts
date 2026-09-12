export type Locale = 'tr' | 'en' | 'de' | 'ja';
export const translations = {
  tr: {
    home: 'Ana Sayfa',
    explore: 'Keşfet',
    search: 'Ara',
    favorites: 'Favoriler',
    cart: 'Sepet',
    account: 'Hesabım',
    welcome: 'EnmoStore mobil deneyimine hoş geldin.',
  },
  en: {
    home: 'Home',
    explore: 'Explore',
    search: 'Search',
    favorites: 'Favorites',
    cart: 'Cart',
    account: 'Account',
    welcome: 'Welcome to the EnmoStore mobile experience.',
  },
  de: {
    home: 'Start',
    explore: 'Entdecken',
    search: 'Suche',
    favorites: 'Favoriten',
    cart: 'Warenkorb',
    account: 'Konto',
    welcome: 'Willkommen bei EnmoStore Mobile.',
  },
  ja: {
    home: 'ホーム',
    explore: '探す',
    search: '検索',
    favorites: 'お気に入り',
    cart: 'カート',
    account: 'アカウント',
    welcome: 'EnmoStore モバイルへようこそ。',
  },
} as const;
