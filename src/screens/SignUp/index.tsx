import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {styles} from './styles';
import {LoginRequested} from '../../redux/actions/signin';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import {firebase} from '../../firebase/config';
import {useNavigation} from '@react-navigation/native';

// const signUpschema = yup.object().shape({
//   username: yup.string().min(4).required(),
//   password: yup.string().min(8).required(),
// });
const SignUp = () => {
  // const {register, errors, handleSubmit, setValue} = useForm({
  //   resolver: yupResolver(signUpschema),
  //   defaultValues: {
  //     username: '',
  //     password: '',
  //   },
  // });
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // useEffect(() => {
  //   register('username');
  //   register('password');
  // }, [register]);
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('SignIn', {user: data});
          })
          .catch((error) => {
            Alert.alert(error);
          });
      })
      .catch((error) => {
        Alert.alert(error);
      });
    // firebase
    //   .database()
    //   .ref('students/' + 'hello')
    //   .set(
    //     {
    //       fullname: fullName,
    //       email: email,
    //       password: password,
    //     },
    //     function (error) {
    //       if (error) {
    //         // The write failed...
    //         Alert.alert('Loi');
    //       } else {
    //         // Data saved successfully!
    //         Alert.alert('Thanh cong!!!');
    //       }
    //     },
    //   );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Full name..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
      </View>
      {/* {errors.username && (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Username must be 4 characters long.
          </Text>
        </Animatable.View>
      )} */}
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Date of birth..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setValue('password', text);
          }}
        /> */
      /* <TouchableOpacity onPress={handleEntryPassword}>
        {isPrivate ? (
          <Feather name="eye-off" color="grey" size={20} />
        ) : (
          <Feather name="eye" color="grey" size={20} />
        )}
      </TouchableOpacity> */}
      {/* </View> */}
      {/* {errors.password && (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Password must be 8 characters long.
          </Text>
        </Animatable.View>
      )} */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={onRegisterPress}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.loginText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUp;
