// navigation/BottomTabsNavigator.js - Modern Floating Bottom Bar with Dark Purple Active Icons
import React from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './HomeStack';
import BookingsScreen from '../screens/BookingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
    <View style={dynamicStyles.container}>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
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
              <View style={dynamicStyles.iconContainer}>
                <Animated.View
                  style={[
                    dynamicStyles.iconWrapper,
                    focused && dynamicStyles.activeIconWrapper,
                  ]}
                >
                  <Icon 
                    name={iconName} 
                    size={focused ? 22 : 20} 
                    color={focused ? '#ffffffff' : colors.textLight} // Dark Purple for active
                  />
                </Animated.View>
              
              </View>
            );
          },  
          tabBarActiveTintColor: '#784be1ff', // Dark Purple
          tabBarInactiveTintColor: colors.textLight,
          tabBarShowLabel: true,
          tabBarStyle: dynamicStyles.tabBar,
          tabBarLabelStyle: dynamicStyles.labelStyle,
          tabBarItemStyle: dynamicStyles.tabBarItem,
          listeners: ({ navigation }) => ({
            tabPress: (e) => {
              const state = navigation.getState();
              // If the same tab is already active, reset to root of that tab
              if (state.index === state.routes.findIndex(r => r.name === route.name)) {
                // If this is a stack navigator, reset to the first screen
                if (navigation.getParent()?.getState?.()) {
                  const parent = navigation.getParent();
                  if (route.name === 'HomeTab' && parent.getState().history.length > 1) {
                    navigation.navigate({
                      name: 'HomeMain',
                      merge: true,
                    });
                  }
                }
              }
            },
          }),
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

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 16,
    left: 16,
    right: 16,
    height: 80,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingTop: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)', // Dark Purple glow
    // Subtle gradient border effect
    overflow: 'visible',
  },
  tabBarItem: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
   
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 4,
  },
  activeIconWrapper: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(76, 0, 255, 0.3)',
    transform: [{ translateY: -5 }], // Moves icon up like reference image
  
  
    
  },

  labelStyle: {
    fontSize: FONT_SIZE.xxs,
    marginTop: 3,
    color: '#e7e6ebff', // Active label also purple
  },
});

export default BottomTabs;
