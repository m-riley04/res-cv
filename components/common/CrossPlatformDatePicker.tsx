import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export interface CrossPlatformDatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export function CrossPlatformDatePicker({
  value,
  onChange,
}: CrossPlatformDatePickerProps) {
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
      type='date'
      value={value.toISOString().split('T')[0]}
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  );
}
