import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import { TextType } from '@/constants';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('not_found.oops') }} />
      <View style={styles.container}>
        <ThemedText type={TextType.Title}>{t('not_found.message')}</ThemedText>
        <Link href='/' style={styles.link}>
          <ThemedText type={TextType.Link}>{t('not_found.go_home')}</ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
