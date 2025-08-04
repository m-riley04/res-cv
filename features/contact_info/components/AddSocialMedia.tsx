import { SocialMedia, SocialMediaPlatform } from '@/api';
import { ThemedTextInput } from '@/components';
import { AddModalFormRef } from '@/components/common/AddModal';
import { ThemedPicker } from '@/components/common/ThemedPicker';
import { Picker } from '@react-native-picker/picker';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export interface AddSocialMediaFormProps {
  onSubmit?: (socialMedia: SocialMedia) => void;
}

export const AddSocialMediaForm = forwardRef<
  AddModalFormRef<SocialMedia>,
  AddSocialMediaFormProps
>(({}, ref) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<SocialMediaPlatform | undefined>();
  const [url, setUrl] = useState('');

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!username.trim() || !platform || !url.trim()) {
        return null;
      }
      return {
        id: Date.now(), // TODO: generate ID differently, likely will come from backend
        platform,
        username: username.trim(),
        url: url.trim(),
      };
    },
    isValid: () => {
      return (
        username.trim().length > 0 &&
        platform !== undefined &&
        url.trim().length > 0
      );
    },
  }));

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('contact_info.social_media_username_placeholder')}
        value={username}
        onChangeText={setUsername}
      />
      <ThemedPicker
        placeholder={t('contact_info.social_media_platform_placeholder')}
        selectedValue={platform}
        onValueChange={(value) => setPlatform(value as SocialMediaPlatform)}
      >
        <Picker.Item
          label={t('social_media.instagram')}
          value={SocialMediaPlatform.Instagram}
        />
        <Picker.Item
          label={t('social_media.facebook')}
          value={SocialMediaPlatform.Facebook}
        />
        <Picker.Item
          label={t('social_media.linkedin')}
          value={SocialMediaPlatform.LinkedIn}
        />
      </ThemedPicker>
      <ThemedTextInput
        inputMode='url'
        textContentType='URL'
        placeholder={t('contact_info.social_media_url_placeholder')}
        value={url}
        onChangeText={setUrl}
      />
    </ScrollView>
  );
});

AddSocialMediaForm.displayName = 'AddSocialMediaForm';
