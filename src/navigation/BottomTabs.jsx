import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './HomeStack';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { COLORS } from '../theme/colors';
import { FONT_SIZE } from '../theme/spacing';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'BookingsTab') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'NotificationsTab') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 12,
          borderRadius: 24,
          backgroundColor: COLORS.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: COLORS.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 6,
          height: 64,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.xs,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          title: 'Bookings',
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          title: 'Alerts',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
