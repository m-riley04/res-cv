import { SocialMediaPlatform } from '@/api';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput } from 'react-native';

export function AddSocialMediaForm() {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <TextInput
        inputMode='text'
        placeholder={t('contact_info.social_media_label_placeholder')}
      />
      <Picker placeholder={t('contact_info.social_media_platform_placeholder')}>
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
      </Picker>
      <TextInput
        inputMode='url'
        textContentType='URL'
        placeholder={t('contact_info.social_media_url_placeholder')}
      />
    </ScrollView>
  );
}
