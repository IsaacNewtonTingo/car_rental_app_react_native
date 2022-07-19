import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../components/colors';

const {width} = Dimensions.get('window');

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Home({navigation}) {
  const B = props => (
    <Text style={{color: colors.orange}}>{props.children}</Text>
  );

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
          placeholder="Search for a car ..."
          style={styles.searchInput}
          placeholderTextColor="gray"
        />
      </View>

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Featured cars</Text>

        <TouchableOpacity>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredCarsScrollView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetails')}
          style={styles.featuredCarContainer}>
          <Image
            style={styles.featuredCarImg}
            source={require('../assets/images/audirs7.jpg')}
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
                Audi RS 7
              </Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="person"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Hensel Johns</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Entypo
                style={{marginRight: 10}}
                name="old-phone"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>0724753175</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Fontisto
                style={{marginRight: 10}}
                name="money-symbol"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>3000 / day</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="location"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Nairobi, Kenya</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetails')}
          style={styles.featuredCarContainer}>
          <Image
            style={styles.featuredCarImg}
            source={require('../assets/images/audirs7.jpg')}
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
                Audi RS 7
              </Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="person"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Hensel Johns</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Entypo
                style={{marginRight: 10}}
                name="old-phone"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>0724753175</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Fontisto
                style={{marginRight: 10}}
                name="money-symbol"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>3000 / day</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="location"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Nairobi, Kenya</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Hot deals</Text>

        <TouchableOpacity>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
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
            <Text style={[styles.featdataText, {color: colors.orange}]}>
              BMW
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>5.8</Text>
              <AntDesign name="star" size={10} color={colors.yellow} />
            </View>
            <Text style={styles.featdataText}>Isaac Tingo</Text>
            <Text style={styles.featdataText}>0724753175</Text>
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
            <Text style={[styles.featdataText, {color: colors.orange}]}>
              Nissan Juke
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>5.4</Text>
              <AntDesign name="star" size={10} color={colors.yellow} />
            </View>
            <Text style={styles.featdataText}>Isaac Tingo</Text>
            <Text style={styles.featdataText}>0724753175</Text>
            <Text style={styles.featdataText}>4000 / day</Text>
            <Text style={styles.featdataText}>Nairobi, Kenya</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Recently viewed</Text>

        <TouchableOpacity>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredCarsScrollView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetails')}
          style={styles.featuredCarContainer}>
          <Image
            style={styles.featuredCarImg}
            source={require('../assets/images/rav4.jpg')}
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
                Toyota Rav 4
              </Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="person"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Hensel Johns</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Entypo
                style={{marginRight: 10}}
                name="old-phone"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>0724753175</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Fontisto
                style={{marginRight: 10}}
                name="money-symbol"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>3000 / day</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="location"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Nairobi, Kenya</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetails')}
          style={styles.featuredCarContainer}>
          <Image
            style={styles.featuredCarImg}
            source={require('../assets/images/teslaX.jpg')}
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
                Tesla Model X
              </Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="person"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Hensel Johns</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Entypo
                style={{marginRight: 10}}
                name="old-phone"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>0724753175</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Fontisto
                style={{marginRight: 10}}
                name="money-symbol"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>3000 / day</Text>
            </View>

            <View style={styles.iconAndDescCont}>
              <Ionicons
                style={{marginRight: 10}}
                name="location"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.featdataText}>Nairobi, Kenya</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
