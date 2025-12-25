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
        <Text style={styles.headerTitle}>Vendor details</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Icon name="heart-outline" size={22} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={vendor.images[0]}
            style={styles.vendorImage}
            resizeMode="cover"
          />
          <View style={styles.imageTopRow}>
            <View style={styles.badgePill}>
              <Icon
                name="shield-check"
                size={16}
                color={COLORS.success}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgePillText}>Verified vendor</Text>
            </View>
          </View>
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
            <Icon
              name={vendor.availability ? 'check-circle' : 'close-circle'}
              size={16}
              color={COLORS.background}
              style={styles.badgeIcon}
            />
            <Text style={styles.badgeText}>
              {vendor.availability ? 'Available' : 'Booked'}
            </Text>
          </View>
        </View>

        {/* Vendor Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <View
              style={[
                styles.categoryChip,
                { backgroundColor: categoryColor + '22' },
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  { color: categoryColor },
                ]}
              >
                {vendor.category}
              </Text>
            </View>
          </View>

          {/* Rating + reviews */}
          <View style={styles.ratingRow}>
            {renderRatingStars(vendor.rating)}
            <Text style={styles.ratingText}>{vendor.rating}</Text>
            <Text style={styles.ratingSubText}>• 0 reviews</Text>
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
              <Text style={styles.infoLabel}>Cost per day</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: categoryColor,
                    fontWeight: FONT_WEIGHT.bold,
                  },
                ]}
              >
                ₹{vendor.costPerDay.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>About this vendor</Text>
            <Text style={styles.descriptionText}>{vendor.description}</Text>
          </View>

          {/* Contact Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Get in touch</Text>
            <Text style={styles.sectionSubtitle}>
              Contact the vendor to check availability, discuss details, or negotiate pricing.
            </Text>
            <View style={styles.contactButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.contactButtonPrimary,
                  { backgroundColor: categoryColor },
                ]}
                activeOpacity={0.85}
              >
                <Icon
                  name="phone"
                  size={20}
                  color={COLORS.background}
                />
                <Text style={styles.contactButtonTextPrimary}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactButtonSecondary}
                activeOpacity={0.85}
              >
                <Icon
                  name="message-text-outline"
                  size={20}
                  color={categoryColor}
                />
                <Text
                  style={[
                    styles.contactButtonTextSecondary,
                    { color: categoryColor },
                  ]}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Book button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>
            ₹{vendor.costPerDay.toLocaleString('en-IN')}
            <Text style={styles.bottomPriceUnit}> / day</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: categoryColor }]}
          activeOpacity={0.9}
        >
          <Icon
            name="calendar-check"
            size={22}
            color={COLORS.background}
          />
          <Text style={styles.bookButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
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
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.background,
  },
  headerIconButton: {
    padding: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl + 60,
  },
  imageSection: {
    position: 'relative',
    width: '100%',
    height: 260,
    backgroundColor: COLORS.surface,
  },
  vendorImage: {
    width: '100%',
    height: '100%',
  },
  imageTopRow: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: SPACING.lg,
    backgroundColor: COLORS.background + 'CC',
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgePillText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.success,
    fontWeight: FONT_WEIGHT.semibold,
  },
  availabilityBadge: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  vendorName: {
    flex: 1,
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: SPACING.lg,
  },
  categoryChipText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
  },
  ratingSubText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
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
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
  },
  sectionBlock: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  descriptionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  contactButtonPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  contactButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: categoryColor => categoryColor || COLORS.primary,
    gap: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  contactButtonTextPrimary: {
    color: COLORS.background,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  contactButtonTextSecondary: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 10,
  },
  bottomLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
  },
  bottomPrice: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  bottomPriceUnit: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  bookButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
  },
});

export default VendorDetailScreen;
