import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

import colors from '../components/colors';

const Welcome = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/welcomeImg.jpg')}
        style={styles.imgBG}>
        <View style={styles.itemsCont}>
          <Text style={styles.title}>Premium cars.{'\n'}Enjoy the luxury</Text>
          <Text style={styles.desc}>
            All type cars for a daily rental rate, all in one platform.{'\n'}
            Experience the thrill at affordable prices
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PickService')}
            style={styles.welcomeBtn}>
            <Text style={styles.btnText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    position: 'relative',
  },
  imgBG: {
    position: 'relative',
    flex: 1,
  },
  title: {
    color: 'white',
    marginLeft: 20,
    fontSize: 30,
    fontWeight: '900',
  },
  welcomeBtn: {
    height: 50,
    backgroundColor: '#ccddff',
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: {width: 10, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 100,
  },
  btnText: {
    color: 'black',
    fontWeight: '700',
  },
  itemsCont: {
    marginTop: 480,
  },
  desc: {
    color: colors.gray,
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: '700',
  },
});
