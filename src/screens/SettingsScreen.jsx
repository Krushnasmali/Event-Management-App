// SettingsScreen.jsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
  Divider,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'account-edit',
          label: 'Edit Profile',
          description: 'Update your personal information',
        },
        {
          icon: 'shield-account',
          label: 'Privacy Settings',
          description: 'Manage your privacy preferences',
        },
        {
          icon: 'lock-reset',
          label: 'Change Password',
          description: 'Update your account password',
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          icon: 'bell',
          label: 'Notifications',
          description: 'Configure notification preferences',
        },
        {
          icon: 'translate',
          label: 'Language',
          description: 'Choose your preferred language',
        },
        {
          icon: 'map-marker',
          label: 'Location',
          description: 'Manage location settings',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle',
          label: 'Help & Support',
          description: 'Get help and contact support',
        },
        {
          icon: 'file-document',
          label: 'Terms & Conditions',
          description: 'Read our terms and conditions',
        },
        {
          icon: 'shield-check',
          label: 'Privacy Policy',
          description: 'Read our privacy policy',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              {section.title}
            </Text>

            {section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                <TouchableOpacity
                  style={[styles.settingItem, { backgroundColor: colors.surface }]}
                  activeOpacity={0.7}
                  onPress={() => {}}
                >
                  <View style={[styles.settingIconContainer, { backgroundColor: colors.primary + '20' }]}>
                    <Icon name={item.icon} size={20} color={colors.primary} />
                  </View>

                  <View style={styles.settingTextContainer}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.settingDescription, { color: colors.textLight }]}>
                      {item.description}
                    </Text>
                  </View>

                  <Icon name="chevron-right" size={24} color={colors.textLight} />
                </TouchableOpacity>

                {itemIndex !== section.items.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error + '15' }]}
            activeOpacity={0.7}
          >
            <Icon name="logout" size={20} color={colors.error} />
            <Text style={[styles.logoutButtonText, { color: colors.error }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: colors.textLight }]}>
            EventoBooking v1.0.0
          </Text>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: SPACING.sm,
    },
    headerTitle: {
      flex: 1,
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.bold,
      marginLeft: SPACING.md,
    },
    placeholder: {
      width: 40,
    },
    scrollContent: {
      paddingVertical: SPACING.lg,
    },
    section: {
      marginBottom: SPACING.xxl,
    },
    sectionTitle: {
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
      marginHorizontal: SPACING.lg,
      marginBottom: SPACING.lg,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
    },
    settingIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingLabel: {
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
      marginBottom: SPACING.xs,
    },
    settingDescription: {
      fontSize: FONT_SIZE.xs,
    },
    divider: {
      height: 1,
      marginHorizontal: SPACING.lg,
      marginLeft: 70,
    },
    logoutSection: {
      paddingHorizontal: SPACING.lg,
      marginBottom: SPACING.xxl,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      gap: SPACING.md,
    },
    logoutButtonText: {
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
    },
    versionSection: {
      alignItems: 'center',
      paddingVertical: SPACING.lg,
    },
    versionText: {
      fontSize: FONT_SIZE.sm,
    },
  });

export default SettingsScreen;
