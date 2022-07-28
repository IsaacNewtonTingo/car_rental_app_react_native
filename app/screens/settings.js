import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

export default function Settings() {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={async () => {
          await auth().signOut();
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
