import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import axios from 'axios';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../components/colors';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signup = () => {
    const url = 'https://full-auth-server-node-jss.herokuapp.com/user/signup';
    // const url = 'https://f713-105-163-0-152.eu.ngrok.io/user/signup';
    axios
      .post(url, {
        name: name,
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView style={styles.container}>
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
          keyboardType="email-address"
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
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity onPress={signup} style={styles.signupBTN}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity>
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
