import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './app/navigators/tabNavigator';
import AuthStack from './app/navigators/authStack';
import {LogBox} from 'react-native';

import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'Warning: Each child in a list should have a unique',
  'Unhandled promise rejection: FirebaseError: Quota exceeded.',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'Require cycles',
  "Warning: Can't perform a React state update on an unmounted component.",
  'Error: User cancelled image selection...',
  'Error: [storage/unknown] No content provider...',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'TypeError: null is not an object...',
]);
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
