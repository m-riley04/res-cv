import { Alert, Button, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common';
import { useDocument } from '@/contexts';
import { MessageService } from '@/messaging';
import { MessageType } from '@/messaging/enums';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// ToastManager is mounted once at the app root; don't mount it here

export default function HomeScreen() {
  const { t } = useTranslation();
  const data = useDocument();
  const messenger = useMemo(() => MessageService.getInstance(), []);

  const handleExportDocument = useCallback(() => {
    data
      .exportDocument()
      .then(() => {
        messenger.message(
          'Document exported successfully',
          MessageType.Success
        );
      })
      .catch((error) => {
        messenger.message(
          `Error exporting document: ${error}`,
          MessageType.Error
        );
      });
  }, [data, messenger]);

  const handleImportDocument = useCallback(() => {
    data
      .importDocument()
      .then((ret) => {
        if (!ret) {
          messenger.message(
            'Document failed to import or was cancelled.',
            MessageType.Error
          );
          return;
        }
        messenger.message(
          'Document imported successfully',
          MessageType.Success
        );
      })
      .catch((error) => {
        messenger.message(
          `Error importing document: ${error}`,
          MessageType.Error
        );
      });
  }, [data, messenger]);

  const handleResetDocument = useCallback(() => {
    data.resetDocument();
  }, [data]);

  const handleOpenResetDocumentConfirmation = useCallback(() => {
    // React Native Alert is not available on web
    if (Platform.OS !== 'web') {
      Alert.alert(
        t('reset_document_confirmation_title'),
        t('reset_document_confirmation'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.reset'),
            style: 'destructive',
            onPress: handleResetDocument,
          },
        ]
      );
    }

    // Instead, a simple confirmation dialog can be used for web
    // Note: This is a basic implementation, consider using a modal for better UX
    if (!confirm(t('reset_document_confirmation'))) {
      return;
    }

    handleResetDocument();
  }, [t, handleResetDocument]);

  return (
    <View>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.home')}</ThemedText>
      </View>
      <Button onPress={handleExportDocument} title={t('export_document')} />
      <Button onPress={handleImportDocument} title={t('import_document')} />
      <Button
        onPress={handleOpenResetDocumentConfirmation}
        title={t('reset_document')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
