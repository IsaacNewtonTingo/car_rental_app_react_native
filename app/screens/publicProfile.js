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
import React, {useEffect, useState} from 'react';
import colors from '../components/colors';
import {Avatar} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

export default function PublicProfile({navigation, route}) {
  const [loadingData, setLoadingData] = useState(true);
  const [noCarsData, setNoCarsData] = useState(true);
  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    getMyCars();
  }, []);

  async function getMyCars() {
    const subscriber = await firestore()
      .collectionGroup('CarOwner')
      .where('carOwnerID', '==', route.params.carOwnerID)
      .limit(10)
      .get()
      .then(querysnapshot => {
        const cars = [];
        if (querysnapshot.size <= 0) {
          setNoData(true);
          setLoadingData(false);
        } else {
          querysnapshot.forEach(documentSnapshot => {
            cars.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setLoadingData(false);
          setCarsList(cars);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });

    return subscriber;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <Avatar.Image
          style={styles.avatar}
          size={200}
          source={{
            uri: route.params.profilePic
              ? route.params.profilePic
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
        />

        <View style={styles.nameAndBioContainer}>
          <Text style={styles.name}>{route.params.owner}</Text>

          <Text style={[styles.bio, {color: '#cccccc'}]}>
            {route.params.phoneNumber}
          </Text>

          <Text style={[styles.bio, {color: '#cccccc'}]}>
            {route.params.location}
          </Text>
        </View>
      </View>

      <View style={styles.otherCarsContainer}>
        {carsList.map(item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CarDetails')}
            style={styles.otherCarItem}>
            <Image
              style={styles.otherCarImg}
              source={{
                uri: item.image1
                  ? item.image1
                  : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
              }}
            />
            <View style={styles.carTextDataContainer}>
              <Text
                style={[
                  styles.featdataText,
                  {color: colors.orange, fontSize: 18},
                ]}>
                {item.make} {item.model}
              </Text>

              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <AntDesign name="star" size={10} color={colors.yellow} />
              </View>

              <Text style={styles.featdataText}>{item.rate} / day</Text>
              <Text style={styles.featdataText}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    height: 500,
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
