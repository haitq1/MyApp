import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {styles} from './styles';
import {LoginRequested} from '../../redux/actions/signin';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '../../firebase/config';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
// import Feather from 'react-native-vector-icons/Feather';

// interface Props {
//   SignIn: any;
// }
// const signInschema = yup.object().shape({
//   username: yup.string().min(4).required(),
//   password: yup.string().min(8).required(),
// });

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
      '314116752223-ni4tp1q60vfje16t6t1jiomod8qi30pq.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  // const {register, errors, handleSubmit, setValue} = useForm({
  //   resolver: yupResolver(signInschema),
  //   defaultValues: {
  //     username: '',
  //     password: '',
  //   },
  // });
  //   const navigation = useNavigation();
  // useEffect(() => {
  //   register('username');
  //   register('password');
  // }, [register]);
  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response: {user: {uid: any}}) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument: {exists: any}) => {
            if (!firestoreDocument.exists) {
              Alert.alert('User does not exist anymore.');
              return;
            }
            navigation.navigate('Home');
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };
  // const dispatch = useDispatch();
  // const submit = (data: any) => {
  //   dispatch(LoginRequested(data.username, data.password));
  //   AsyncStorage.setItem('token', props.SignIn.token);
  // };
  //   const [isPrivate, setIsPrivate] = useState<boolean>(true);
  //   const handleEntryPassword = useCallback(() => {
  //     isPrivate ? setIsPrivate(false) : setIsPrivate(true);
  //   }, [isPrivate]);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Easy Shopping</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
          auto-correction="false"
        />
      </View>
      {/* {errors.username && (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Username must be 4 characters long.
          </Text>
        </Animatable.View>
      )} */}
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {/* <TouchableOpacity onPress={handleEntryPassword}>
          {isPrivate ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity> */}
      </View>
      {/* {errors.password && (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Password must be 8 characters long.
          </Text>
        </Animatable.View> */}
      {/* )} */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={onLoginPress}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.loginText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
      />
    </View>
  );
};
export default SignIn;
