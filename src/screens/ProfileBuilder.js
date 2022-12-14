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
import {useSelector, useDispatch} from 'react-redux';

const ProfileBuilder = props => {
  const dispatch = useDispatch();
  var toastRef = React.useRef(null);
  var firstnameRef = React.useRef(null);
  var lastnameRef = React.useRef(null);
  var emailRef = React.useRef(null);
  var numberRef = React.useRef(null);
  var passwordRef = React.useRef(null);

  const {user, token} = useSelector(state => state.authReducer);
  console.log(token);

  const [hidePassword, setHidePassword] = React.useState(true);
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    if (firstname.trim().length < 3) {
      showToast('Please enter valid firstname');
      return;
    }
    if (lastname.trim().length < 3) {
      showToast('Please enter valid lastname');
      return;
    }

    if (email.trim().length === 0) {
      showToast('Please enter valid email address');
      return;
    }
    // if (number.length !== 10) {
    //   showToast('Please enter valid phone number');
    //   return;
    // }
    // if (password.length < 8 || password.length > 15) {
    //   showToast('Password should be with 8-15 characters long');
    //   return;
    // }

    setLoading(true);
  };

  const register = async () => {
    let body = {
      firstName: firstname,
      lastName: lastname,
      email: email,
    };

    ApiService.patch(Endpoints.user, body, token, user._id)
      .then(res => {
        dispatch(login(res.data.user, res.data.access_token));
        Commons.reset(props.navigation, 'dashboard');
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Commons.toast(err);
        setLoading(false);
      });
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
              marginTop: RFValue(20),
              color: Colors.black,
              fontSize: RFValue(24),
              marginHorizontal: RFValue(15),
              alignSelf: 'center',
              fontFamily: Fonts.family.bold,
            }}>
            GREAT NEWS
          </Text>
          <Text
            style={{
              marginBottom: RFValue(20),
              color: Colors.black,
              fontSize: RFValue(20),
              marginHorizontal: RFValue(15),
              alignSelf: 'center',
              fontFamily: Fonts.family.bold,
            }}>
            We deliver to your neighbourhood.
          </Text>
          <Text
            style={{
              marginBottom: RFValue(20),
              color: Colors.black,
              fontSize: RFValue(15),
              marginHorizontal: RFValue(15),
              alignSelf: 'center',
              fontFamily: Fonts.family.regular,
            }}>
            Your local milkie is Asum and your delivery days are
          </Text>

          <OutlinedTextField
            containerStyle={{
              width: '100%',
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
            label="Firstname"
            value={firstname}
            onChangeText={setFirstname}
            maxLength={10}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              lastnameRef.focus();
            }}
            ref={ref => {
              firstnameRef = ref;
            }}
            renderLeftAccessory={() => (
              <IonIcon
                name={'person-outline'}
                size={24}
                color={Colors.primary}
              />
            )}
          />

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
            label="Lastname"
            value={lastname}
            onChangeText={setLastname}
            maxLength={10}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              emailRef.focus();
            }}
            ref={ref => {
              lastnameRef = ref;
            }}
            renderLeftAccessory={() => (
              <IonIcon
                name={'person-outline'}
                size={24}
                color={Colors.primary}
              />
            )}
          />

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
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            maxLength={30}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            keyboardType="email-address"
            blurOnSubmit={false}
            // onSubmitEditing={() => {
            //   numberRef.focus();
            // }}
            ref={ref => {
              emailRef = ref;
            }}
            renderLeftAccessory={() => (
              <MaterialIcon name={'mail'} size={24} color={Colors.primary} />
            )}
          />

          {/* <OutlinedTextField
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
            affixTextStyle={{
              fontFamily: Fonts.family.bold,
              fontSize: RFValue(16),
            }}
            label="Phone Number"
            value={number}
            onChangeText={setNumber}
            prefix={'+92'}
            maxLength={10}
            returnKeyType={'done'}
            keyboardType="phone-pad"
            blurOnSubmit={false}
            // onSubmitEditing={() => {
            //   passwordRef.focus();
            // }}
            ref={ref => {
              numberRef = ref;
            }}
            renderLeftAccessory={() => (
              <IonIcon name={'call'} size={24} color={Colors.primary} />
            )}
          /> */}

          {/* <OutlinedTextField
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
            returnKeyType={'done'}
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
          /> */}

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
                Register
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

export default ProfileBuilder;
