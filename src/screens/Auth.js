import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Styles, Globals, Fonts, Colors, Commons} from '../utils';
import Toast, {DURATION} from 'react-native-easy-toast';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ApiService from '../services/ApiService';
import Endpoints from '../utils/Endpoints';
import {useDispatch} from 'react-redux';
import {login} from '../store/actions/AuthActions';

const Auth = props => {
  const dispatch = useDispatch();
  var toastRef = React.useRef(null);
  var passcodeRef = React.useRef(null);
  var numberRef = React.useRef(null);
  var passwordRef = React.useRef(null);

  const [hidePassword, setHidePassword] = React.useState(true);
  const [number, setNumber] = React.useState('');
  const [passcode, setPasscode] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isSignup, setIsSignup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    if (loading) {
      register();
    }
  }, [loading]);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  const showToast = msg => {
    toastRef.show(msg, 2000, () => {
      // something you want to do at close
    });
  };

  const validate = () => {
    if (number.length !== 10) {
      showToast('Please enter valid phone number');
      return;
    }
    if (passcode.length < 5 && isSignup) {
      showToast('Please enter valid postcode');
      return;
    }
    if ((password.length < 8 || password.length > 15) && !isSignup) {
      showToast('Password should be with 8-15 characters long');
      return;
    }

    setLoading(true);
  };

  const register = async () => {
    if (isSignup) {
      let body = {
        phoneNumber: `+92${number}`,
        zipcode: passcode,
        password: password,
      };

      await ApiService.post(Endpoints.user, body, null)
        .then(res => {
          let user = res.data.user;
          let token = res.data.access_token;
          console.log(token);

          dispatch(login(user, token));
          Commons.navigate(props.navigation, 'profile_builder');
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          Commons.toast(err);
          setLoading(false);
        });
    } else {
      let body = {
        phoneNumber: `+92${number}`,
        password: password,
      };

      await ApiService.post(Endpoints.login, body, null)
        .then(res => {
          let user = res.data.user;
          let token = res.data.access_token;
          console.log(token);

          dispatch(login(user, token));
          Commons.reset(props.navigation, 'dashboard');
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          Commons.toast(err);
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={[Styles.container, {paddingHorizontal: RFValue(15)}]}>
      <StatusBar
        transculent={false}
        barStyle="light-content"
        backgroundColor={Colors.primary}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: RFValue(15)}}>
        <View>
          <Text
            style={{
              marginTop: RFValue(50),
              color: Colors.black,
              fontSize: RFValue(24),
              fontFamily: Fonts.family.bold,
            }}>
            {isSignup ? 'Register' : 'Login'}
          </Text>
          <Text
            style={{
              marginBottom: RFValue(20),
              color: Colors.black,
              fontSize: RFValue(16),
              fontFamily: Fonts.family.regular,
            }}>
            {isSignup ? 'Please register yourself' : 'Please login yourself'}
          </Text>

          <OutlinedTextField
            containerStyle={{
              width: '100%',
              marginTop: RFValue(20),
            }}
            titleTextStyle={{
              color: Colors.primary,
            }}
            baseColor={Colors.primary}
            tintColor={Colors.primary}
            textColor={Colors.primary}
            labelOffset={{x1: -3 * RFValue(10)}}
            labelTextStyle={{
              fontFamily: Fonts.family.bold,
              paddingHorizontal: RFValue(7),
            }}
            labelFontSize={RFValue(16)}
            affixTextStyle={{
              fontFamily: Fonts.family.bold,
              fontSize: RFValue(16),
            }}
            label="Phone Number"
            value={number}
            onChangeText={setNumber}
            prefix={'+92'}
            maxLength={10}
            returnKeyType={'next'}
            keyboardType="phone-pad"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              !isSignup ? passwordRef.focus() : passcodeRef.focus();
            }}
            ref={ref => {
              numberRef = ref;
            }}
            renderLeftAccessory={() => (
              <IonIcon name={'call'} size={24} color={Colors.primary} />
            )}
          />

          {isSignup && (
            <OutlinedTextField
              containerStyle={{
                width: '100%',
                marginTop: RFValue(10),
              }}
              titleTextStyle={{
                color: Colors.primary,
              }}
              baseColor={Colors.primary}
              tintColor={Colors.primary}
              textColor={Colors.primary}
              labelOffset={{x1: -3 * RFValue(10)}}
              labelTextStyle={{
                fontFamily: Fonts.family.bold,
                paddingHorizontal: RFValue(7),
              }}
              labelFontSize={RFValue(16)}
              label="Passcode"
              value={passcode}
              onChangeText={setPasscode}
              maxLength={20}
              returnKeyType={'done'}
              keyboardType="phone-pad"
              blurOnSubmit={true}
              ref={ref => {
                passcodeRef = ref;
              }}
              renderLeftAccessory={() => (
                <MaterialIcon
                  name={'location-city'}
                  size={24}
                  color={Colors.primary}
                />
              )}
            />
          )}

          <OutlinedTextField
            containerStyle={{
              width: '100%',
              marginTop: RFValue(10),
            }}
            secureTextEntry={hidePassword}
            titleTextStyle={{
              color: Colors.primary,
            }}
            baseColor={Colors.primary}
            tintColor={Colors.primary}
            textColor={Colors.primary}
            labelOffset={{x1: -3 * RFValue(10)}}
            labelTextStyle={{
              fontFamily: Fonts.family.bold,
              paddingHorizontal: RFValue(7),
            }}
            labelFontSize={RFValue(16)}
            label="Password"
            value={password}
            onChangeText={setPassword}
            maxLength={15}
            returnKeyType={!isSignup ? 'done' : 'next'}
            blurOnSubmit={true}
            ref={ref => {
              passwordRef = ref;
            }}
            renderLeftAccessory={() => (
              <IonIcon name={'lock-closed'} size={24} color={Colors.primary} />
            )}
            renderRightAccessory={() => (
              <Pressable onPress={() => setHidePassword(!hidePassword)}>
                <IonIcon
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={24}
                  color={Colors.primary}
                />
              </Pressable>
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: RFValue(10),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: RFValue(14),
                fontFamily: Fonts.family.regular,
              }}>
              {!isSignup
                ? 'Dont have an account?  '
                : 'Already have an account?  '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsSignup(!isSignup);
              }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: RFValue(16),
                  fontFamily: Fonts.family.bold,
                }}>
                {!isSignup ? 'Register' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={validate}
            disabled={loading}
            style={{
              backgroundColor: Colors.primary,
              marginTop: RFValue(20),
              padding: RFValue(15),
              borderRadius: RFValue(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {!loading && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: RFValue(16),
                  fontFamily: Fonts.family.bold,
                }}>
                {isSignup ? 'Get Started' : 'Login'}
              </Text>
            )}
            {loading && <ActivityIndicator size={20} color={'white'} />}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast
        ref={ref => {
          toastRef = ref;
        }}
        position="bottom"
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
      />
    </SafeAreaView>
  );
};
export default Auth;
