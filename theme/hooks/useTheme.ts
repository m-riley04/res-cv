import { Colors } from '@/constants';
import { Theme } from '../enums';
import { useColorScheme } from './useColorScheme';

/**
 * Use the specific color scheme based on the current theme.
 * @returns an object containing the colors for the current theme.
 */
export function useTheme() {
  // Check which theme is currently set
  const colorScheme = useColorScheme();

  return colorScheme === Theme.Dark ? Colors.dark : Colors.light;
}
