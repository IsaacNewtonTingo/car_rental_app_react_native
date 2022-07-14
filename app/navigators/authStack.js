import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import Home from '../screens/home';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../components/colors';

import SignUp from '../screens/signup';
import Welcome from '../screens/welcome';

const Stack = createNativeStackNavigator();
const B = props => (
  <Text
    style={{
      color: '#33cccc',
      fontWeight: '900',
    }}>
    {props.children}
  </Text>
);

function LogoTitle() {
  return (
    <View style={{marginHorizontal: 10}}>
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          fontFamily: 'PaytoneOne-Regular',
          textShadowColor: 'black',
          textShadowOffset: {
            height: 1,
            width: 1,
          },
          textShadowRadius: 2,
        }}>
        Create account
      </Text>
    </View>
  );
}

export default function AuthStack() {
  const navigation = useNavigation();

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: props => (
          <TouchableOpacity onPress={navigation.goBack} {...props}>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: '#262626',
              }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: colors.green,
          },
          title: '',
          headerTitle: props => <LogoTitle {...props} />,
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
