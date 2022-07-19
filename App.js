import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './app/navigators/tabNavigator';
import AuthStack from './app/navigators/authStack';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
