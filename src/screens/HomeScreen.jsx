// screens/HomeScreen.js
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
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';
import { CATEGORIES_DATA } from '../data/categoriesData';

// dummy data for featured + nearby events
const FEATURED_EVENT = {
  title: 'International Concert',
  subtitle: 'Global music, unified harmony',
  cta: 'Book Now',
};

const NEARBY_EVENTS = [
  {
    id: '1',
    title: 'Melody Fest',
    date: '25 Dec',
    tag: 'Music',
    people: '40k+ Going',
    venue: 'Grand Arena, Indonesia',
  },
  {
    id: '2',
    title: 'Harmony Nights',
    date: '25 Dec',
    tag: 'Music',
    people: '32k+ Going',
    venue: 'Grand Avenue, Indonesia',
  },
];

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTrending, setActiveTrending] = useState('all');

  const filteredCategories = useMemo(() => {
    const base = CATEGORIES_DATA.filter(category =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return base;
  }, [searchText]);

  const handleCategoryPress = useCallback(
    category => {
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
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
    >
      <LinearGradient
        colors={[item.color || '#7b5cff', '#4a2b9b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryGradient}
      >
        <View style={styles.categoryIconWrapper}>
          <Icon name={item.icon || 'calendar-star'} size={22} color="#fff" />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.count || '24 events'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderNearbyCard = item => (
    <View key={item.id} style={styles.nearbyCard}>
      <ImageBackground
        source={require('../assets/images/event-placeholder.jpg')}
        style={styles.nearbyImage}
        imageStyle={{ borderRadius: SPACING.lg }}
      >
        <View style={styles.nearbyDateBadge}>
          <Text style={styles.nearbyDateText}>{item.date}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.nearbyTitle}>{item.title}</Text>
      <View style={styles.nearbyMetaRow}>
        <View style={styles.nearbyTagPill}>
          <Text style={styles.nearbyTagText}>{item.tag}</Text>
        </View>
        <Text style={styles.nearbyPeopleText}>{item.people}</Text>
      </View>
      <View style={styles.nearbyVenueRow}>
        <Icon name="map-marker" size={14} color="#A5A1CC" />
        <Text style={styles.nearbyVenueText}>{item.venue}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <LinearGradient
      colors={['#1E063C', '#090017']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerGradient}
    >
      <View style={styles.headerTopRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.logoCircle}>
            <Icon name="flare" size={18} color="#fff" />
          </View>
          <Text style={styles.appName}>Evno</Text>
        </View>
        <View style={styles.headerIconRow}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => navigation.navigate('NotificationsTab')}
          >
            <Icon name="bell-outline" size={20} color="#FFFFFFCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Icon name="bookmark-outline" size={20} color="#FFFFFFCC" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.headerGreeting}>Hi, Good Evening 👋</Text>
      <Text style={styles.headerBigTitle}>Discover Events</Text>

      {/* Search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#8A80B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search concerts, festivals..."
            placeholderTextColor="#766CA6"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="close-circle" size={18} color="#766CA6" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Icon name="tune-variant" size={20} color="#B9A4FF" />
        </TouchableOpacity>
      </View>

      {/* Featured card */}
      <TouchableOpacity activeOpacity={0.9} style={styles.featuredWrapper}>
        <ImageBackground
          source={require('../assets/images/featured-concert.jpg')}
          style={styles.featuredImage}
          imageStyle={styles.featuredImageRadius}
        >
          <LinearGradient
            colors={['#150333CC', '#150333EE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredOverlay}
          >
            <Text style={styles.featuredLabel}>Featured</Text>
            <Text style={styles.featuredTitle}>{FEATURED_EVENT.title}</Text>
            <Text style={styles.featuredSubtitle}>{FEATURED_EVENT.subtitle}</Text>

            <TouchableOpacity style={styles.featuredCtaBtn}>
              <Text style={styles.featuredCtaText}>{FEATURED_EVENT.cta}</Text>
            </TouchableOpacity>

            <View style={styles.featuredFooterRow}>
              <View style={styles.featuredMetaItem}>
                <Icon name="calendar" size={14} color="#D5C8FF" />
                <Text style={styles.featuredMetaText}>30 Dec</Text>
              </View>
              <View style={styles.featuredMetaItem}>
                <Icon name="map-marker-outline" size={14} color="#D5C8FF" />
                <Text style={styles.featuredMetaText}>Jakarta, ID</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      {/* Trending section */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Trending</Text>
        <TouchableOpacity>
          <Text style={styles.sectionSeeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trendingChipsRow}>
        {[
          { key: 'all', label: 'All' },
          { key: 'art', label: 'Art' },
          { key: 'music', label: 'Music' },
          { key: 'sport', label: 'Sport' },
        ].map(chip => (
          <TouchableOpacity
            key={chip.key}
            activeOpacity={0.8}
            onPress={() => setActiveTrending(chip.key)}
            style={[
              styles.trendingChip,
              activeTrending === chip.key && styles.trendingChipActive,
            ]}
          >
            <Text
              style={[
                styles.trendingChipText,
                activeTrending === chip.key && styles.trendingChipTextActive,
              ]}
            >
              {chip.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearby section */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Nearby Your Location</Text>
        <TouchableOpacity>
          <Text style={styles.sectionSeeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nearbyRow}>
        {NEARBY_EVENTS.map(renderNearbyCard)}
      </View>

      {/* categories header */}
      <View style={styles.sectionRow}>
        <View>
          <Text style={styles.sectionTitle}>Browse categories</Text>
          <Text style={styles.sectionSubtitle}>
            {filteredCategories.length} options
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090017"
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050012',
  },
  listContent: {
    paddingBottom: SPACING.xxxl * 2,
    backgroundColor: '#050012',
  },
  columnWrapper: {
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },

  // HEADER
  headerGradient: {
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B783FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    marginLeft: 10,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },
  headerIconRow: {
    flexDirection: 'row',
  },
  headerIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#FFFFFF08',
  },
  headerGreeting: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZE.sm,
    color: '#C6B6FF',
  },
  headerBigTitle: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },

  // SEARCH
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
    backgroundColor: '#1A0F3A',
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: '#FFFFFF',
  },
  filterButton: {
    marginLeft: SPACING.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A0F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // FEATURED
  featuredWrapper: {
    marginTop: SPACING.xl,
  },
  featuredImage: {
    height: 180,
    width: '100%',
  },
  featuredImageRadius: {
    borderRadius: 24,
  },
  featuredOverlay: {
    flex: 1,
    borderRadius: 24,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  featuredLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FFFFFF22',
    color: '#F6EEFF',
    fontSize: FONT_SIZE.xs,
  },
  featuredTitle: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },
  featuredSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZE.sm,
    color: '#D4C9FF',
  },
  featuredCtaBtn: {
    marginTop: SPACING.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#B783FF',
  },
  featuredCtaText: {
    color: '#090017',
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.sm,
  },
  featuredFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredMetaText: {
    marginLeft: 4,
    fontSize: FONT_SIZE.xs,
    color: '#D5C8FF',
  },

  // SECTIONS
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },
  sectionSeeAll: {
    fontSize: FONT_SIZE.xs,
    color: '#B483FF',
  },
  sectionSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: '#9489C6',
  },

  // TRENDING CHIPS
  trendingChipsRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
  },
  trendingChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#15092C',
    marginRight: 10,
  },
  trendingChipActive: {
    backgroundColor: '#B783FF',
  },
  trendingChipText: {
    fontSize: FONT_SIZE.xs,
    color: '#A29AD3',
  },
  trendingChipTextActive: {
    color: '#090017',
    fontWeight: FONT_WEIGHT.semibold,
  },

  // NEARBY
  nearbyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  nearbyCard: {
    width: '48%',
  },
  nearbyImage: {
    height: 110,
    width: '100%',
  },
  nearbyDateBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FFFFFFDD',
  },
  nearbyDateText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: '#4A2B9B',
  },
  nearbyTitle: {
    marginTop: 8,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: '#FFFFFF',
  },
  nearbyMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  nearbyTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#2B184F',
    marginRight: 6,
  },
  nearbyTagText: {
    fontSize: FONT_SIZE.xs,
    color: '#CBB6FF',
  },
  nearbyPeopleText: {
    fontSize: FONT_SIZE.xs,
    color: '#A5A1CC',
  },
  nearbyVenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  nearbyVenueText: {
    marginLeft: 4,
    fontSize: FONT_SIZE.xs,
    color: '#A5A1CC',
  },

  // CATEGORY CARDS
  categoryCard: {
    width: '48%',
    marginBottom: SPACING.lg,
  },
  categoryGradient: {
    borderRadius: 20,
    padding: SPACING.md,
  },
  categoryIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  categoryName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: '#FFFFFF',
  },
  categoryCount: {
    marginTop: 4,
    fontSize: FONT_SIZE.xs,
    color: '#E4D9FF',
  },
});

export default HomeScreen;
