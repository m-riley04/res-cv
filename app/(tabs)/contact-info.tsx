import { SocialMedia, Website } from '@/api';
import { ThemedText, ThemedTextInput } from '@/components/common';
import { AddModal } from '@/components/common/AddModal';
import {
  AddSocialMediaForm,
  AddWebsiteForm,
  SocialMediaListItem,
  WebsiteListItem,
} from '@/components/modals';
import { useDocument } from '@/contexts';
import { Button } from '@react-navigation/elements';
import { useToggle } from '@uidotdev/usehooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

export default function ContactInfoScreen() {
  const { t } = useTranslation();
  const { documentData, updateDocument } = useDocument();

  const [isAddWebsiteVisible, toggleAddWebsiteVisible] = useToggle(false);
  const [isAddSocialMediaVisible, toggleAddSocialMediaVisible] =
    useToggle(false);

  const handleAddWebsite = useCallback((website: Website) => {
    const updatedWebsites = [
      ...(documentData.contactInfo.websites || []),
      website,
    ];
    updateDocument({ contactInfo: { websites: updatedWebsites } });
  }, []);

  const handleAddSocialMedia = useCallback((socialMedia: SocialMedia) => {
    const updatedSocialMedia = [
      ...(documentData.contactInfo.socialMedia || []),
      socialMedia,
    ];
    updateDocument({
      contactInfo: { socialMedia: updatedSocialMedia },
    });
  }, []);

  return (
    <ScrollView>
      <AddModal
        title={t('contact_info.add_website')}
        visible={isAddWebsiteVisible}
        onAdd={handleAddWebsite}
        onClose={() => toggleAddWebsiteVisible(false)}
      >
        <AddWebsiteForm />
      </AddModal>

      <AddModal
        title={t('contact_info.add_social_media')}
        visible={isAddSocialMediaVisible}
        onAdd={handleAddSocialMedia}
        onClose={() => toggleAddSocialMediaVisible(false)}
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
        data={documentData.contactInfo.websites}
        renderItem={({ item }: { item: Website }) => (
          <WebsiteListItem website={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={() => toggleAddWebsiteVisible(true)}>
        {t('contact_info.add_website')}
      </Button>
      <FlatList
        data={documentData.contactInfo.socialMedia}
        renderItem={({ item }: { item: SocialMedia }) => (
          <SocialMediaListItem socialMedia={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={() => toggleAddSocialMediaVisible(true)}>
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
