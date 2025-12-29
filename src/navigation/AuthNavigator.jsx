// AuthNavigator.jsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabsNavigator from './BottomTabs';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
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
      <Stack.Screen
        name="MainApp"
        component={BottomTabsNavigator}
        options={{
          headerShown: false,
          animationEnabled: true,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
