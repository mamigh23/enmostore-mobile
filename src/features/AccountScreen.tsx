import React from 'react';
import { View } from 'react-native';
import { Screen } from '../shared/Screen';
import { PrimaryButton } from '../shared/PrimaryButton';
import { useLocale } from '../core/localization/LocaleProvider';
export function AccountScreen() {
  const { t, locale, setLocale } = useLocale();
  const next =
    locale === 'tr'
      ? 'en'
      : locale === 'en'
        ? 'de'
        : locale === 'de'
          ? 'ja'
          : 'tr';
  return (
    <Screen title={t('account')}>
      <View>
        <PrimaryButton
          label={next.toUpperCase()}
          onPress={() => setLocale(next)}
        />
      </View>
    </Screen>
  );
}
