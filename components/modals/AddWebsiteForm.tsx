import { Website } from '@/api';
import { AddModalFormRef, ThemedTextInput } from '@/components';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export interface AddWebsiteFormProps {
  onSubmit?: (website: Website) => void;
}

export const AddWebsiteForm = forwardRef<
  AddModalFormRef<Website>,
  AddWebsiteFormProps
>(({}, ref) => {
  const { t } = useTranslation();
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!label.trim() || !url.trim()) {
        return null;
      }
      return {
        id: Date.now(), // TODO: generate ID differently, likely will come from backend
        label: label.trim(),
        url: url.trim(),
      };
    },
    isValid: () => {
      return label.trim().length > 0 && url.trim().length > 0;
    },
  }));

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('contact_info.website_label_placeholder')}
        value={label}
        onChangeText={setLabel}
      />
      <ThemedTextInput
        inputMode='url'
        textContentType='URL'
        placeholder={t('contact_info.website_url_placeholder')}
        value={url}
        onChangeText={setUrl}
      />
    </ScrollView>
  );
});

AddWebsiteForm.displayName = 'AddWebsiteForm';
