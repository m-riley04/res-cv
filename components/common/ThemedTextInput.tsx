import { Spacing } from '@/constants';
import { Sizing } from '@/constants/style/Sizing';
import { useTheme } from '@/theme';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export interface ThemedTextInputProps extends TextInputProps {}
export function ThemedTextInput(props: ThemedTextInputProps) {
  const theme = useTheme();
  return (
    <TextInput
      placeholderTextColor={theme.inputPlaceholderColor}
      style={[
        styles.textInput,
        {
          color: theme.inputColor,
          backgroundColor: theme.inputBackground,
          borderColor: theme.inputBorderColor,
        },
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: Spacing.formInputPadding,
    borderWidth: Sizing.formInputBorderWidth,
  },
});
