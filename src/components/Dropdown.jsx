import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const Dropdown = ({
  label,
  selectedValue,
  options,
  onSelect,
  placeholder = 'Select an option',
  color = COLORS.primary,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setModalVisible(false);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        selectedValue === item && styles.selectedOption,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text
        style={[
          styles.optionText,
          selectedValue === item && styles.selectedOptionText,
        ]}
      >
        {item}
      </Text>
      {selectedValue === item && (
        <Icon name="check" size={20} color={color} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.dropdown, { borderColor: color }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedValue && styles.placeholderText,
          ]}
        >
          {selectedValue || placeholder}
        </Text>
        <Icon
          name="chevron-down"
          size={24}
          color={color}
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{label || 'Select'}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            renderItem={renderOption}
            keyExtractor={(item) => item}
            style={styles.optionsList}
            scrollEnabled={true}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
  },
  dropdownText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    flex: 1,
    fontWeight: FONT_WEIGHT.medium,
  },
  placeholderText: {
    color: COLORS.textLight,
  },
  icon: {
    marginLeft: SPACING.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  optionsList: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  optionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: FONT_WEIGHT.medium,
  },
  selectedOptionText: {
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default Dropdown;
