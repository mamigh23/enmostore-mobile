import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../shared/Screen';
import { useLocale } from '../core/localization/LocaleProvider';
export function HomeScreen() {
  const { t } = useLocale();
  return (
    <Screen title={t('home')}>
      <Text>{t('welcome')}</Text>
    </Screen>
  );
}
