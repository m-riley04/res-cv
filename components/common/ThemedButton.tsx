import { useTheme } from '@/theme';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export interface ThemedButtonProps extends PressableProps {
  title: string;
}

export function ThemedButton({ title, ...props }: ThemedButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: theme.buttonBackground },
        props.style,
      ]}
      {...props}
    >
      <ThemedText>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {},
});
