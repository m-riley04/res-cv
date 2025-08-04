export interface DateTimePickerProps {
  value: Date; // ISO date string
  onChange: (value: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  return (
    <input
      type='date'
      value={value.toISOString().split('T')[0]}
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  );
}
