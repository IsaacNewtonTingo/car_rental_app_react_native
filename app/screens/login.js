import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';

import colors from '../components/colors';

import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);

  const empty = () => {
    setEmail('');
    setPassword('');
  };

  const login = async () => {
    if (!email || !password) {
      Alert.alert('All fields are required');
      setIsPosting(false);
    } else {
      setIsPosting(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use');
            setIsPosting(false);
            return null;
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid');
            setIsPosting(false);
            return null;
          }

          if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong password');
            setIsPosting(false);
            return null;
          }

          if (error.code === 'auth/user-not-found') {
            Alert.alert('No user with the given email address');
            setIsPosting(false);
            return null;
          }

          if (error.code === 'auth/too-many-requests') {
            Alert.alert('Too many attempts', '\n', 'Try later');
            setIsPosting(false);
            return null;
          } else {
            Alert.alert(error);
            setIsPosting(false);
            return null;
          }
        })
        .then(() => {
          setIsPosting(false);
          console.log('Login successful');
          empty();
        });
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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

      {isPosting == false ? (
        <TouchableOpacity
          disabled={false}
          onPress={login}
          style={styles.signupBTN}>
          <Text style={styles.signupText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={true}
          style={[styles.signupBTN, {backgroundColor: '#993366'}]}>
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.optionsText}>Don't have an account? signup</Text>
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
