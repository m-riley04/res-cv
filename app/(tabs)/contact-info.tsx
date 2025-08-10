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
import { useVisible } from '@/hooks';
import { Button } from '@react-navigation/elements';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

export default function ContactInfoScreen() {
  const { t } = useTranslation();
  const { documentData, updateDocument } = useDocument();

  const {
    visible: isAddWebsiteVisible,
    show: showAddWebsite,
    hide: hideAddWebsite,
  } = useVisible();
  const {
    visible: isAddSocialMediaVisible,
    show: showAddSocialMedia,
    hide: hideAddSocialMedia,
  } = useVisible();

  const handleAddWebsite = useCallback(
    (website: Website) => {
      const updatedWebsites = [
        ...(documentData.contactInfo.websites || []),
        website,
      ];
      updateDocument({ contactInfo: { websites: updatedWebsites } });
    },
    [documentData.contactInfo.websites, updateDocument]
  );

  const handleAddSocialMedia = useCallback(
    (socialMedia: SocialMedia) => {
      const updatedSocialMedia = [
        ...(documentData.contactInfo.socialMedia || []),
        socialMedia,
      ];
      updateDocument({
        contactInfo: { socialMedia: updatedSocialMedia },
      });
    },
    [documentData.contactInfo.socialMedia, updateDocument]
  );

  return (
    <ScrollView>
      <AddModal
        title={t('contact_info.add_website')}
        visible={isAddWebsiteVisible}
        onAdd={handleAddWebsite}
        onClose={hideAddWebsite}
      >
        <AddWebsiteForm />
      </AddModal>

      <AddModal
        title={t('contact_info.add_social_media')}
        visible={isAddSocialMediaVisible}
        onAdd={handleAddSocialMedia}
        onClose={hideAddSocialMedia}
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
      <Button onPress={showAddWebsite}>{t('contact_info.add_website')}</Button>
      <FlatList
        data={documentData.contactInfo.socialMedia}
        renderItem={({ item }: { item: SocialMedia }) => (
          <SocialMediaListItem socialMedia={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={showAddSocialMedia}>
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
