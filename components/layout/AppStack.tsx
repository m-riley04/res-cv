import { Stack } from 'expo-router';
const DEFAULT_SHOW_HEADER_ON_TABS = false;

/**
 * The main application stack that contains the tab layout and other screens.
 * @returns
 */
export const AppStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: DEFAULT_SHOW_HEADER_ON_TABS }}
      />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
};
