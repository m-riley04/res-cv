import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput } from 'react-native';

export function AddWebsiteForm() {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <TextInput
        inputMode='text'
        placeholder={t('contact_info.website_label_placeholder')}
      />
      <TextInput
        inputMode='url'
        textContentType='URL'
        placeholder={t('contact_info.website_url_placeholder')}
      />
    </ScrollView>
  );
}
