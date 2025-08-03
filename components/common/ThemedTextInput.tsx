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
        },
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {},
});
