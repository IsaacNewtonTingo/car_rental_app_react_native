import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../components/colors';

const {width} = Dimensions.get('window');
const carsData = require('../assets/carsData/car-make.json');

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Home({navigation}) {
  const [noData, setNoData] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(true);

  const [carsList, setCarsList] = useState([]);
  const [promotedCarsList, setPromotedCarsList] = useState([]);
  const [noRecentlyViewed, setNoRecentlyViewed] = useState(false);
  const [viewedCarsList, setViewedCarsList] = useState([]);

  const [filtered, setFiltered] = useState(carsData);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const currentUserID = auth().currentUser.uid;
  navigation.addListener('focus', () => setLoading(!loading));

  const B = props => (
    <Text style={{color: colors.orange}}>{props.children}</Text>
  );

  useEffect(() => {
    getAllCars();
    getFeaturedCars();
    getRecentlyViewed();
  }, [(navigation, loading)]);

  function onSearch(text) {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = carsData.filter(item => {
        if (item.Make_Name.toLowerCase().match(temp))
          return item.Make_Name.toLowerCase();
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(carsData);
    }
  }

  async function getAllCars() {
    const subscriber = await firestore()
      .collectionGroup('CarOwner')
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

  async function getFeaturedCars() {
    const subscriber = await firestore()
      .collectionGroup('CarOwner')
      .where('isPromoted', '==', true)
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
          setPromotedCarsList(cars);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });

    return subscriber;
  }

  async function addToCarsViewedBy({make, model, carOwnerID}) {
    await firestore()
      .collection('CarMake')
      .doc(make)
      .collection('CarModel')
      .doc(model)
      .collection('CarOwner')
      .doc(carOwnerID)
      .update({
        carViewedBy: firestore.FieldValue.arrayUnion(carOwnerID),
      })
      .catch(err => console.log(err));
  }

  async function getRecentlyViewed() {
    const subscriber = firestore()
      .collectionGroup('CarOwner')
      .where('carViewedBy', 'array-contains', currentUserID)
      .limit(10)
      .get()
      .then(querySnapshot => {
        const cars = [];

        if (querySnapshot.size <= 0) {
          setNoRecentlyViewed(true);
          setLoadingData(false);
        } else {
          setNoRecentlyViewed(false);
          querySnapshot.forEach(documentSnapshot => {
            cars.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
            setViewedCarsList(cars);
            setLoadingData(false);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => subscriber();
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={styles.introTextContainer}>
        <Text style={styles.introTexts}>
          You need a ride ? {'\n'}Get a <B>rental car</B> right here.
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={20}
          color={colors.gray}
        />
        <TextInput
          placeholder="Search for a car (e.g toyota)"
          style={styles.searchInput}
          placeholderTextColor="gray"
          onChangeText={text => {
            onSearch(text);
            setSearchValue();
          }}
          value={searchValue}
        />
      </View>

      <View style={{flex: 1, zIndex: 1000}}>
        {searching && (
          <FlatList
            keyboardShouldPersistTaps="always"
            style={{margin: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filtered}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SearchedCars', {
                    make: Capitalize(item.Make_Name.toLowerCase()),
                  })
                }
                key={item.key}
                style={{
                  backgroundColor: 'black',
                  padding: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>
                  {Capitalize(item.Make_Name.toLowerCase())}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Featured cars</Text>

        <TouchableOpacity onPress={() => navigation.navigate('AllFeatured')}>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredCarsScrollView}
        data={promotedCarsList}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.uniqueID}
            onPress={() => {
              addToCarsViewedBy({
                make: item.make,
                model: item.model,
                carOwnerID: item.carOwnerID,
              });
              navigation.navigate('CarDetails', {
                image1: item.image1,
                image2: item.image2,
                image3: item.image3,
                owner: item.owner,
                phoneNumber: item.phoneNumber,
                rate: item.rate,
                rating: item.rating,
                location: item.location,
                model: item.model,
                make: item.make,
                carOwnerID: item.carOwnerID,
                mileage: item.mileage,
                transmission: item.transmission,
                fuelType: item.fuelType,
                seatsNumber: item.seatsNumber,
              });
            }}
            style={styles.featuredCarContainer}>
            <Image
              style={styles.featuredCarImg}
              source={{
                uri: item.image1
                  ? item.image1
                  : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
              }}
            />
            <View style={styles.featuredData}>
              <View style={styles.iconAndDescCont}>
                <Ionicons
                  style={{marginRight: 10}}
                  name="car-sport"
                  size={20}
                  color={colors.gray}
                />
                <Text style={[styles.featdataText, {color: colors.orange}]}>
                  {item.make} {item.model}
                </Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Ionicons
                  style={{marginRight: 10}}
                  name="person"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.owner}</Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Entypo
                  style={{marginRight: 10}}
                  name="old-phone"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.phoneNumber}</Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Fontisto
                  style={{marginRight: 10}}
                  name="money-symbol"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.rate} / day</Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Ionicons
                  style={{marginRight: 10}}
                  name="location"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Hot deals</Text>

        <TouchableOpacity onPress={() => navigation.navigate('AllHotDeals')}>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otherCarsContainer}>
        {carsList.map(item => (
          <TouchableOpacity
            key={item.key}
            onPress={() => {
              addToCarsViewedBy({
                make: item.make,
                model: item.model,
                carOwnerID: item.carOwnerID,
              });
              navigation.navigate('CarDetails', {
                image1: item.image1,
                image2: item.image2,
                image3: item.image3,
                owner: item.owner,
                phoneNumber: item.phoneNumber,
                rate: item.rate,
                rating: item.rating,
                location: item.location,
                model: item.model,
                make: item.make,
                carOwnerID: item.carOwnerID,
                mileage: item.mileage,
                transmission: item.transmission,
                fuelType: item.fuelType,
                seatsNumber: item.seatsNumber,
              });
            }}
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
              <Text style={[styles.featdataText, {color: colors.orange}]}>
                {item.make} {item.model}
              </Text>

              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <AntDesign name="star" size={10} color={colors.yellow} />
              </View>
              <Text style={styles.featdataText}>{item.owner}</Text>
              <Text style={styles.featdataText}>{item.phoneNumber}</Text>
              <Text style={styles.featdataText}>{item.rate} / day</Text>
              <Text style={styles.featdataText}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Recently viewed</Text>

        <TouchableOpacity onPress={() => navigation.navigate('AllHotDeals')}>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredCarsScrollView}
        data={viewedCarsList}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.uniqueID}
            onPress={() =>
              navigation.navigate('CarDetails', {
                image1: item.image1,
                image2: item.image2,
                image3: item.image3,
                owner: item.owner,
                phoneNumber: item.phoneNumber,
                rate: item.rate,
                rating: item.rating,
                location: item.location,
                model: item.model,
                make: item.make,
                carOwnerID: item.carOwnerID,
                mileage: item.mileage,
                transmission: item.transmission,
                fuelType: item.fuelType,
                seatsNumber: item.seatsNumber,
              })
            }
            style={styles.featuredCarContainer}>
            <Image
              style={styles.featuredCarImg}
              source={{
                uri: item.image1
                  ? item.image1
                  : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
              }}
            />
            <View style={styles.featuredData}>
              <View style={styles.iconAndDescCont}>
                <Ionicons
                  style={{marginRight: 10}}
                  name="car-sport"
                  size={20}
                  color={colors.gray}
                />
                <Text style={[styles.featdataText, {color: colors.orange}]}>
                  {item.make} {item.model}
                </Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Ionicons
                  style={{marginRight: 10}}
                  name="person"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.owner}</Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Entypo
                  style={{marginRight: 10}}
                  name="old-phone"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.phoneNumber}</Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Fontisto
                  style={{marginRight: 10}}
                  name="money-symbol"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.rate} / day</Text>
              </View>

              <View style={styles.iconAndDescCont}>
                <Ionicons
                  style={{marginRight: 10}}
                  name="location"
                  size={20}
                  color={colors.gray}
                />
                <Text style={styles.featdataText}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  introTextContainer: {
    padding: 20,
  },
  introTexts: {
    color: 'black',
    fontWeight: '700',
    fontSize: 30,
  },
  searchContainer: {
    margin: 20,
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingLeft: 50,
    color: 'black',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  featuredAndViewAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  featTexts: {
    color: colors.textBlue,
    fontWeight: '700',
    fontSize: 16,
  },
  featuredCarsScrollView: {
    flex: 1,
    width: width,
  },
  featuredCarContainer: {
    width: width / 2,
    height: 300,
    backgroundColor: colors.background,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    margin: 20,
  },
  featuredCarImg: {
    height: '50%',
    width: '100%',
  },
  featuredData: {
    margin: 20,
  },
  featdataText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#595959',
    fontWeight: '700',
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
});
