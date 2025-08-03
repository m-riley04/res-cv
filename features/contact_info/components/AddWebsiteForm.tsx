import { ThemedTextInput } from '@/components';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export function AddWebsiteForm() {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('contact_info.website_label_placeholder')}
      />
      <ThemedTextInput
        inputMode='url'
        textContentType='URL'
        placeholder={t('contact_info.website_url_placeholder')}
      />
    </ScrollView>
  );
}
