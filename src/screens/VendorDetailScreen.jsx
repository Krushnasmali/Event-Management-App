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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const VendorDetailScreen = ({ route, navigation }) => {
  const { vendor, categoryColor } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} name="star" size={16} color={categoryColor} />
        ))}
        {hasHalfStar && (
          <Icon key="half" name="star-half-full" size={16} color={categoryColor} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty-${i}`}
            name="star-outline"
            size={16}
            color={COLORS.textLight}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={categoryColor} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: categoryColor }]}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={vendor.images[0]}
            style={styles.vendorImage}
            resizeMode="cover"
          />
          <View
            style={[
              styles.availabilityBadge,
              {
                backgroundColor: vendor.availability
                  ? COLORS.success
                  : COLORS.error,
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {vendor.availability ? 'Available' : 'Booked'}
            </Text>
          </View>
        </View>

        {/* Vendor Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.vendorName}>{vendor.name}</Text>

          {/* Category Badge */}
          <View style={styles.categoryBadgeContainer}>
            <View
              style={[styles.categoryBadge, { backgroundColor: categoryColor }]}
            >
              <Text style={styles.categoryBadgeText}>{vendor.category}</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            {renderRatingStars(vendor.rating)}
            <Text style={styles.ratingText}>{vendor.rating}</Text>
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Icon
              name="map-marker"
              size={20}
              color={categoryColor}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>
                {vendor.city}, {vendor.state}
              </Text>
            </View>
          </View>

          {/* Cost */}
          <View style={styles.infoRow}>
            <Icon
              name="currency-inr"
              size={20}
              color={categoryColor}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Cost Per Day</Text>
              <Text style={[styles.infoValue, { color: categoryColor, fontWeight: FONT_WEIGHT.bold }]}>
                ₹{vendor.costPerDay.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Vendor</Text>
            <Text style={styles.descriptionText}>{vendor.description}</Text>
          </View>

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <View style={styles.contactButtonsContainer}>
              <TouchableOpacity
                style={[styles.contactButton, { backgroundColor: categoryColor }]}
                activeOpacity={0.8}
              >
                <Icon
                  name="phone"
                  size={20}
                  color={COLORS.background}
                />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contactButton, { backgroundColor: categoryColor }]}
                activeOpacity={0.8}
              >
                <Icon
                  name="message-text"
                  size={20}
                  color={COLORS.background}
                />
                <Text style={styles.contactButtonText}>Message</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contactButton, { backgroundColor: categoryColor }]}
                activeOpacity={0.8}
              >
                <Icon
                  name="heart-outline"
                  size={20}
                  color={COLORS.background}
                />
                <Text style={styles.contactButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Book Button */}
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: categoryColor }]}
            activeOpacity={0.8}
          >
            <Icon
              name="calendar-check"
              size={22}
              color={COLORS.background}
            />
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  imageSection: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: COLORS.surface,
  },
  vendorImage: {
    width: '100%',
    height: '100%',
  },
  availabilityBadge: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  badgeText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  infoSection: {
    padding: SPACING.lg,
  },
  vendorName: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  categoryBadgeContainer: {
    marginBottom: SPACING.lg,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  categoryBadgeText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoIcon: {
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  infoValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
  },
  descriptionSection: {
    marginVertical: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  descriptionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  contactSection: {
    marginBottom: SPACING.xl,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
  },
  contactButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.md,
    marginTop: SPACING.lg,
    elevation: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  bookButtonText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
  },
});

export default VendorDetailScreen;
