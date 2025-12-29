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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
        { icon: 'account-edit', label: 'Edit Profile', description: 'Update your personal information' },
        { icon: 'shield-account', label: 'Privacy Settings', description: 'Manage your privacy preferences' },
        { icon: 'lock-reset', label: 'Change Password', description: 'Update your account password' },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { icon: 'bell', label: 'Notifications', description: 'Configure notification preferences' },
        { icon: 'translate', label: 'Language', description: 'Choose your preferred language' },
        { icon: 'map-marker', label: 'Location', description: 'Manage location settings' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', label: 'Help & Support', description: 'Get help and contact support' },
        { icon: 'file-document', label: 'Terms & Conditions', description: 'Read our terms and conditions' },
        { icon: 'shield-check', label: 'Privacy Policy', description: 'Read our privacy policy' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B061A" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0B061A', '#1A0B3D', '#2A0E6F']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {settingsSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.card}>
              {section.items.map((item, iIndex) => (
                <View key={iIndex}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.item}
                  >
                    <View style={styles.iconBox}>
                      <Icon name={item.icon} size={20} color="#8B5CF6" />
                    </View>

                    <View style={styles.textBox}>
                      <Text style={styles.itemLabel}>{item.label}</Text>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    </View>

                    <Icon name="chevron-right" size={22} color="#AAA" />
                  </TouchableOpacity>

                  {iIndex !== section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View style={styles.logoutWrap}>
          <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
            <Icon name="logout" size={20} color="#F87171" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View style={styles.versionWrap}>
          <Text style={styles.versionText}>EventoBooking v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0B061A',
    },

    scroll: {
      paddingBottom: 140,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.lg,
    },

    backBtn: {
      padding: SPACING.sm,
    },

    headerTitle: {
      flex: 1,
      color: '#fff',
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.black,
      marginLeft: SPACING.md,
    },

    section: {
      marginTop: SPACING.xl,
    },

    sectionTitle: {
      marginBottom: SPACING.md,
      marginHorizontal: SPACING.lg,
      color: '#AAA',
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
    },

    card: {
      marginHorizontal: SPACING.lg,
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.12)',
      overflow: 'hidden',
    },

    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.md,
    },

    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'rgba(139,92,246,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.md,
    },

    textBox: {
      flex: 1,
    },

    itemLabel: {
      color: '#fff',
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
      marginBottom: 2,
    },

    itemDesc: {
      color: '#AAA',
      fontSize: FONT_SIZE.xs,
    },

    divider: {
      height: 1,
      marginLeft: 70,
      backgroundColor: 'rgba(255,255,255,0.12)',
    },

    logoutWrap: {
      marginTop: SPACING.xxl,
      paddingHorizontal: SPACING.lg,
    },

    logoutBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.md,
      paddingVertical: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: 'rgba(248,113,113,0.15)',
    },

    logoutText: {
      color: '#F87171',
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
    },

    versionWrap: {
      marginTop: SPACING.lg,
      alignItems: 'center',
    },

    versionText: {
      color: '#777',
      fontSize: FONT_SIZE.sm,
    },
  });
