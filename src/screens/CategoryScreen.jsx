import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ListEmptyComponent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';
import Dropdown from '../components/Dropdown';
import SectionTitle from '../components/SectionTitle';
import VendorCard from '../components/VendorCard';
import {
  getStatesForCategory,
  getCitiesForStateAndCategory,
  getVendorsByFilters,
} from '../data/vendorsData';

const CategoryScreen = ({ route, navigation }) => {
  const { categoryName, categoryColor } = route.params;

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Get available states for this category
  const availableStates = useMemo(
    () => getStatesForCategory(categoryName),
    [categoryName]
  );

  // Get available cities based on selected state
  const availableCities = useMemo(
    () =>
      selectedState
        ? getCitiesForStateAndCategory(categoryName, selectedState)
        : [],
    [categoryName, selectedState]
  );

  // Get vendors filtered by state and city
  const filteredVendors = useMemo(
    () =>
      selectedState && selectedCity
        ? getVendorsByFilters(categoryName, selectedState, selectedCity)
        : [],
    [categoryName, selectedState, selectedCity]
  );

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null); // Reset city when state changes
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleVendorPress = (vendor) => {
    navigation.navigate('VendorDetailScreen', {
      vendor,
      categoryColor,
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="store-off-outline" size={60} color={COLORS.textLight} />
      <Text style={styles.emptyText}>
        {!selectedState || !selectedCity
          ? 'Select state and city to see vendors'
          : 'No vendors found'}
      </Text>
    </View>
  );

  const renderVendorItem = ({ item }) => (
    <VendorCard
      vendor={item}
      onPress={() => handleVendorPress(item)}
      categoryColor={categoryColor}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={categoryColor} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: categoryColor }]}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filters and Vendor List */}
      <FlatList
        data={filteredVendors}
        renderItem={renderVendorItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.filtersContainer}>
            <SectionTitle
              title="Find the Perfect Service"
              color={categoryColor}
              showUnderline={true}
            />

            <View style={styles.dropdownsWrapper}>
              <Dropdown
                label="State"
                selectedValue={selectedState}
                options={availableStates}
                onSelect={handleStateChange}
                placeholder="Select State"
                color={categoryColor}
              />

              <Dropdown
                label="City"
                selectedValue={selectedCity}
                options={availableCities}
                onSelect={handleCityChange}
                placeholder="Select City"
                color={categoryColor}
                disabled={!selectedState}
              />
            </View>

            {filteredVendors.length > 0 && (
              <View style={styles.resultsInfo}>
                <Text style={styles.resultsText}>
                  Found {filteredVendors.length} vendor
                  {filteredVendors.length !== 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  backButton: {
    padding: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  filtersContainer: {
    backgroundColor: COLORS.background,
    paddingBottom: SPACING.lg,
  },
  dropdownsWrapper: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  resultsInfo: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
  },
  resultsText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.semibold,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    minHeight: 300,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textLight,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
});

export default CategoryScreen;
