import React from 'react';
import { Screen } from '../shared/Screen';
import { useLocale } from '../core/localization/LocaleProvider';
export function FavoritesScreen() {
  const { t } = useLocale();
  return <Screen title={t('favorites')} />;
}
