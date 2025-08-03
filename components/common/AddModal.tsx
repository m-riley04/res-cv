import { TextType } from '@/constants';
import { useTheme } from '@/theme';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalProps, StyleSheet, View } from 'react-native';
import { Text } from './Text';

export interface AddModalProps extends ModalProps {
  children: React.ReactNode;
  title: string;
  visible?: boolean;
  onAdd?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export function AddModal({
  children,
  title,
  visible = false,
  animationType = 'slide',
  onAdd,
  onCancel,
  onClose,
  ...props
}: AddModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleAdd = useCallback(() => {
    onAdd?.();
    onClose?.();
  }, [onAdd, onClose]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose?.();
  }, [onCancel, onClose]);

  return (
    <Modal
      animationType={animationType}
      visible={visible}
      transparent
      onRequestClose={onClose}
      {...props}
    >
      <View style={[styles.modalOverlay, { backgroundColor: theme.darkened }]}>
        <View
          style={[styles.modalContainer, { backgroundColor: theme.background }]}
        >
          <View style={styles.modalTitle}>
            <Text type={TextType.Title}>{title}</Text>
          </View>
          <View style={styles.modalContent}>{children}</View>
          <View style={styles.modalButtonBox}>
            <Button title={t('common.add')} onPress={handleAdd} />
            <Button title={t('common.cancel')} onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    width: '100%',
    textAlign: 'left',
    padding: 20,
  },
  modalContainer: {
    width: '80%',
    maxHeight: '80%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
  },
  modalContent: {
    padding: 20,
  },
  modalButtonBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    padding: 20,
    paddingTop: 0,
  },
});
