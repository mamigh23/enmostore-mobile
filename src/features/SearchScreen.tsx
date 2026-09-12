import React from 'react';
import { Screen } from '../shared/Screen';
import { useLocale } from '../core/localization/LocaleProvider';
export function SearchScreen() {
  const { t } = useLocale();
  return <Screen title={t('search')} />;
}
