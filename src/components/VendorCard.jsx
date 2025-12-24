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
      activeOpacity={0.85}
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
        {/* Vendor Name */}
        <Text style={styles.vendorName} numberOfLines={2}>
          {vendor.name}
        </Text>

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
            <Text style={styles.costLabel}>Per Day</Text>
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
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
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
  availabilityBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
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
    borderRadius: BORDER_RADIUS.sm,
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
  vendorName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
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
    alignItems: 'center',
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
