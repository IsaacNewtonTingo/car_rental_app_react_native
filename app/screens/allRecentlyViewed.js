import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../components/colors';

export default function AllRecentlyViewed() {
  return (
    <View style={styles.container}>
      <Text>AllRecentlyViewed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
