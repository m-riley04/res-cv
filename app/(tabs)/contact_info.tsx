import { SocialMedia, Website } from '@/api';
import { Text } from '@/components/common';
import { AddModal } from '@/components/common/AddModal';
import { AddSocialMediaForm, AddWebsiteForm } from '@/features/contact_info';
import { useTheme } from '@/theme';
import { Button } from '@react-navigation/elements';
import { ExternalPathString, Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default function ContactInfoScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSocialMediaVisible, setAddSocialMediaVisible] = useState(false);

  const handleAddWebsite = useCallback(() => {
    setAddModalVisible(true);
  }, []);

  const handleAddSocialMedia = useCallback(() => {
    setAddSocialMediaVisible(true);
  }, []);

  return (
    <ScrollView>
      <AddModal
        title={t('contact_info.add_website')}
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      >
        <AddWebsiteForm />
      </AddModal>

      <AddModal
        title={t('contact_info.add_social_media')}
        visible={addSocialMediaVisible}
        onClose={() => setAddSocialMediaVisible(false)}
      >
        <AddSocialMediaForm />
      </AddModal>
      <View style={styles.titleContainer}>
        <Text>{t('tabs.contact_info')}</Text>
      </View>
      <TextInput
        style={[
          styles.textInput,
          { color: theme.inputColor, backgroundColor: theme.inputBackground },
        ]}
        inputMode='text'
        autoComplete='name-given'
        placeholder={t('contact_info.first_name_placeholder')}
        placeholderTextColor={theme.inputPlaceholderColor}
      />
      <TextInput
        style={[
          styles.textInput,
          { color: theme.inputColor, backgroundColor: theme.inputBackground },
        ]}
        inputMode='text'
        autoComplete='name-middle'
        placeholder={t('contact_info.middle_name_placeholder')}
        placeholderTextColor={theme.inputPlaceholderColor}
      />
      <TextInput
        style={[
          styles.textInput,
          { color: theme.inputColor, backgroundColor: theme.inputBackground },
        ]}
        inputMode='text'
        autoComplete='name-family'
        placeholder={t('contact_info.last_name_placeholder')}
        placeholderTextColor={theme.inputPlaceholderColor}
      />
      <TextInput
        style={[
          styles.textInput,
          { color: theme.inputColor, backgroundColor: theme.inputBackground },
        ]}
        inputMode='email'
        autoComplete='email'
        placeholder={t('contact_info.email_placeholder')}
        placeholderTextColor={theme.inputPlaceholderColor}
      />
      <TextInput
        style={[
          styles.textInput,
          { color: theme.inputColor, backgroundColor: theme.inputBackground },
        ]}
        inputMode='tel'
        autoComplete='tel'
        placeholder={t('contact_info.phone_placeholder')}
        placeholderTextColor={theme.inputPlaceholderColor}
      />
      <TextInput
        style={[
          styles.textInput,
          { color: theme.inputColor, backgroundColor: theme.inputBackground },
        ]}
        inputMode='text'
        autoComplete='address-line1'
        placeholder={t('contact_info.address_placeholder')}
        placeholderTextColor={theme.inputPlaceholderColor}
      />
      <FlatList
        data={[]}
        renderItem={({ item }: { item: Website }) => (
          <Link href={item.url as ExternalPathString}>
            <Text>{item.label}</Text>
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={handleAddWebsite}>
        {t('contact_info.add_website')}
      </Button>
      <FlatList
        data={[]}
        renderItem={({ item }: { item: SocialMedia }) => (
          <Link href={item.url as ExternalPathString}>
            <Text>{`${item.platform}: ${item.username}`}</Text>
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={handleAddSocialMedia}>
        {t('contact_info.add_social_media')}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {},
});
