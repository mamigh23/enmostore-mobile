import React from 'react';
import { Screen } from '../shared/Screen';
import { useLocale } from '../core/localization/LocaleProvider';
export function CartScreen() {
  const { t } = useLocale();
  return <Screen title={t('cart')} />;
}
