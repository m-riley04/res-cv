import { TextType, TextTypeStyles } from '@/constants';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from '../Text';

describe('<Text />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders children text correctly', () => {
      const { getByText } = render(<Text>Hello World</Text>);
      expect(getByText('Hello World')).toBeTruthy();
    });

    it('renders with default type when no type is specified', () => {
      const { getByText } = render(<Text>Default Text</Text>);
      const textElement = getByText('Default Text');
      expect(textElement).toBeTruthy();
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining(TextTypeStyles.default),
        ])
      );
    });

    it('forwards all text props correctly', () => {
      const { getByText } = render(
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          accessible={true}
          accessibilityLabel='Test Label'
        >
          Test Text
        </Text>
      );
      const textElement = getByText('Test Text');
      expect(textElement.props.numberOfLines).toBe(2);
      expect(textElement.props.ellipsizeMode).toBe('tail');
      expect(textElement.props.accessible).toBe(true);
      expect(textElement.props.accessibilityLabel).toBe('Test Label');
    });
  });

  describe('Text Types', () => {
    it('renders default type with correct styles', () => {
      const { getByText } = render(
        <Text type={TextType.Default}>Default Text</Text>
      );
      const textElement = getByText('Default Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining(TextTypeStyles.default),
        ])
      );
    });

    it('renders title type with correct styles', () => {
      const { getByText } = render(
        <Text type={TextType.Title}>Title Text</Text>
      );
      const textElement = getByText('Title Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(TextTypeStyles.title)])
      );
    });

    it('renders defaultSemiBold type with correct styles', () => {
      const { getByText } = render(
        <Text type={TextType.DefaultSemiBold}>SemiBold Text</Text>
      );
      const textElement = getByText('SemiBold Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining(TextTypeStyles.defaultSemiBold),
        ])
      );
    });

    it('renders subtitle type with correct styles', () => {
      const { getByText } = render(
        <Text type={TextType.Subtitle}>Subtitle Text</Text>
      );
      const textElement = getByText('Subtitle Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining(TextTypeStyles.subtitle),
        ])
      );
    });

    it('renders link type with correct styles', () => {
      const { getByText } = render(<Text type={TextType.Link}>Link Text</Text>);
      const textElement = getByText('Link Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(TextTypeStyles.link)])
      );
    });
  });

  describe('Style Handling', () => {
    it('applies custom style along with type styles', () => {
      const customStyle = { marginTop: 10, backgroundColor: 'red' };
      const { getByText } = render(
        <Text type={TextType.Title} style={customStyle}>
          Styled Text
        </Text>
      );
      const textElement = getByText('Styled Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining(TextTypeStyles.title),
          customStyle,
        ])
      );
    });

    it('handles undefined style gracefully', () => {
      const { getByText } = render(<Text style={undefined}>No Style</Text>);
      const textElement = getByText('No Style');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty text content', () => {
      const { root } = render(<Text></Text>);
      expect(root).toBeTruthy();
    });

    it('handles null children', () => {
      const { root } = render(<Text>{null}</Text>);
      expect(root).toBeTruthy();
    });

    it('handles undefined children', () => {
      const { root } = render(<Text>{undefined}</Text>);
      expect(root).toBeTruthy();
    });

    it('handles number children', () => {
      const { getByText } = render(<Text>{42}</Text>);
      expect(getByText('42')).toBeTruthy();
    });

    it('handles boolean children', () => {
      const { root } = render(<Text>{true}</Text>);
      expect(root).toBeTruthy();
    });
  });

  describe('Complex Style Scenarios', () => {
    it('handles complex style override scenarios', () => {
      const customStyle = {
        fontSize: 50, // Override default fontSize
        color: 'purple', // Override theme color
        fontWeight: 'normal' as const, // Override bold
      };

      const { getByText } = render(
        <Text type={TextType.Title} style={customStyle}>
          Override Title
        </Text>
      );

      const textElement = getByText('Override Title');
      const styles = textElement.props.style;

      // The custom style should be applied last, so it should override previous styles
      expect(styles).toEqual(expect.arrayContaining([customStyle]));
    });

    it('preserves all React Native Text props', () => {
      const textProps = {
        selectable: true,
        testID: 'custom-text',
        onPress: jest.fn(),
        onLongPress: jest.fn(),
        adjustsFontSizeToFit: true,
        minimumFontScale: 0.5,
      };

      const { getByTestId } = render(
        <Text {...textProps}>Interactive Text</Text>
      );

      const textElement = getByTestId('custom-text');
      expect(textElement.props.selectable).toBe(true);
      expect(textElement.props.onPress).toBe(textProps.onPress);
      expect(textElement.props.onLongPress).toBe(textProps.onLongPress);
      expect(textElement.props.adjustsFontSizeToFit).toBe(true);
      expect(textElement.props.minimumFontScale).toBe(0.5);
    });
  });
});
