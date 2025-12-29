import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import firebaseAuth from './src/services/firebaseAuth';

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    let unsubscribe;

    // Subscribe to auth state changes
    unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#090017',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthNavigator isAuthenticated={!!user} />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
