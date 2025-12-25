import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const ProfileScreen = () => {
  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', color: '#FF6B6B' },
    { icon: 'heart', label: 'Saved Services', color: '#FFE66D' },
    { icon: 'credit-card', label: 'Payment Methods', color: '#4ECDC4' },
    { icon: 'bell', label: 'Notifications', color: '#95E1D3' },
    { icon: 'help-circle', label: 'Help & Support', color: '#AA96DA' },
    { icon: 'logout', label: 'Logout', color: '#FF6B6B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header / Profile summary */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBackground}>
              <Icon name="account-circle" size={86} color={COLORS.background} />
            </View>
          </View>
          <Text style={styles.profileName}>Guest User</Text>
          <Text style={styles.profileEmail}>user@eventobooking.com</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Icon
                name="calendar-check"
                size={14}
                color={COLORS.primary}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeText}>0 bookings</Text>
            </View>
            <View style={styles.badge}>
              <Icon
                name="star-outline"
                size={14}
                color={COLORS.primary}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeText}>No reviews</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editQuickButton}
            activeOpacity={0.85}
          >
            <Icon
              name="pencil-outline"
              size={16}
              color={COLORS.primary}
              style={styles.badgeIcon}
            />
            <Text style={styles.editQuickText}>Complete your profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderText}>Account</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + '20' },
                ]}
              >
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={22} color={COLORS.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerBrand}>EventoBooking</Text>
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
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SPACING.xxl,
    borderBottomRightRadius: SPACING.xxl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarWrapper: {
    marginBottom: SPACING.md,
  },
  avatarBackground: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  profileName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.background,
    opacity: 0.9,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: SPACING.lg,
    marginHorizontal: SPACING.xs,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
  editQuickButton: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  editQuickText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
  sectionHeaderRow: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  sectionHeaderText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
  },
  menuContainer: {
    paddingHorizontal: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  menuLabel: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },
  footer: {
    marginTop: SPACING.lg,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
  },
  footerBrand: {
    marginTop: 2,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.semibold,
  },
});

export default ProfileScreen;
