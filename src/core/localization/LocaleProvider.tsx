import React, {createContext, useContext, useMemo, useState} from 'react';
import {Locale, translations} from './translations';

type TranslationKey = keyof typeof translations.en;
type ContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<ContextValue | null>(null);

export function LocaleProvider({children}: {children: React.ReactNode}) {
  const [locale, setLocale] = useState<Locale>('tr');

  const value = useMemo<ContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: TranslationKey) => translations[locale]?.[key] ?? translations.en[key] ?? key,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return value;
}
