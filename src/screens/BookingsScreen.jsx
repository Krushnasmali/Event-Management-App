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
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const BookingsScreen = () => {
  const { colors } = useTheme();
  const hasBookings = false;
  const styles = createStyles(colors);

  if (!hasBookings) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />

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
                  color={colors.primary}
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
                color={colors.background}
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
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      {/* Bookings list goes here */}
    </SafeAreaView>
  );
};



const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.lg,
      backgroundColor: colors.primary,
      borderBottomLeftRadius: SPACING.lg,
      borderBottomRightRadius: SPACING.lg,
      marginBottom: SPACING.lg,
    },
    headerTitle: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.background,
    },
    headerSubtitle: {
      marginTop: SPACING.xs,
      fontSize: FONT_SIZE.sm,
      color: colors.background,
      opacity: 0.85,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
    },
    emptyCard: {
      alignItems: 'center',
    },
    emptyIcon: {
      marginBottom: SPACING.lg,
    },
    emptyTitle: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    emptyDescription: {
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
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
      backgroundColor: colors.primary,
      gap: SPACING.xs,
    },
    ctaButtonText: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.background,
    },
  });

export default BookingsScreen;
