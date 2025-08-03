import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text>{t('welcome')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
