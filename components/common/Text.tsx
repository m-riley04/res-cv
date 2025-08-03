import { Text as RNText, StyleSheet, type TextProps } from 'react-native';

import { TextType, TextTypeStyles } from '@/constants';

import { useTheme } from '@/theme';
import { useCallback, useMemo } from 'react';

export type CustomTextProps = TextProps & {
  type?: TextType;
};

/**
 * Custom Text component that applies styles based on the provided type and current theme.
 * @returns
 */
export function Text({
  style,
  type = TextType.Default,
  ...rest
}: CustomTextProps) {
  const theme = useTheme();

  /**
   * Gets the text style based on the provided type.
   */
  const getTextStyle = useCallback(
    (type: TextType) => {
      switch (type) {
        case TextType.Title:
          return styles.title;
        case TextType.DefaultSemiBold:
          return styles.defaultSemiBold;
        case TextType.Subtitle:
          return styles.subtitle;
        case TextType.Link:
          return styles.link;
        case TextType.Default:
        default:
          return styles.default;
      }
    },
    [theme.link]
  );

  /**
   * Combines the base text style with the type-specific style and theme colors.
   */
  const textStyle = useMemo(() => {
    return [
      { color: type === TextType.Link ? theme.link : theme.text },
      getTextStyle(type),
      style,
    ];
  }, [type, getTextStyle]);

  return <RNText style={textStyle} {...rest} />;
}

const styles = StyleSheet.create({
  default: TextTypeStyles.default,
  defaultSemiBold: TextTypeStyles.defaultSemiBold,
  title: TextTypeStyles.title,
  subtitle: TextTypeStyles.subtitle,
  link: TextTypeStyles.link,
});
