import {StyleSheet, Text, View, TextInput,ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../components/colors';

export default function PostCar() {
  useEffect(() => {
    getCars();
  }, []);

  const model = 'impreza';
  function getCars() {
    fetch('https://api.api-ninjas.com/v1/cars?model=' + model, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'WfNJxXg9ChbMQ/igS7Ro4A==R7qK1EkGNT0z3QVg',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text></Text>
      <TextInput placeholder=''/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
