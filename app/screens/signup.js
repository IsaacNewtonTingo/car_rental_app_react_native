import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import axios from 'axios';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../components/colors';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);

  const empty = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
  };

  const signup = async () => {
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('All fields are required');
      setIsPosting(false);
    } else if (password != confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (password.length < 8) {
      Alert.alert('Password should be at least 8 characters long');
    } else if (name.length < 3) {
      Alert.alert('Name is too short');
    } else if (phoneNumber.length != 10) {
      Alert.alert('Invalid phone number');
    } else {
      setIsPosting(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredentials => {
          const user = userCredentials.user;
          await firestore()
            .collection('Users')
            .doc(user.uid)
            .set({
              name: name,
              email: email,
              phoneNumber: phoneNumber,
              phrofilePic: '',
              location: null,
              bio: '',
            })
            .catch(err => {
              console.log(err);
              setIsPosting(false);
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email address already in use');
            setIsPosting(false);
            return null;
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Invalid email adress');
            setIsPosting(false);
            return null;
          }

          empty();
          console.error(error);
          setIsPosting(false);
        })
        .then(() => {
          Alert.alert('Account created successfully');
          empty();
          setIsPosting(false);
        });
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Text style={styles.label}>Full name</Text>

      <View style={styles.iconAndInputContainer}>
        <Fontisto style={styles.icon} name="person" size={20} color="black" />
        <TextInput
          style={styles.dataInput}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="e.g John Doe"
        />
      </View>

      <Text style={styles.label}>Email</Text>

      <View style={styles.iconAndInputContainer}>
        <Feather style={styles.icon} name="mail" size={20} color="black" />
        <TextInput
          style={styles.dataInput}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="e.g johndoe@gmail.com"
        />
      </View>

      <Text style={styles.label}>Phone number</Text>

      <View style={styles.iconAndInputContainer}>
        <Feather style={styles.icon} name="phone" size={20} color="black" />
        <TextInput
          style={styles.dataInput}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          placeholder="e.g 0724753175"
          keyboardType="number-pad"
        />
      </View>

      <Text style={styles.label}>Password</Text>

      <View style={styles.iconAndInputContainer}>
        <Feather style={styles.icon} name="lock" size={20} color="black" />
        <TextInput
          style={styles.dataInput}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="********"
          secureTextEntry={true}
        />
      </View>

      <Text style={styles.label}>Confirm password</Text>

      <View style={styles.iconAndInputContainer}>
        <Fontisto style={styles.icon} name="locked" size={20} color="black" />
        <TextInput
          style={styles.dataInput}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="********"
          secureTextEntry={true}
        />
      </View>

      {isPosting == false ? (
        <TouchableOpacity
          disabled={false}
          onPress={signup}
          style={styles.signupBTN}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={true}
          style={[styles.signupBTN, {backgroundColor: '#993366'}]}>
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.optionsText}>Already have an account? Login</Text>
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
    color: 'black',
    fontWeight: '800',
  },
  iconAndInputContainer: {
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 10,
    zIndex: 1,
  },
  dataInput: {
    paddingHorizontal: 40,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ccdcff',
  },
  signupBTN: {
    height: 50,
    backgroundColor: colors.purple,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'white',
    fontWeight: '800',
  },
  optionsText: {
    color: colors.orange,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 20,
  },
});
