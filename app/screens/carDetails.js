import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../components/colors';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default function CarDetails({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal pagingEnabled={true} style={styles.carImages}>
        <Image
          style={styles.detailsImage}
          source={require('../assets/images/teslaX.jpg')}
        />
        <Image
          style={styles.detailsImage}
          source={require('../assets/images/teslaX.jpg')}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('PublicProfile')}
        style={styles.toProfile}>
        <Avatar.Image
          size={60}
          source={{
            uri: 'https://images.unsplash.com/photo-1587064712555-6e206484699b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          }}
        />

        <View style={styles.dealerDetailsContainer}>
          <Text style={styles.carText}>Audi{'\n'}RS7</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>5.8</Text>
          <AntDesign name="star" size={12} color="yellow" />
        </View>
      </TouchableOpacity>

      <View style={styles.carSpecs}>
        <View style={styles.overPayContainer}>
          <Text style={styles.overviewText}>Overview</Text>
          <Text style={styles.overviewText}>KSH. 4000/day</Text>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.carSpecsItem}>
            <Ionicons name="speedometer-outline" size={50} color="gray" />
            <Text style={styles.specific}>350 km</Text>
          </View>

          <View style={styles.carSpecsItem}>
            <MaterialCommunityIcons
              name="car-shift-pattern"
              size={50}
              color="gray"
            />
            <Text style={styles.specific}>Automatic</Text>
          </View>

          <View style={styles.carSpecsItem}>
            <MaterialCommunityIcons name="gas-station" size={50} color="gray" />
            <Text style={styles.specific}>Diesel</Text>
          </View>

          <View style={styles.carSpecsItem}>
            <MaterialCommunityIcons
              name="seat-outline"
              size={50}
              color="gray"
            />
            <Text style={styles.specific}>4 seats</Text>
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
