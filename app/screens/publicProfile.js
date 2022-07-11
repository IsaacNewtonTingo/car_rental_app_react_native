import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../components/colors';
import {Avatar} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

export default function PublicProfile({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground
          style={styles.coverImage}
          source={{
            uri: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
          }}></ImageBackground>
        <Avatar.Image
          style={styles.avatar}
          size={200}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
          }}
        />

        <View style={styles.nameAndBioContainer}>
          <Text style={styles.name}>Isaac Newton Tingo</Text>

          <Text style={styles.bio}>
            The best car dealer.I have a collection of over 200 cars ready for
            you. Hit my line for dope deals
          </Text>

          <Text style={[styles.bio, {color: '#cccccc'}]}>0724753175</Text>

          <Text style={[styles.bio, {color: '#cccccc'}]}>Nairobi, Kenya</Text>
        </View>

        <View style={styles.topBTNsContainer}>
          <TouchableOpacity
            style={[styles.topBTNS, {backgroundColor: colors.textBlue}]}>
            <Text style={styles.btnText}>Follow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topBTNS}>
            <Text style={styles.btnText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.otherCarsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetails')}
          style={styles.otherCarItem}>
          <Image
            style={styles.otherCarImg}
            source={require('../assets/images/bmw.jpg')}
          />
          <View style={styles.carTextDataContainer}>
            <Text
              style={[
                styles.featdataText,
                {color: colors.orange, fontSize: 18},
              ]}>
              BMW
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>5.8</Text>
              <AntDesign name="star" size={10} color={colors.yellow} />
            </View>

            <Text style={styles.featdataText}>4000 / day</Text>
            <Text style={styles.featdataText}>Nairobi, Kenya</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetails')}
          style={styles.otherCarItem}>
          <Image
            style={styles.otherCarImg}
            source={require('../assets/images/juke.png')}
          />
          <View style={styles.carTextDataContainer}>
            <Text
              style={[
                styles.featdataText,
                {color: colors.orange, fontSize: 18},
              ]}>
              Nissan Juke
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>5.4</Text>
              <AntDesign name="star" size={10} color={colors.yellow} />
            </View>
            <Text style={styles.featdataText}>4000 / day</Text>
            <Text style={styles.featdataText}>Nairobi, Kenya</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    height: 650,
    alignItems: 'center',
  },
  coverImage: {
    height: width / 1.7,
    width: width,
  },
  nameAndBioContainer: {
    top: 100,
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontWeight: '800',
    fontSize: 30,
    color: 'white',
  },
  bio: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
    fontWeight: '700',
  },
  topBTNsContainer: {
    top: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  topBTNS: {
    height: 50,
    backgroundColor: colors.purple,
    width: '45%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: '800',
  },
  otherCarItem: {
    height: 140,
    backgroundColor: colors.background,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  otherCarsContainer: {
    marginTop: 20,
  },
  otherCarImg: {
    height: '100%',
    width: '50%',
  },
  carTextDataContainer: {
    padding: 10,
    flex: 1,
  },
  iconAndDescCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    top: 15,
  },
  ratingText: {
    fontWeight: '800',
    color: colors.yellow,
    fontSize: 10,
  },
  featdataText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#595959',
    fontFamily: 'PaytoneOne-Regular',
  },
});
