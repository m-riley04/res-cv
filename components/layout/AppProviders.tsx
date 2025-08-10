import { DocumentProvider } from '@/contexts';
import { Theme } from '@/theme';
import { i18n } from '@/translation';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useColorScheme } from 'react-native';
import ToastManager from 'toastify-react-native/components/ToastManager';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [queryClient] = useState(() => new QueryClient());

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ToastManager />
      <QueryClientProvider client={queryClient}>
        <DocumentProvider>
          <ThemeProvider
            value={colorScheme === Theme.Dark ? DarkTheme : DefaultTheme}
          >
            {children}
          </ThemeProvider>
        </DocumentProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
};
