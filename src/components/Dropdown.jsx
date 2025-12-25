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
      activeOpacity={0.8}
    >
      <View style={styles.optionLeft}>
        <View style={styles.optionBullet} />
        <Text
          style={[
            styles.optionText,
            selectedValue === item && styles.selectedOptionText,
          ]}
          numberOfLines={1}
        >
          {item}
        </Text>
      </View>
      {selectedValue === item && (
        <Icon name="check-circle" size={20} color={color} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.dropdown,
          { borderColor: selectedValue ? color + '55' : COLORS.border },
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <View style={styles.leftContent}>
          <Icon
            name="map-marker-radius"
            size={18}
            color={selectedValue ? color : COLORS.textLight}
            style={styles.leftIcon}
          />
          <Text
            style={[
              styles.dropdownText,
              !selectedValue && styles.placeholderText,
            ]}
            numberOfLines={1}
          >
            {selectedValue || placeholder}
          </Text>
        </View>
        <View style={styles.rightIcons}>
          {selectedValue && (
            <TouchableOpacity
              onPress={() => onSelect(null)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name="close-circle-outline"
                size={18}
                color={COLORS.textLight}
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
          <Icon
            name={modalVisible ? 'chevron-up' : 'chevron-down'}
            size={22}
            color={color}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalGrabber} />

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{label || 'Select option'}</Text>
                <Text style={styles.modalSubtitle}>
                  Choose one option from the list below
                </Text>
              </View>
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
              showsVerticalScrollIndicator={false}
            />
          </View>
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
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1.2,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftIcon: {
    marginRight: SPACING.sm,
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
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearIcon: {
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    maxHeight: '60%',
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SPACING.xxl,
    borderTopRightRadius: SPACING.xxl,
    paddingBottom: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  modalGrabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  modalSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  optionsList: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  selectedOption: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  optionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: FONT_WEIGHT.medium,
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default Dropdown;
