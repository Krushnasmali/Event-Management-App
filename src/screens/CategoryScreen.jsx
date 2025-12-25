import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
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

  const availableStates = useMemo(
    () => getStatesForCategory(categoryName),
    [categoryName]
  );

  const availableCities = useMemo(
    () =>
      selectedState
        ? getCitiesForStateAndCategory(categoryName, selectedState)
        : [],
    [categoryName, selectedState]
  );

  const filteredVendors = useMemo(
    () =>
      selectedState && selectedCity
        ? getVendorsByFilters(categoryName, selectedState, selectedCity)
        : [],
    [categoryName, selectedState, selectedCity]
  );

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <Text style={styles.headerSubtitle}>
            Filter by location & discover trusted vendors
          </Text>
        </View>
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

            <View style={styles.filterCard}>
              <View style={styles.filterIconCircle}>
                <Icon
                  name="map-search-outline"
                  size={20}
                  color={categoryColor}
                />
              </View>
              <View style={styles.filterTextContainer}>
                <Text style={styles.filterTitle}>Search by location</Text>
                <Text style={styles.filterSubtitle}>
                  Choose your state and city to see available vendors
                </Text>
              </View>
            </View>

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
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomLeftRadius: SPACING.xl,
    borderBottomRightRadius: SPACING.xl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  backButton: {
    padding: SPACING.sm,
    marginRight: SPACING.sm,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
  },
  headerSubtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.background,
    opacity: 0.9,
  },
  placeholder: {
    width: 32,
  },
  filtersContainer: {
    backgroundColor: COLORS.background,
    paddingBottom: SPACING.lg,
  },
  filterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  filterIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.overlay}`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  filterTextContainer: {
    flex: 1,
  },
  filterTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
  },
  filterSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  dropdownsWrapper: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginTop: SPACING.lg,
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
