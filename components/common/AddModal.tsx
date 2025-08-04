import { TextType } from '@/constants';
import { useTheme } from '@/theme';
import { cloneElement, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalProps, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export interface AddModalFormRef<T> {
  getData: () => T | null;
  isValid: () => boolean;
}

export interface AddModalProps<T> extends ModalProps {
  children: React.ReactElement<{ ref?: React.Ref<AddModalFormRef<T>> }>;
  title: string;
  visible?: boolean;
  onAdd?: (data: T) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export function AddModal<T>({
  children,
  title,
  visible = false,
  animationType = 'slide',
  onAdd,
  onCancel,
  onClose,
  ...props
}: AddModalProps<T>) {
  const { t } = useTranslation();
  const theme = useTheme();
  const formRef = useRef<AddModalFormRef<T>>(null);

  const handleAdd = useCallback(() => {
    const data = formRef.current?.getData();
    const isValid = formRef.current?.isValid() ?? false;

    if (data && isValid) {
      onAdd?.(data);
      onClose?.();
    }
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
            <ThemedText type={TextType.Title}>{title}</ThemedText>
          </View>
          <View style={styles.modalContent}>
            {cloneElement(children, { ref: formRef })}
          </View>
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
