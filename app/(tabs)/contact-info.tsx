import { SocialMedia, Website } from '@/api';
import { ThemedText, ThemedTextInput } from '@/components/common';
import { AddModal } from '@/components/common/AddModal';
import { useDocument } from '@/contexts';
import { AddSocialMediaForm, AddWebsiteForm } from '@/features/contact_info';
import { SocialMediaListItem } from '@/features/contact_info/components/SocialMediaListItem';
import { WebsiteListItem } from '@/features/contact_info/components/WebsiteListItem';
import { Button } from '@react-navigation/elements';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

export default function ContactInfoScreen() {
  const { t } = useTranslation();
  const document = useDocument();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSocialMediaVisible, setAddSocialMediaVisible] = useState(false);

  const handleOpenAddWebsite = useCallback(() => {
    setAddModalVisible(true);
  }, []);

  const handleOpenAddSocialMedia = useCallback(() => {
    setAddSocialMediaVisible(true);
  }, []);

  const handleAddWebsite = useCallback((website: Website) => {
    const updatedWebsites = [
      ...(document.document.contactInfo.websites || []),
      website,
    ];
    document.updateDocument({ contactInfo: { websites: updatedWebsites } });
  }, []);

  const handleAddSocialMedia = useCallback((socialMedia: SocialMedia) => {
    const updatedSocialMedia = [
      ...(document.document.contactInfo.socialMedia || []),
      socialMedia,
    ];
    document.updateDocument({
      contactInfo: { socialMedia: updatedSocialMedia },
    });
  }, []);

  return (
    <ScrollView>
      <AddModal
        title={t('contact_info.add_website')}
        visible={addModalVisible}
        onAdd={handleAddWebsite}
        onClose={() => setAddModalVisible(false)}
      >
        <AddWebsiteForm />
      </AddModal>

      <AddModal
        title={t('contact_info.add_social_media')}
        visible={addSocialMediaVisible}
        onAdd={handleAddSocialMedia}
        onClose={() => setAddSocialMediaVisible(false)}
      >
        <AddSocialMediaForm />
      </AddModal>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.contact_info')}</ThemedText>
      </View>
      <ThemedTextInput
        inputMode='text'
        autoComplete='name-given'
        placeholder={t('contact_info.first_name_placeholder')}
      />
      <ThemedTextInput
        inputMode='text'
        autoComplete='name-middle'
        placeholder={t('contact_info.middle_name_placeholder')}
      />
      <ThemedTextInput
        inputMode='text'
        autoComplete='name-family'
        placeholder={t('contact_info.last_name_placeholder')}
      />
      <ThemedTextInput
        inputMode='email'
        autoComplete='email'
        placeholder={t('contact_info.email_placeholder')}
      />
      <ThemedTextInput
        inputMode='tel'
        autoComplete='tel'
        placeholder={t('contact_info.phone_placeholder')}
      />
      <ThemedTextInput
        inputMode='text'
        autoComplete='address-line1'
        placeholder={t('contact_info.address_placeholder')}
      />
      <FlatList
        data={document.document.contactInfo.websites}
        renderItem={({ item }: { item: Website }) => (
          <WebsiteListItem website={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={handleOpenAddWebsite}>
        {t('contact_info.add_website')}
      </Button>
      <FlatList
        data={document.document.contactInfo.socialMedia}
        renderItem={({ item }: { item: SocialMedia }) => (
          <SocialMediaListItem socialMedia={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={handleOpenAddSocialMedia}>
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
});
