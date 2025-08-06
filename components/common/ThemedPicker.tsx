import { useTheme } from '@/theme';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export interface ThemedPickerProps extends PickerProps {}

export function ThemedPicker({ ...props }: ThemedPickerProps) {
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
    padding: 16,
  },
  pickerItem: {},
});
