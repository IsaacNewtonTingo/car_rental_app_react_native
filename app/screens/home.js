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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

export default function Home() {
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
        <TextInput style={styles.searchInput} />
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
        <TouchableOpacity style={styles.featuredCarContainer}>
          <Image
            style={styles.featuredCarImg}
            source={require('../assets/images/audirs7.jpg')}
          />
          <View style={styles.featuredData}>
            <Text style={[styles.featdataText, {color: colors.orange}]}>
              <Ionicons name="car-sport" size={20} color={colors.gray} />
              {'  '}
              Audi RS 7 - (5 seater)
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="person" size={20} color={colors.gray} />
              {'  '}
              Hensel Johns
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="person" size={20} color={colors.gray} />
              {'  '}0724753175
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="person" size={20} color={colors.gray} />
              {'  '}
              3000 / day
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="location" size={20} color={colors.gray} />
              {'  '}
              Nairobi, Kenya
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featuredCarContainer}>
          <Image
            style={styles.featuredCarImg}
            source={require('../assets/images/audirs7.jpg')}
          />
          <View style={styles.featuredData}>
            <Text style={[styles.featdataText, {color: colors.orange}]}>
              <Ionicons name="car-sport" size={20} color={colors.gray} />
              {'  '}
              Audi RS 7 - (5 seater)
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="person" size={20} color={colors.gray} />
              {'  '}
              Hensel Johns
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="person" size={20} color={colors.gray} />
              {'  '}0724753175
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="person" size={20} color={colors.gray} />
              {'  '}
              3000 / day
            </Text>
            <Text style={styles.featdataText}>
              <Ionicons name="location" size={20} color={colors.gray} />
              {'  '}
              Nairobi, Kenya
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.featuredAndViewAll}>
        <Text style={styles.featTexts}>Other cars</Text>

        <TouchableOpacity>
          <Text style={styles.featTexts}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otherCarsContainer}>
        <TouchableOpacity style={styles.otherCarItem}>
          <Image
            style={styles.otherCarImg}
            source={require('../assets/images/juke.png')}
          />
          <View style={styles.carTextDataContainer}>
            <Text style={[styles.featdataText, {color: colors.orange}]}>
              Noah - (5 seater)
            </Text>
            <Text style={styles.featdataText}>Isaac Tingo</Text>
            <Text style={styles.featdataText}>0724753175</Text>
            <Text style={styles.featdataText}>4000 / day</Text>
            <Text style={styles.featdataText}>Nairobi, Kenya</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.otherCarItem}>
          <Image
            style={styles.otherCarImg}
            source={require('../assets/images/juke.png')}
          />
          <View style={styles.carTextDataContainer}>
            <Text style={[styles.featdataText, {color: colors.orange}]}>
              Noah - (5 seater)
            </Text>
            <Text style={styles.featdataText}>Isaac Tingo</Text>
            <Text style={styles.featdataText}>0724753175</Text>
            <Text style={styles.featdataText}>4000 / day</Text>
            <Text style={styles.featdataText}>Nairobi, Kenya</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    color: 'gray',
    fontFamily: 'PaytoneOne-Regular',
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
  },
});
