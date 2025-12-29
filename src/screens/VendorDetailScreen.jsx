import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const VendorDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { vendor, categoryColor } = route.params;

  const renderRatingStars = rating => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(full)].map((_, i) => (
          <Icon key={`f-${i}`} name="star" size={16} color={categoryColor} />
        ))}
        {half && <Icon name="star-half-full" size={16} color={categoryColor} />}
        {[...Array(empty)].map((_, i) => (
          <Icon key={`e-${i}`} name="star-outline" size={16} color="#666" />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090017" />

      {/* Image Header */}
      <View style={styles.imageWrapper}>
        <Image source={vendor.images[0]} style={styles.image} />

        <LinearGradient
          colors={['#00000000', '#050012']}
          style={styles.imageOverlay}
        />

        {/* Header buttons */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Availability */}
        <View
          style={[
            styles.availability,
            {
              backgroundColor: vendor.availability
                ? 'rgba(34,197,94,0.9)'
                : 'rgba(239,68,68,0.9)',
            },
          ]}
        >
          <Icon
            name={vendor.availability ? 'check-circle' : 'close-circle'}
            size={16}
            color="#fff"
          />
          <Text style={styles.availabilityText}>
            {vendor.availability ? 'Available' : 'Booked'}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Info Card */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <View
              style={[
                styles.categoryChip,
                { backgroundColor: categoryColor + '33' },
              ]}
            >
              <Text style={[styles.categoryText, { color: categoryColor }]}>
                {vendor.category}
              </Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            {renderRatingStars(vendor.rating)}
            <Text style={styles.rating}>{vendor.rating}</Text>
            <Text style={styles.reviewText}>• 0 reviews</Text>
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color={categoryColor} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>
                {vendor.city}, {vendor.state}
              </Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.infoRow}>
            <Icon name="currency-inr" size={20} color={categoryColor} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Cost per day</Text>
              <Text style={[styles.price, { color: categoryColor }]}>
                ₹{vendor.costPerDay.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this vendor</Text>
            <Text style={styles.desc}>{vendor.description}</Text>
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get in touch</Text>
            <Text style={styles.subText}>
              Contact vendor to check availability or negotiate pricing.
            </Text>

            <View style={styles.contactRow}>
              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: categoryColor }]}
              >
                <Icon name="phone" size={20} color="#090017" />
                <Text style={styles.primaryText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn}>
                <Icon
                  name="message-text-outline"
                  size={20}
                  color={categoryColor}
                />
                <Text style={[styles.secondaryText, { color: categoryColor }]}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>
            ₹{vendor.costPerDay.toLocaleString('en-IN')}
            <Text style={styles.perDay}> / day</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.bookBtn, { backgroundColor: categoryColor }]}
        >
          <Icon name="calendar-check" size={22} color="#090017" />
          <Text style={styles.bookText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VendorDetailScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050012',
  },

  imageWrapper: {
    height: 280,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },

  topBar: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  availability: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },

  availabilityText: {
    color: '#fff',
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  card: {
    marginTop: -40,
    marginHorizontal: SPACING.lg,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  vendorName: {
    flex: 1,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: '#fff',
  },

  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  categoryText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: SPACING.lg,
  },

  rating: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: FONT_WEIGHT.semibold,
  },

  reviewText: {
    marginLeft: 4,
    color: '#AAA',
    fontSize: FONT_SIZE.sm,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  infoLabel: {
    fontSize: FONT_SIZE.xs,
    color: '#AAA',
  },

  infoValue: {
    fontSize: FONT_SIZE.md,
    color: '#fff',
    fontWeight: FONT_WEIGHT.semibold,
  },

  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },

  section: {
    marginTop: SPACING.lg,
  },

  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: '#fff',
    marginBottom: 6,
  },

  desc: {
    fontSize: FONT_SIZE.sm,
    color: '#AAA',
    lineHeight: 22,
  },

  subText: {
    fontSize: FONT_SIZE.sm,
    color: '#AAA',
    marginBottom: SPACING.md,
  },

  contactRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },

  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: 8,
  },

  primaryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: '#090017',
  },

  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    gap: 8,
  },

  secondaryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0B061A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomLabel: {
    fontSize: FONT_SIZE.xs,
    color: '#AAA',
  },

  bottomPrice: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: '#fff',
  },

  perDay: {
    fontSize: FONT_SIZE.sm,
    color: '#AAA',
  },

  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    gap: 8,
  },

  bookText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: '#090017',
  },
});
