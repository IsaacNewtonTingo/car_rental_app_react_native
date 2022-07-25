import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../components/colors';
const width = Dimensions.get('window').width;

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function AllRecentlyViewed({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [allViewedCars, setallViewedCars] = useState([]);

  let onEndReachedCalledDuringMomentum = false;
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const currentUserID = auth().currentUser.uid;

  useEffect(() => {
    getAllViewedCars();
  }, [(navigation, loading)]);

  navigation.addListener('focus', () => setLoading(!loading));

  const viewedCarOwners = firestore().collectionGroup('CarOwner');

  async function getAllViewedCars() {
    const snapshot = await viewedCarOwners
      .where('carViewedBy', 'array-contains', currentUserID)
      .orderBy('rating', 'desc')
      .limit(10)
      .get()
      .catch(err => {
        console.log(err);
      });

    if (!snapshot.empty) {
      let newList = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newList.push(snapshot.docs[i].data());
      }

      setallViewedCars(newList);
      setLoadingData(false);
    } else {
      setLastDoc(null);
    }

    setLoadingData(false);
  }

  async function getMore() {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await viewedCarOwners
          .where('carViewedBy', 'array-contains', currentUserID)
          .orderBy('rating', 'desc')
          .startAfter(lastDoc.data().uniqueID)
          .limit(10)
          .get()
          .catch(err => {
            console.log(err);
          });

        if (!snapshot.empty) {
          let newList = allViewedCars;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newList.push(snapshot.docs[i].data());
          }

          setallViewedCars(newList);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
  }

  const onRefresh = () => {
    setTimeout(() => {
      getAllViewedCars();
    }, 1000);
  };

  const renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="small"
        color={'#D83E64'}
        style={{marginBottom: 10}}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={allViewedCars}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        initialNumToRender={10}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
            getMore();
          }
        }}
        ListFooterComponent={renderFooter}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => {
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
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
