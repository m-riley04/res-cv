import { StatusBar } from 'expo-status-bar';
import { AppProviders, AppStack } from '.';

/**
 * The main application component that wraps the stack with providers.
 */
export const App = () => {
  return (
    <AppProviders>
      <AppStack />
      <StatusBar style='auto' />
    </AppProviders>
  );
};
