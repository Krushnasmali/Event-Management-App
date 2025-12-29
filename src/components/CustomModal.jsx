import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const { width } = Dimensions.get('window');

const CustomModal = ({
  visible,
  title,
  message,
  buttons = [{ text: 'OK', onPress: () => {} }],
  onClose,
}) => {
  const { colors, isDarkMode } = useTheme();

  const handleButtonPress = (onPress) => {
    onPress();
    if (onClose) onClose();
  };

  const styles = createStyles(colors, isDarkMode);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'cancel' && styles.cancelButton,
                ]}
                onPress={() => handleButtonPress(button.onPress)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.style === 'cancel' && styles.cancelButtonText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: width * 0.8,
      backgroundColor: colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    title: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.text,
      flex: 1,
    },
    closeButton: {
      padding: SPACING.xs,
    },
    message: {
      fontSize: FONT_SIZE.md,
      color: colors.text,
      marginBottom: SPACING.lg,
      lineHeight: 22,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: SPACING.sm,
    },
    button: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
      color: colors.background,
    },
    cancelButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      color: colors.text,
    },
  });

export default CustomModal;
