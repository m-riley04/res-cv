import { Text } from '@/components/common/Text';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text>{t('tabs.settings')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
