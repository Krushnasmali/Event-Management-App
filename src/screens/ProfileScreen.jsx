import React, { useState, useEffect } from 'react';
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
import CustomModal from '../components/CustomModal';
import firebaseAuth from '../services/firebaseAuth';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userName, setUserName] = useState('Guest User');
  const [userEmail, setUserEmail] = useState('user@eventobooking.com');

  useEffect(() => {
    // Get current user info from Firebase
    const currentUser = firebaseAuth.getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.displayName || 'User');
      setUserEmail(currentUser.email || 'user@eventobooking.com');
    }
  }, []);

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    const result = await firebaseAuth.signOut();
    setIsLoggingOut(false);
    setShowLogoutModal(false);

    if (!result.success) {
      // Show error if logout fails
      alert('Logout Failed', result.error);
    }
    // If logout is successful, App.jsx will detect the auth state change
    // and navigate to LoginScreen automatically
  };

  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', color: '#8B5CF6', onPress: () => {} },
    { icon: 'heart', label: 'Saved Services', color: '#F472B6', onPress: () => {} },
    { icon: 'credit-card', label: 'Payment Methods', color: '#34D399', onPress: () => {} },
    { icon: 'cog', label: 'Settings', color: '#A78BFA', onPress: () => navigation.navigate('SettingsScreen') },
    { icon: 'help-circle', label: 'Help & Support', color: '#60A5FA', onPress: () => {} },
    { icon: 'logout', label: 'Logout', color: '#F87171', onPress: handleLogoutPress },
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B061A" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0B061A', '#1A0B3D', '#2A0E6F']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#7C3AED', '#5B21B6']}
            style={styles.avatarWrapper}
          >
            <Icon name="account" size={56} color="#fff" />
          </LinearGradient>

          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statChip}>
              <Icon name="calendar-check" size={14} color="#8B5CF6" />
              <Text style={styles.statText}>0 Bookings</Text>
            </View>
            <View style={styles.statChip}>
              <Icon name="star-outline" size={14} color="#8B5CF6" />
              <Text style={styles.statText}>No Reviews</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.completeBtn} activeOpacity={0.85}>
            <Icon name="pencil-outline" size={16} color="#8B5CF6" />
            <Text style={styles.completeText}>Complete your profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.75}
              onPress={item.onPress}
              disabled={isLoggingOut}
            >
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: item.color + '22' },
                ]}
              >
                <Icon name={item.icon} size={22} color={item.color} />
              </View>

              <Text style={styles.menuLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={22} color="#AAA" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.brand}>EventoBooking</Text>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <CustomModal
        visible={showLogoutModal}
        title="Logout?"
        message="Are you sure you want to logout? You'll need to sign in again to continue."
        buttons={[
          {
            text: 'Cancel',
            onPress: () => setShowLogoutModal(false),
            style: 'secondary',
          },
          {
            text: isLoggingOut ? 'Logging out...' : 'Logout',
            onPress: handleConfirmLogout,
            disabled: isLoggingOut,
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
      alignItems: 'center',
      paddingVertical: SPACING.xxxl,
      paddingHorizontal: SPACING.lg,
    },

    avatarWrapper: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SPACING.md,
    },

    name: {
      color: '#fff',
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.black,
    },

    email: {
      color: '#AAA',
      fontSize: FONT_SIZE.sm,
      marginTop: 4,
    },

    statsRow: {
      flexDirection: 'row',
      marginTop: SPACING.lg,
    },

    statChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      marginHorizontal: 6,
      gap: 6,
    },

    statText: {
      color: '#DDD',
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.semibold,
    },

    completeBtn: {
      marginTop: SPACING.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: 20,
      backgroundColor: '#fff',
    },

    completeText: {
      color: '#6D28D9',
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
    },

    sectionTitle: {
      marginTop: SPACING.xl,
      marginBottom: SPACING.sm,
      paddingHorizontal: SPACING.lg,
      color: '#AAA',
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
    },

    menuContainer: {
      paddingHorizontal: SPACING.lg,
    },

    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.08)',
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.md,
      borderRadius: BORDER_RADIUS.md,
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.12)',
    },

    menuIcon: {
      width: 44,
      height: 44,
      borderRadius: BORDER_RADIUS.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.lg,
    },

    menuLabel: {
      flex: 1,
      color: '#fff',
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.medium,
    },

    footer: {
      marginTop: SPACING.lg,
      alignItems: 'center',
    },

    version: {
      color: '#777',
      fontSize: FONT_SIZE.xs,
    },

    brand: {
      marginTop: 2,
      color: '#AAA',
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
    },
  });
