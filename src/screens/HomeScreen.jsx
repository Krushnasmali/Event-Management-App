import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CATEGORIES_DATA } from '../data/categoriesData';
import CategoryCard from '../components/CategoryCard';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = useMemo(() => {
    const base = CATEGORIES_DATA.filter(category =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // In future you can use activeFilter to change list (popular, nearby, etc.)
    return base;
  }, [searchText]);

  const handleCategoryPress = useCallback(
    (category) => {
      navigation.navigate('CategoryScreen', {
        categoryName: category.name,
        categoryId: category.id,
        categoryColor: category.color,
        categoryDescription: category.description,
      });
    },
    [navigation]
  );

  const renderCategoryItem = ({ item }) => (
    <CategoryCard
      item={item}
      onPress={() => handleCategoryPress(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Top greeting + brand row */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greetingText}>Welcome 👋</Text>
          <Text style={styles.headerTitle}>EventoBooking</Text>
        </View>
        <View style={styles.avatarPlaceholder}>
          <Icon name="account-circle" size={32} color={COLORS.background} />
        </View>
      </View>

      <Text style={styles.headerSubtitle}>
        Find & book the perfect event services near you
      </Text>

      {/* Modern search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon
            name="magnify"
            size={20}
            color={COLORS.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories, services..."
            placeholderTextColor={COLORS.textLight}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon
                name="close-circle"
                size={18}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Icon name="tune" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Quick filters */}
      <View style={styles.chipsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveFilter('all')}
          style={[
            styles.chip,
            activeFilter === 'all' && styles.chipActive,
          ]}
        >
          <Text
            style={[
              styles.chipText,
              activeFilter === 'all' && styles.chipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveFilter('popular')}
          style={[
            styles.chip,
            activeFilter === 'popular' && styles.chipActive,
          ]}
        >
          <Icon
            name="fire"
            size={14}
            color={
              activeFilter === 'popular'
                ? COLORS.background
                : COLORS.textSecondary
            }
            style={styles.chipIcon}
          />
          <Text
            style={[
              styles.chipText,
              activeFilter === 'popular' && styles.chipTextActive,
            ]}
          >
            Popular
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveFilter('nearby')}
          style={[
            styles.chip,
            activeFilter === 'nearby' && styles.chipActive,
          ]}
        >
          <Icon
            name="map-marker"
            size={14}
            color={
              activeFilter === 'nearby'
                ? COLORS.background
                : COLORS.textSecondary
            }
            style={styles.chipIcon}
          />
          <Text
            style={[
              styles.chipText,
              activeFilter === 'nearby' && styles.chipTextActive,
            ]}
          >
            Nearby
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Browse categories</Text>
        <Text style={styles.sectionSubtitle}>
          {filteredCategories.length} options
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
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
  listContent: {
    paddingBottom: SPACING.xxxl,
  },
  columnWrapper: {
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
  },

  // Header
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SPACING.xxl,
    borderBottomRightRadius: SPACING.xxl,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  greetingText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.background,
    opacity: 0.85,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
  },
  headerSubtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.background,
    opacity: 0.9,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
  },

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: SPACING.xl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  filterButton: {
    marginLeft: SPACING.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 3,
  },

  // Chips
  chipsRow: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.lg,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: SPACING.sm,
  },
  chipActive: {
    backgroundColor: COLORS.background,
  },
  chipText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.background,
    opacity: 0.9,
  },
  chipTextActive: {
    color: COLORS.primary,
    opacity: 1,
    fontWeight: FONT_WEIGHT.semibold,
  },
  chipIcon: {
    marginRight: 4,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.background,
    opacity: 0.8,
  },
});

export default HomeScreen;
