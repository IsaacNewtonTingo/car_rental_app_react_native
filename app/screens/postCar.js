import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import colors from '../components/colors';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import uuid from 'react-native-uuid';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import DropDownPicker from 'react-native-dropdown-picker';

const width = Dimensions.get('window').width;
const makeData = require('../assets/carsData/car-make.json');

export default function PostCar() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [seatsNumber, setSeatsNumber] = useState('');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('automatic');
  const [fuelType, setFuelType] = useState('petrol');
  const [rate, setRate] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [location, setLocation] = useState('');

  const [makeModalVisible, setMakeModalVisible] = useState(false);

  const [filterdData, setfilterdData] = useState(makeData);
  const [masterData, setmasterData] = useState(makeData);
  const [search, setSearch] = useState('');

  const [transferred, setTransferred] = useState(0);
  const [uid, setUserId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(location);
    ref.current?.getAddressText(location);
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    const userID = auth().currentUser.uid;

    try {
      const subscriber = firestore()
        .collection('Users')
        .doc(userID)
        .onSnapshot(onResult, onError);
      return subscriber;
    } catch (error) {
      console.log(error);
    }
  }

  function onResult(QuerySnapshot) {
    const docData = QuerySnapshot.data();
    if (docData) {
      setName(docData.name);
      setPhoneNUmber(docData.phoneNumber);
      setProfilePic(docData.profilePic);
    } else {
      setName('');
      setPhoneNUmber('');
      setProfilePic('');
    }
  }

  function onError(error) {
    console.log(error);
  }

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.Make_Name
          ? item.Make_Name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(masterData);
      setSearch(text);
    }
  };

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const ItemView = ({item}) => {
    return (
      <Text
        onPress={() => {
          setMake(Capitalize(item.Make_Name.toLowerCase()));
          setMakeModalVisible(false);
        }}
        style={styles.itemStyle}>
        {Capitalize(item.Make_Name.toLowerCase())}
      </Text>
    );
  };

  async function submitForm() {
    if (
      !make ||
      !model ||
      !seatsNumber ||
      !mileage ||
      !transmission ||
      !fuelType ||
      !rate ||
      !name ||
      !phoneNumber ||
      !location ||
      !image1 ||
      !image2 ||
      !image3
    ) {
      Alert.alert('All fields are required');
    } else {
      const userID = auth().currentUser.uid;
      let imageUrl1 = await uploadImage1();
      let imageUrl2 = await uploadImage2();
      let imageUrl3 = await uploadImage3();

      await firestore()
        .collection('CarMake')
        .doc(make)
        .collection('CarModel')
        .doc(model)
        .collection('CarOwner')
        .doc(userID)
        .set({
          image1: imageUrl1,
          image2: imageUrl2,
          image3: imageUrl3,
          make: make,
          model: model,
          mileage: mileage,
          seatsNumber: seatsNumber,
          transmission: transmission,
          fuelType: fuelType,
          rate: parseInt(rate.replace(/,/g, '')),
          owner: name,
          profilePic: profilePic,
          carOwnerID: userID,
          phoneNumber: phoneNumber,
          location: location,
          isPromoted: true,
          datePromoted: '',
          rating: 0,
          uniqueID: uuid.v4(),
          savedBy: [],
          carViewedBy: [],
        })

        .catch(err => {
          console.log(err);
        })
        .then(() => {
          Alert.alert('Posted successfully');
        });
    }
  }

  function openLibrary1() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setImage1(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  function openLibrary2() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setImage2(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  function openLibrary3() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      // cropping: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        setImage3(image.path);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  const uploadImage1 = async () => {
    if (image1 == null) {
      return null;
    }
    const uploadUri = image1;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setIsSubmitting(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setIsSubmitting(false);
      setImage1(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const uploadImage2 = async () => {
    if (image2 == null) {
      return null;
    }
    const uploadUri = image2;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setIsSubmitting(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setIsSubmitting(false);
      setImage2(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const uploadImage3 = async () => {
    if (image3 == null) {
      return null;
    }
    const uploadUri = image3;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setIsSubmitting(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setIsSubmitting(false);
      setImage3(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Text style={[styles.label, {marginBottom: 20}]}>Select images</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imagesContainer}>
        <ImageBackground
          style={styles.mainImage}
          source={{
            uri: image1
              ? image1
              : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}>
          <TouchableOpacity onPress={openLibrary1}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={30}
              color="#009999"
            />
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          style={styles.mainImage}
          source={{
            uri: image2
              ? image2
              : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}>
          <TouchableOpacity onPress={openLibrary2}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={30}
              color="#009999"
            />
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          style={styles.mainImage}
          source={{
            uri: image3
              ? image3
              : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}>
          <TouchableOpacity onPress={openLibrary3}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={30}
              color="#009999"
            />
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>

      <Text style={styles.label}>Make</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g Toyota"
        value={make}
        onFocus={() => setMakeModalVisible(true)}
      />

      <Text style={styles.label}>Model</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g RAV4"
        value={model}
        onChangeText={setModel}
      />

      <View style={styles.radiosContainer}>
        <Text style={[styles.label, {marginBottom: 20}]}>Transmission</Text>

        <View style={styles.radioAndText}>
          <RadioButton
            value="automatic"
            status={transmission === 'automatic' ? 'checked' : 'unchecked'}
            onPress={() => {
              setTransmission('automatic');
            }}
          />
          <Text style={styles.transText}>Automatic</Text>
        </View>

        <View style={styles.radioAndText}>
          <RadioButton
            value="manual"
            status={transmission === 'manual' ? 'checked' : 'unchecked'}
            onPress={() => {
              setTransmission('manual');
            }}
          />
          <Text style={styles.transText}>Manual</Text>
        </View>
      </View>

      <View style={styles.radiosContainer}>
        <Text style={[styles.label, {marginBottom: 20}]}>Fuel type</Text>

        <View style={styles.radioAndText}>
          <RadioButton
            value="petrol"
            status={fuelType === 'petrol' ? 'checked' : 'unchecked'}
            onPress={() => {
              setFuelType('petrol');
            }}
          />
          <Text style={styles.transText}>Petrol</Text>
        </View>

        <View style={styles.radioAndText}>
          <RadioButton
            value="diesel"
            status={fuelType === 'diesel' ? 'checked' : 'unchecked'}
            onPress={() => {
              setFuelType('diesel');
            }}
          />
          <Text style={styles.transText}>Diesel</Text>
        </View>

        <View style={styles.radioAndText}>
          <RadioButton
            value="electric"
            status={fuelType === 'electric' ? 'checked' : 'unchecked'}
            onPress={() => {
              setFuelType('electric');
            }}
          />
          <Text style={styles.transText}>Electric</Text>
        </View>
      </View>

      <Text style={styles.label}>Mileage (km)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 14000"
        value={mileage}
        onChangeText={setMileage}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Number of seats</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 4"
        value={seatsNumber}
        onChangeText={setSeatsNumber}
      />

      <Text style={styles.label}>Rate (Per day)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g KSH.3000"
        value={rate}
        onChangeText={setRate}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g John Doe"
        value={name}
        onChangeText={setName}
        editable={false}
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 0724753175"
        value={phoneNumber}
        onChangeText={setPhoneNUmber}
        editable={false}
      />

      <Text style={styles.label}>Location</Text>

      <View style={{marginTop: 10}}>
        <Entypo style={styles.icons} name="location" size={20} color="black" />

        <GooglePlacesAutocomplete
          ref={ref}
          keyboardShouldPersistTaps="always"
          fetchDetails={true}
          placeholder="Search your location"
          onPress={(data, details = null) => {
            setLocation(data.description);
          }}
          query={{
            key: 'AIzaSyB7rOUlrE_lVRVv2unWyqjBiqVuQcwxd1U',
            language: 'en',
            components: 'country:ke',
            types: '(cities)',
          }}
          styles={{
            textInput: {
              backgroundColor: '#ccdcff',
              height: 50,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 40,
              fontSize: 15,
              borderBottomWidth: 1,
              color: 'black',
              width: '50%',
            },
            listView: {
              flex: 1,
            },
            textInputContainer: {
              flexDirection: 'row',
            },
          }}
        />
      </View>

      <Modal
        onRequestClose={() => setMakeModalVisible(false)}
        animationType="slide"
        transparent={true}
        visible={makeModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.searchContainer}>
              <Ionicons
                style={styles.searchIcon}
                name="search"
                size={20}
                color="black"
              />
              <TextInput
                style={[styles.input, {paddingHorizontal: 40}]}
                placeholder="Search a car make"
                placeholderTextColor="gray"
                value={search}
                underlineColorAndroid="transparent"
                onChangeText={text => searchFilter(text)}
              />
            </View>

            <FlatList
              keyboardShouldPersistTaps="always"
              data={filterdData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={ItemView}
            />
          </View>
        </View>
      </Modal>

      {isSubmitting == false ? (
        <TouchableOpacity onPress={submitForm} style={styles.postCarBTN}>
          <Text style={styles.postCarBTNText}>Post car</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={true}
          style={[styles.postCarBTN, {backgroundColor: '#993366'}]}>
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  label: {
    fontWeight: '800',
    color: 'black',
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ccdcff',
    paddingHorizontal: 20,
    marginVertical: 10,
    color: 'black',
  },
  radioAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transText: {
    color: 'gray',
    fontWeight: '800',
  },
  radiosContainer: {
    backgroundColor: '#ccdcff',
    paddingVertical: 20,
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  mainImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postCarBTN: {
    height: 50,
    backgroundColor: colors.purple,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  postCarBTNText: {
    color: 'white',
    fontWeight: '800',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    marginTop: 50,
  },
  modalView: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    width: width,
    height: '100%',
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
    top: 23,
    zIndex: 1,
  },
  itemStyle: {
    padding: 15,
    fontWeight: '800',
    marginHorizontal: 10,
    backgroundColor: '#ccdcff',
    marginBottom: 10,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
  },
  icons: {
    position: 'absolute',
    top: 13,
    zIndex: 1,
    left: 10,
  },
});
