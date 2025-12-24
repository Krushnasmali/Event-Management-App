import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigator from './src/navigation/BottomTabs';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
