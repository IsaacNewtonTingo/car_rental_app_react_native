import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../components/colors';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default function CarDetails({navigation, route}) {
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
            {route.params.make}
            {'\n'}
            {route.params.model}
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{route.params.rating}</Text>
          <AntDesign name="star" size={12} color="yellow" />
        </View>
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

      <TouchableOpacity style={styles.btnBook}>
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
    height: 80,
    backgroundColor: '#1a1a1a',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '45%',
    borderRadius: 20,
    height: 80,
    margin: 10,
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
  },
  specific: {
    fontSize: 20,
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
});
