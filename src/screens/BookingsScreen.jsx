import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const BookingsScreen = () => {
  const hasBookings = false;

  if (!hasBookings) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>
            Track all your event reservations in one place
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.emptyCard}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
                <Icon
                  name="calendar-blank"
                  size={40}
                  color={COLORS.primary}
                />
              </View>
            </View>

            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptySubtext}>
              Start exploring event services and book your first vendor to see it here.
            </Text>

            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={0.85}
            >
              <Icon
                name="compass-outline"
                size={18}
                color={COLORS.background}
              />
              <Text style={styles.ctaButtonText}>Discover services</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // In future you can render list of bookings here
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      {/* Bookings list goes here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: SPACING.xl,
    borderBottomRightRadius: SPACING.xl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  headerSubtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyCard: {
    padding: SPACING.xl,
    borderRadius: SPACING.xl,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  iconWrapper: {
    marginBottom: SPACING.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.lg,
    backgroundColor: COLORS.primary,
    gap: SPACING.xs,
  },
  ctaButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
  },
});

export default BookingsScreen;
