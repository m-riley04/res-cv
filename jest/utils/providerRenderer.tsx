import { AppProviders } from '@/components/layout';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

/**
 * Custom render function that wraps components in a number of providers.
 * Primarily, wrapped by the app's main providers and a NavigationContainer.
 * @param children The React node(s) to render within the providers.
 * @returns Rendered component.
 */
export function renderWithProviders(children: React.ReactNode) {
  return render(
    <NavigationContainer>
      <AppProviders>{children}</AppProviders>
    </NavigationContainer>
  );
}
