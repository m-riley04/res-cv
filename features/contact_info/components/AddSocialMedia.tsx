import { SocialMediaPlatform } from '@/api';
import { ThemedTextInput } from '@/components';
import { ThemedPicker } from '@/components/common/ThemedPicker';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export function AddSocialMediaForm() {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('contact_info.social_media_label_placeholder')}
      />
      <ThemedPicker
        placeholder={t('contact_info.social_media_platform_placeholder')}
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
      />
    </ScrollView>
  );
}
