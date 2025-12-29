import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
