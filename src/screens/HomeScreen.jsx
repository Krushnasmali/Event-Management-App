import React, { useCallback, useState, useMemo, useEffect } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';
import { CATEGORIES_DATA } from '../data/categoriesData';
import firebaseAuth from '../services/firebaseAuth';

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

/**
 * Get time-based greeting
 * 5:00 AM - 11:59 AM: Good Morning
 * 12:00 PM - 4:59 PM: Good Afternoon
 * 5:00 PM - 8:59 PM: Good Evening
 * 9:00 PM - 4:59 AM: Good Night
 */
const getTimeBasedGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [activeTrending, setActiveTrending] = useState('all');
  const [greeting, setGreeting] = useState('Good Evening');
  const [userName, setUserName] = useState('there');

  useEffect(() => {
    // Set time-based greeting
    setGreeting(getTimeBasedGreeting());

    // Get user name from Firebase
    const currentUser = firebaseAuth.getCurrentUser();
    if (currentUser && currentUser.displayName) {
      const firstName = currentUser.displayName.split(' ')[0];
      setUserName(firstName);
    }
  }, []);

  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter(category =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleCategoryPress = useCallback(
    category => {
      navigation.navigate('CategoryScreen', {
        categoryName: category.name,
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
    </View>
  );

  const renderHeader = () => (
    <LinearGradient
      colors={['#1E063C', '#090017']}
      style={styles.headerGradient}
    >
      {/* TOP BAR */}
      <View style={styles.headerTopRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* PROFILE ICON (BLACK + BORDER) */}
          <TouchableOpacity style={styles.profileCircle}>
            <Icon name="account" size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.appName}>Evno</Text>
        </View>

        <View style={styles.headerIconRow}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => navigation.navigate('NotificationsTab')}
          >
            <Icon name="bell-outline" size={20} color="#FFFFFFCC" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.headerGreeting}>
        {greeting}, {userName} 👋
      </Text>
      <Text style={styles.headerBigTitle}>Discover Events</Text>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#8A80B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search concerts, festivals..."
            placeholderTextColor="#766CA6"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* FEATURED */}
      <TouchableOpacity activeOpacity={0.9} style={styles.featuredWrapper}>
        <ImageBackground
          source={require('../assets/images/featured-concert.jpg')}
          style={styles.featuredImage}
          imageStyle={{ borderRadius: 24 }}
        >
          <LinearGradient
            colors={['#150333CC', '#150333EE']}
            style={styles.featuredOverlay}
          >
            <Text style={styles.featuredLabel}>Featured</Text>
            <Text style={styles.featuredTitle}>{FEATURED_EVENT.title}</Text>
            <Text style={styles.featuredSubtitle}>{FEATURED_EVENT.subtitle}</Text>
            <TouchableOpacity style={styles.featuredCtaBtn}>
              <Text style={styles.featuredCtaText}>{FEATURED_EVENT.cta}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      {/* NEARBY */}
      <View style={styles.nearbyRow}>
        {NEARBY_EVENTS.map(renderNearbyCard)}
      </View>

      <Text style={styles.sectionTitle}>Browse categories</Text>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090017" />
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050012',
  },
  listContent: {
    paddingBottom: SPACING.xxxl * 2,
  },

  /* HEADER */
  headerGradient: {
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF08',
  },

  headerGreeting: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZE.sm,
    color: '#C6B6FF',
  },
  headerBigTitle: {
    fontSize: 28,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },

  /* SEARCH */
  searchRow: {
    marginTop: SPACING.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 999,
    backgroundColor: '#1A0F3A',
  },
  searchInput: {
    marginLeft: 8,
    color: '#FFFFFF',
    flex: 1,
  },

  /* FEATURED */
  featuredWrapper: {
    marginTop: SPACING.xl,
  },
  featuredImage: {
    height: 180,
  },
  featuredOverlay: {
    flex: 1,
    borderRadius: 24,
    padding: SPACING.lg,
    justifyContent: 'flex-end',
  },
  featuredLabel: {
    color: '#F6EEFF',
    fontSize: FONT_SIZE.xs,
  },
  featuredTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },
  featuredSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: '#D4C9FF',
  },
  featuredCtaBtn: {
    marginTop: SPACING.sm,
    backgroundColor: '#B783FF',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  featuredCtaText: {
    color: '#090017',
    fontWeight: FONT_WEIGHT.semibold,
  },

  /* NEARBY */
  nearbyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  nearbyCard: {
    width: '48%',
  },
  nearbyImage: {
    height: 110,
  },
  nearbyDateBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFFFFFDD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  nearbyDateText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },
  nearbyTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontWeight: FONT_WEIGHT.semibold,
  },
  nearbyMetaRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  nearbyTagPill: {
    backgroundColor: '#2B184F',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
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

  /* CATEGORIES */
  sectionTitle: {
    marginTop: SPACING.xl,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
  },
  columnWrapper: {
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
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
    fontSize: FONT_SIZE.xs,
    color: '#E4D9FF',
  },
});
