import { Spacing } from '@/constants';
import { Sizing } from '@/constants/style/Sizing';
import { useTheme } from '@/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet } from 'react-native';

export interface CrossPlatformDatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export function CrossPlatformDatePicker({
  value,
  onChange,
}: CrossPlatformDatePickerProps) {
  const theme = useTheme();

  // DateTimePicker is not supported on web
  if (Platform.OS !== 'web') {
    return (
      <DateTimePicker
        value={value}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            onChange(selectedDate);
          }
        }}
      />
    );
  }

  // Web-specific implementation (basic HTML date input)
  return (
    <input
      style={{
        ...styles.datePicker,
        backgroundColor: theme.inputBackground,
        borderColor: theme.inputBorderColor,
        color: theme.inputColor,
      }}
      type='date'
      value={value.toISOString().split('T')[0]}
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  );
}

const styles = StyleSheet.create({
  datePicker: {
    padding: Spacing.formInputPadding,
    borderWidth: Sizing.formInputBorderWidth,
  },
});
