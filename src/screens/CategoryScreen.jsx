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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';
import Dropdown from '../components/Dropdown';
import SectionTitle from '../components/SectionTitle';
import VendorCard from '../components/VendorCard';
import {
  getAllStates,
  getCitiesForState,
} from '../data/statesAndCities';
import {
  getVendorsByFilters,
} from '../data/vendorsData';

const CategoryScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { categoryName, categoryColor } = route.params;

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const availableStates = useMemo(() => getAllStates(), []);

  const availableCities = useMemo(
    () => (selectedState ? getCitiesForState(selectedState) : []),
    [selectedState]
  );

  const filteredVendors = useMemo(
    () =>
      selectedState && selectedCity
        ? getVendorsByFilters(categoryName, selectedState, selectedCity)
        : [],
    [categoryName, selectedState, selectedCity]
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="store-off-outline" size={64} color="#AAA" />
      <Text style={styles.emptyText}>
        {!selectedState || !selectedCity
          ? 'Select state and city to see vendors'
          : 'No vendors found'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090017" />

      {/* Header */}
      <LinearGradient
        colors={['#1E063C', '#090017']}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <Text style={styles.headerSubtitle}>
            Filter by location & discover vendors
          </Text>
        </View>
      </LinearGradient>

      <FlatList
        data={filteredVendors}
        renderItem={({ item }) => (
          <VendorCard
            vendor={item}
            onPress={() =>
              navigation.navigate('VendorDetailScreen', {
                vendor: item,
                categoryColor,
              })
            }
            categoryColor={categoryColor}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.filtersContainer}>
            <SectionTitle
              title="Find the Perfect Service"
              color={categoryColor}
              showUnderline
            />

            {/* Info Card */}
            <View style={styles.filterCard}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: categoryColor + '33' },
                ]}
              >
                <Icon
                  name="map-search-outline"
                  size={20}
                  color={categoryColor}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.filterTitle}>
                  Search by location
                </Text>
                <Text style={styles.filterSubtitle}>
                  Choose state & city to see available vendors
                </Text>
              </View>
            </View>

            {/* Dropdowns */}
            <View style={styles.dropdowns}>
              <Dropdown
                label="State"
                selectedValue={selectedState}
                options={availableStates}
                onSelect={state => {
                  setSelectedState(state);
                  setSelectedCity(null);
                }}
                placeholder="Select State"
                color={categoryColor}
              />

              <Dropdown
                label="City"
                selectedValue={selectedCity}
                options={availableCities}
                onSelect={setSelectedCity}
                placeholder="Select City"
                color={categoryColor}
                disabled={!selectedState}
              />
            </View>

            {filteredVendors.length > 0 && (
              <View style={styles.results}>
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
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050012',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  backButton: {
    marginRight: SPACING.md,
  },

  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: '#fff',
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZE.sm,
    color: '#C6B6FF',
  },

  filtersContainer: {
    paddingBottom: SPACING.lg,
  },

  filterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },

  filterTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: '#fff',
  },

  filterSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: '#AAA',
  },

  dropdowns: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },

  results: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  resultsText: {
    fontSize: FONT_SIZE.sm,
    color: '#AAA',
    fontWeight: FONT_WEIGHT.semibold,
  },

  listContent: {
    flexGrow: 1,
    paddingVertical: SPACING.md,
  },

  emptyContainer: {
    minHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },

  emptyText: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZE.md,
    color: '#AAA',
    textAlign: 'center',
  },
});
