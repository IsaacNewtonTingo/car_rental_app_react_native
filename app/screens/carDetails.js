import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../components/colors';
import {Avatar} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default function CarDetails({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {}, []);
  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal pagingEnabled={true} style={styles.carImages}>
        <Image
          style={styles.detailsImage}
          source={{
            uri: route.params.image1
              ? route.params.image1
              : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}
        />
        <Image
          style={styles.detailsImage}
          source={{
            uri: route.params.image2
              ? route.params.image2
              : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}
        />

        <Image
          style={styles.detailsImage}
          source={{
            uri: route.params.image3
              ? route.params.image3
              : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6',
          }}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PublicProfile', {
            profilePic: route.params.profilePic,
            owner: route.params.owner,
            carOwnerID: route.params.carOwnerID,
            location: route.params.location,
            phoneNumber: route.params.phoneNumber,
          })
        }
        style={styles.toProfile}>
        <Avatar.Image
          size={60}
          source={{
            uri: route.params.profilePic
              ? route.params.profilePic
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
        />

        <View style={styles.dealerDetailsContainer}>
          <Text style={styles.carText}>
            {route.params.make} {route.params.model}
          </Text>

          <Text style={{color: colors.orange, fontWeight: '800'}}>
            {route.params.owner}
          </Text>
        </View>

        {/* <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{route.params.rating}</Text>
          <AntDesign name="star" size={12} color="yellow" />
        </View> */}
      </TouchableOpacity>

      <View style={styles.carSpecs}>
        <View style={styles.overPayContainer}>
          <Text style={styles.overviewText}>Overview</Text>
          <Text style={styles.overviewText}>KSH. {route.params.rate}/day</Text>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.carSpecsItem}>
            <Ionicons name="speedometer-outline" size={50} color="gray" />
            <Text style={styles.specific}>{route.params.mileage} km</Text>
          </View>

          <View style={styles.carSpecsItem}>
            <MaterialCommunityIcons
              name="car-shift-pattern"
              size={50}
              color="gray"
            />
            <Text style={styles.specific}>{route.params.transmission}</Text>
          </View>

          <View style={styles.carSpecsItem}>
            <MaterialCommunityIcons name="gas-station" size={50} color="gray" />
            <Text style={styles.specific}>{route.params.fuelType}</Text>
          </View>

          <View style={styles.carSpecsItem}>
            <MaterialCommunityIcons
              name="seat-outline"
              size={50}
              color="gray"
            />
            <Text style={styles.specific}>
              {route.params.seatsNumber} seats
            </Text>
          </View>
        </View>
      </View>

      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${route.params.phoneNumber}`)}
              style={{
                width: '90%',
                height: 50,
                backgroundColor: colors.textBlue,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Feather name="phone-call" size={20} color={colors.orange} />
              <Text style={[styles.btnText, {marginLeft: 10}]}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(`sms:${route.params.phoneNumber}`)}
              style={{
                width: '90%',
                height: 50,
                backgroundColor: colors.purple,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <MaterialIcons name="sms" size={20} color={colors.orange} />
              <Text style={[styles.btnText, {marginLeft: 10}]}>SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{marginTop: 20}}>
              <Text style={{fontWeight: '800', color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.btnBook}>
        <Text style={styles.btnText}>Contact dealer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  carImages: {
    width: width,
    flex: 1,
  },
  detailsImage: {
    width: width - 40,
    height: width / 1.7,
    marginRight: 10,
  },
  toProfile: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dealerDetailsContainer: {
    marginLeft: 20,
  },
  dealerDetails: {
    color: 'gray',
    fontWeight: '800',
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
    color: 'yellow',
    fontSize: 12,
    marginRight: 10,
  },
  overPayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  overviewText: {
    color: colors.textBlue,
    fontWeight: '800',
    fontSize: 16,
  },

  lowerContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carSpecs: {
    marginTop: 20,
  },
  carSpecsItem: {
    width: '48%',
    borderRadius: 20,
    height: 80,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  specific: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 10,
    color: 'gray',
  },
  btnBook: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 100,
  },
  btnText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
  carText: {
    color: 'white',
    fontFamily: 'PaytoneOne-Regular',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 300,
    justifyContent: 'center',
  },
});
