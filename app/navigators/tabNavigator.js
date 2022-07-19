import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './homeStack';

import colors from '../components/colors';
import PostCar from '../screens/postCar';
import Notifications from '../screens/notifications';
import Settings from '../screens/settings';
import Discover from '../screens/discover';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={() => ({
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.green,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.green,
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          headerTitle: '',
          tabBarIcon: ({focused, color, size}) => {
            return <AntDesign name="home" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="PostCar"
        component={PostCar}
        options={{
          tabBarLabel: '',
          headerTitle: 'Post a car',
          tabBarIcon: ({focused, color, size}) => {
            return <Entypo name="add-to-list" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: '',
          headerTitle: 'Discover',
          tabBarIcon: ({focused, color, size}) => {
            return <Entypo name="compass" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: '',
          headerTitle: 'Notification',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name="ios-notifications-outline"
                size={30}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: '',
          headerTitle: 'Settings',
          tabBarIcon: ({focused, color, size}) => {
            return <Feather name="settings" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
