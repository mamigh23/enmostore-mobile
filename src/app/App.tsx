import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocaleProvider } from '../core/localization/LocaleProvider';
import { MainTabs } from '../navigation/MainTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
