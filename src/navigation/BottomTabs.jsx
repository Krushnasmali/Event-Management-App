// navigation/BottomTabsNavigator.js - Floating Bottom Bar with Dark Navy Theme
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './HomeStack';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../theme/ThemeContext';
import { FONT_SIZE } from '../theme/spacing';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </ProfileStack.Navigator>
  );
};

const BottomTabs = () => {
  const { colors } = useTheme();
  const dynamicStyles = createStyles(colors);

  return (
    <View style={dynamicStyles.wrapper}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home-variant' : 'home-variant-outline';
            } else if (route.name === 'BookingsTab') {
              iconName = focused ? 'calendar-check' : 'calendar-check-outline';
            } else if (route.name === 'NotificationsTab') {
              iconName = focused ? 'bell' : 'bell-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'account' : 'account-outline';
            }

            return (
              <View
                style={[
                  dynamicStyles.iconWrapper,
                  focused && dynamicStyles.activeIconWrapper,
                ]}
              >
                <Icon name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarShowLabel: true,
          tabBarStyle: dynamicStyles.tabBarStyle,
          tabBarLabelStyle: {
            fontSize: FONT_SIZE.xs,
            fontWeight: '600',
            marginTop: 2,
          },
          tabBarItemStyle: dynamicStyles.tabBarItem,
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="BookingsTab"
          component={BookingsScreen}
          options={{ title: 'Bookings' }}
        />
        <Tab.Screen
          name="NotificationsTab"
          component={NotificationsScreen}
          options={{ title: 'Alerts' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabBarStyle: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
      height: 70,
      borderRadius: 24,
      backgroundColor: colors.surface,
      borderTopWidth: 0,
      elevation: 20,
      shadowColor: colors.shadowDark,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.8,
      shadowRadius: 16,
      paddingBottom: 8,
      paddingTop: 8,
      // Cinematic glow effect
      borderWidth: 1,
      borderColor: 'rgba(255, 107, 107, 0.1)',
    },
    tabBarItem: {
      flex: 1,
      paddingVertical: 8,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease',
    },
    activeIconWrapper: {
      backgroundColor: 'rgba(255, 107, 107, 0.15)',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
  });

export default BottomTabs;
