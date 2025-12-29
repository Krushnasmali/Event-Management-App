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
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', color: '#FF6B6B', onPress: () => {} },
    { icon: 'heart', label: 'Saved Services', color: '#FFE66D', onPress: () => {} },
    { icon: 'credit-card', label: 'Payment Methods', color: '#4ECDC4', onPress: () => {} },
    { icon: 'cog', label: 'Settings', color: '#95E1D3', onPress: () => navigation.navigate('SettingsScreen') },
    { icon: 'help-circle', label: 'Help & Support', color: '#AA96DA', onPress: () => {} },
    { icon: 'logout', label: 'Logout', color: '#FF6B6B', onPress: () => {} },
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header / Profile summary */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.avatarWrapper}>
            <View style={[styles.avatarBackground, { backgroundColor: colors.overlay, borderColor: colors.background }]}>
              <Icon name="account-circle" size={86} color={colors.background} />
            </View>
          </View>
          <Text style={[styles.profileName, { color: colors.background }]}>Guest User</Text>
          <Text style={[styles.profileEmail, { color: colors.background }]}>user@eventobooking.com</Text>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: colors.background }]}>
              <Icon
                name="calendar-check"
                size={14}
                color={colors.primary}
                style={styles.badgeIcon}
              />
              <Text style={[styles.badgeText, { color: colors.primary }]}>0 bookings</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.background }]}>
              <Icon
                name="star-outline"
                size={14}
                color={colors.primary}
                style={styles.badgeIcon}
              />
              <Text style={[styles.badgeText, { color: colors.primary }]}>No reviews</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.editQuickButton, { backgroundColor: colors.background }]}
            activeOpacity={0.85}
          >
            <Icon
              name="pencil-outline"
              size={16}
              color={colors.primary}
              style={styles.badgeIcon}
            />
            <Text style={[styles.editQuickText, { color: colors.primary }]}>Complete your profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeaderText, { color: colors.textSecondary }]}>Account</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
              onPress={item.onPress || (() => {})}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + '20' },
                ]}
              >
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              <Icon name="chevron-right" size={22} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textLight }]}>Version 1.0.0</Text>
          <Text style={[styles.footerBrand, { color: colors.textSecondary }]}>EventoBooking</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: SPACING.xxxl,
    },
    header: {
      alignItems: 'center',
      paddingVertical: SPACING.xxxl,
      paddingHorizontal: SPACING.lg,
      borderBottomLeftRadius: SPACING.xxl,
      borderBottomRightRadius: SPACING.xxl,
      shadowColor: colors.shadow,
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
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
    },
    profileName: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.bold,
      marginBottom: SPACING.xs,
    },
    profileEmail: {
      fontSize: FONT_SIZE.sm,
      opacity: 0.9,
    },
    badgeRow: {
      flexDirection: 'row',
      marginTop: SPACING.lg,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
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
      fontWeight: FONT_WEIGHT.semibold,
    },
    editQuickButton: {
      marginTop: SPACING.lg,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: SPACING.lg,
    },
    editQuickText: {
      fontSize: FONT_SIZE.sm,
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
    },
    menuContainer: {
      paddingHorizontal: SPACING.lg,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.md,
      borderRadius: BORDER_RADIUS.md,
      marginBottom: SPACING.md,
      shadowColor: colors.shadow,
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
    },
    footer: {
      marginTop: SPACING.lg,
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
    },
    footerText: {
      fontSize: FONT_SIZE.xs,
    },
    footerBrand: {
      marginTop: 2,
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
    },
  });

export default ProfileScreen;
