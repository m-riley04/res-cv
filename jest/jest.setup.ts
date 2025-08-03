jest.mock('@react-navigation/elements', () =>
  jest.requireActual('@react-navigation/elements')
);

jest.mock('expo-haptics', () => jest.requireActual('expo-haptics'));

jest.mock('react-native', () => jest.requireActual('react-native'));

jest.mock('react-i18next', () => jest.requireActual('react-i18next'));

jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]), // Always return that fonts are loaded. TODO: Maybe set up a mock for specific fonts?
}));

jest.mock('@/theme', () => jest.requireActual('@/theme'));

jest.mock('@/constants', () => jest.requireActual('@/constants'));
