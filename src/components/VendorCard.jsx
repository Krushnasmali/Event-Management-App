import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.lg * 2;

const VendorCard = ({ vendor, onPress, categoryColor }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={vendor.images[0]}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient / overlay */}
        <View style={styles.overlay} />

        {/* Availability Badge */}
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
            size={14}
            color={COLORS.background}
            style={styles.badgeIcon}
          />
          <Text style={styles.badgeText}>
            {vendor.availability ? 'Available' : 'Booked'}
          </Text>
        </View>

        {/* Rating Badge */}
        <View style={[styles.ratingBadge, { backgroundColor: categoryColor }]}>
          <Icon name="star" size={14} color={COLORS.background} />
          <Text style={styles.ratingText}>{vendor.rating}</Text>
        </View>
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.vendorName} numberOfLines={2}>
            {vendor.name}
          </Text>
          <View
            style={[
              styles.categoryPill,
              { backgroundColor: categoryColor + '1A' },
            ]}
          >
            <Text style={[styles.categoryPillText, { color: categoryColor }]}>
              {vendor.category}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Icon name="map-marker" size={14} color={COLORS.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {vendor.city}, {vendor.state}
          </Text>
        </View>

        {/* Cost and Description Row */}
        <View style={styles.bottomRow}>
          <View style={styles.costContainer}>
            <Text style={styles.costLabel}>Per day</Text>
            <Text style={[styles.costValue, { color: categoryColor }]}>
              ₹{(vendor.costPerDay / 1000).toFixed(1)}k
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description} numberOfLines={2}>
              {vendor.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: COLORS.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  availabilityBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.xs,
  },
  ratingText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  vendorName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    flex: 1,
  },
  categoryPill: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: SPACING.lg,
  },
  categoryPillText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.xs,
  },
  locationText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  costContainer: {
    alignItems: 'flex-start',
  },
  costLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  costValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default VendorCard;
