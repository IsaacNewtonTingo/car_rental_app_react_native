import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SearchedCars({navigation, route}) {
  const [loadingData, setLoadingData] = useState(true);
  const [noCarsData, setNoCarsData] = useState(true);
  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    getAllCars();
  }, []);

  async function getAllCars() {
    const subscriber = await firestore()
      .collectionGroup('CarOwner')
      .where('make', '==', route.params.make)
      .limit(10)
      .get()
      .then(querysnapshot => {
        const cars = [];
        if (querysnapshot.size <= 0) {
          setNoCarsData(true);
          setLoadingData(false);
          console.log('No data');
        } else {
          querysnapshot.forEach(documentSnapshot => {
            cars.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().uniqueID,
            });
          });
          setLoadingData(false);
          setCarsList(cars);
          console.log(cars);
        }
      })
      .catch(err => {
        console.log(err);
        setLoadingData(false);
      });

    return subscriber;
  }

  return (
    <View>
      <Text>SearchedCars</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
