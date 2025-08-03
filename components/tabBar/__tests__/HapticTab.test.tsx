import { renderWithProviders } from '@/jest/utils/providerRenderer';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { act, fireEvent } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Text } from 'react-native';
import { HapticTab } from '../HapticTab';

const mockHaptics = jest.spyOn(Haptics, 'impactAsync');

const mockOnPressIn = jest.fn();

const mockProps = {
  to: '/test',
  children: <Text>Tab Content</Text>,
  onPressIn: mockOnPressIn,
} as BottomTabBarButtonProps;

/**
 * Custom render function for HapticTab component (since it's reused in multiple tests).
 * @param props Default props for the HapticTab component.
 * @returns Rendered component.
 */
function renderHapticTab(props: BottomTabBarButtonProps = mockProps) {
  return renderWithProviders(<HapticTab {...props} />);
}

describe('<HapticTab />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders PlatformPressable with correct props', () => {
      const { getByTestId } = renderHapticTab();
      const pressable = getByTestId('hapticTab.platformPressable');
      expect(pressable).toBeTruthy();
    });
  });

  describe('IOS-specific', () => {
    beforeAll(() => {
      // Mock Platform.OS to simulate iOS environment
      Object.defineProperty(Platform, 'OS', {
        get: () => 'ios',
        configurable: true,
      });
    });

    afterAll(() => {
      // Restore original Platform.OS
      jest.clearAllMocks();
    });

    describe('Haptic Feedback', () => {
      it('triggers haptic feedback on iOS when pressed', () => {
        const { getByTestId } = renderHapticTab();
        const pressable = getByTestId('hapticTab.platformPressable');

        act(() => {
          fireEvent(pressable, 'pressIn');
        });

        expect(mockHaptics).toHaveBeenCalledTimes(1);
      });

      it('calls original onPressIn prop after haptic feedback on iOS', () => {
        const { getByTestId } = renderHapticTab();
        const pressable = getByTestId('hapticTab.platformPressable');

        act(() => {
          fireEvent(pressable, 'pressIn', { nativeEvent: {} });
        });

        expect(mockHaptics).toHaveBeenCalledTimes(1);
        expect(mockOnPressIn).toHaveBeenCalledWith({ nativeEvent: {} });
        expect(mockOnPressIn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Non-iOS behavior', () => {
    beforeAll(() => {
      // Mock Platform.OS to simulate non-iOS environment
      Object.defineProperty(Platform, 'OS', {
        get: () => 'android',
        configurable: true,
      });
    });

    afterAll(() => {
      // Restore original Platform.OS
      jest.clearAllMocks();
    });

    it('does not trigger haptic feedback on non-iOS platforms', () => {
      const { getByTestId } = renderHapticTab();
      const pressable = getByTestId('hapticTab.platformPressable');

      act(() => {
        fireEvent(pressable, 'pressIn');
      });

      expect(mockHaptics).not.toHaveBeenCalled();
      expect(mockOnPressIn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Children Rendering', () => {
    it('renders children correctly', () => {
      const { getByText } = renderHapticTab();
      expect(getByText('Tab Content')).toBeTruthy();
    });

    it('renders custom children correctly', () => {
      const customProps = {
        ...mockProps,
        children: <Text>Custom Tab</Text>,
      };

      const { getByText } = renderHapticTab(customProps);

      expect(getByText('Custom Tab')).toBeTruthy();
    });
  });
});
