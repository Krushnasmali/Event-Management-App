// AuthNavigator.jsx
// Navigation controller based on authentication state

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabsNavigator from './BottomTabs';

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {isAuthenticated ? (
        // Authenticated: Show MainApp
        <Stack.Screen
          name="MainApp"
          component={BottomTabsNavigator}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: false,
          }}
        />
      ) : (
        // Not Authenticated: Show Login/Register Stack
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
              animationEnabled: true,
              animation: 'slide_from_right',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
