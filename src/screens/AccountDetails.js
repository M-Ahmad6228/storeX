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
import {useDispatch, useSelector} from 'react-redux';

const AccountDetails = props => {
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.authReducer);

  var toastRef = React.useRef(null);
  var firstNameRef = React.useRef(null);
  var lastNameRef = React.useRef(null);
  var numberRef = React.useRef(null);
  var emailRef = React.useRef(null);

  const [firstName, setFirstName] = React.useState(
    user && user.firstName ? user.firstName : '',
  );
  const [lastName, setLastName] = React.useState(
    user && user.lastName ? user.lastName : '',
  );
  const [number, setNumber] = React.useState(user ? user.phoneNumber : '');
  const [email, setEmail] = React.useState(
    user && user.email ? user.email : '',
  );

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    if (loading) {
      update();
    }
  }, [loading]);

  const backAction = () => {
    props.navigation.goBack();
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

  const update = async () => {
    let body = {
      firstName: firstname,
      lastName: lastname,
      email: email,
    };

    ApiService.patch(Endpoints.user, body, token, user._id)
      .then(res => {
        user.firstName = firstname;
        user.lastName = lastname;
        user.email = email;

        dispatch(updateUser(user));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Commons.toast(err);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar
        transculent={false}
        barStyle="light-content"
        backgroundColor={Colors.primary}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.primary,
          backgroundColor: Colors.primary,
          padding: RFValue(15),
        }}>
        <TouchableOpacity activeOpacity={0.5} onPress={backAction}>
          <IonIcon name="chevron-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: RFValue(18),
            color: Colors.white,
            fontFamily: Fonts.family.bold,
          }}>
          Account Details
        </Text>
        <IonIcon name="notifications" size={22} color={Colors.primary} />
      </View>

      <View style={{paddingHorizontal: RFValue(15)}}>
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
          labelTextStyle={{
            fontFamily: Fonts.family.bold,
          }}
          labelFontSize={RFValue(16)}
          affixTextStyle={{
            fontFamily: Fonts.family.bold,
            fontSize: RFValue(16),
          }}
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          maxLength={10}
          returnKeyType={'next'}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            lastNameRef.focus();
          }}
          ref={ref => {
            firstNameRef = ref;
          }}
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
          labelTextStyle={{
            fontFamily: Fonts.family.bold,
          }}
          labelFontSize={RFValue(16)}
          affixTextStyle={{
            fontFamily: Fonts.family.bold,
            fontSize: RFValue(16),
          }}
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          // prefix={'+92'}
          maxLength={10}
          returnKeyType={'next'}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            numberRef.focus();
          }}
          ref={ref => {
            lastNameRef = ref;
          }}
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
          labelTextStyle={{
            fontFamily: Fonts.family.bold,
          }}
          labelFontSize={RFValue(16)}
          affixTextStyle={{
            fontFamily: Fonts.family.bold,
            fontSize: RFValue(16),
          }}
          label="Phone Number"
          value={number}
          disabled={true}
          onChangeText={setNumber}
          // prefix={'+92'}
          // maxLength={10}
          returnKeyType={'next'}
          keyboardType="phone-pad"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            emailRef.focus();
          }}
          ref={ref => {
            numberRef = ref;
          }}
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
          labelTextStyle={{
            fontFamily: Fonts.family.bold,
          }}
          labelFontSize={RFValue(16)}
          affixTextStyle={{
            fontFamily: Fonts.family.bold,
            fontSize: RFValue(16),
          }}
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          // prefix={'+92'}
          keyboardType="email-address"
          returnKeyType={'done'}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            //TODO
          }}
          ref={ref => {
            emailRef = ref;
          }}
        />

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
              Save
            </Text>
          )}
          {loading && <ActivityIndicator size={20} color={'white'} />}
        </TouchableOpacity>
      </View>

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
export default AccountDetails;
