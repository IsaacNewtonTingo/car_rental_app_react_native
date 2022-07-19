import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../components/colors';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

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
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // getCars();
  }, []);

  function getCars() {
    axios
      .get('https://api.api-ninjas.com/v1/cars?make=' + make, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'WfNJxXg9ChbMQ/igS7Ro4A==R7qK1EkGNT0z3QVg',
          'content-type': 'application/json',
        },
      })
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
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
            uri: 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}>
          <TouchableOpacity>
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
            uri: 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}>
          <TouchableOpacity>
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
            uri: 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}>
          <TouchableOpacity>
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
        onChangeText={setMake}
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
      </View>

      <Text style={styles.label}>Mileage (km)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 14000"
        value={seatsNumber}
        onChangeText={setSeatsNumber}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Number of seats</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 4"
        value={seatsNumber}
        onChangeText={setSeatsNumber}
      />

      <View style={styles.counterContainer}>
        <Text style={styles.label}>Description</Text>
        <Text style={{fontWeight: '800', color: 'gray', marginRight: 10}}>
          {description.length}/200
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="e.g RAV4"
        value={description}
        onChangeText={setDescription}
        maxLength={200}
      />

      <Text style={styles.label}>Rate (Per day)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g RAV4"
        value={rate}
        onChangeText={setRate}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g John Doe"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 0724753175"
        value={phoneNumber}
        onChangeText={setPhoneNUmber}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g Nairobi, Kenya"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.postCarBTN}>
        <Text style={styles.postCarBTNText}>Post car</Text>
      </TouchableOpacity>
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
});
