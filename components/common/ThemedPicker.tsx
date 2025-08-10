import { Spacing } from '@/constants';
import { useTheme } from '@/theme';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export function ThemedPicker({ ...props }: PickerProps) {
  const theme = useTheme();
  return (
    <Picker
      style={[
        styles.picker,
        {
          backgroundColor: theme.inputBackground,
          color: theme.inputColor,
          borderColor: theme.inputBorderColor,
        },
      ]}
      itemStyle={[styles.pickerItem]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  picker: {
    padding: Spacing.formInputPadding,
    borderWidth: 1,
  },
  pickerItem: {},
});
