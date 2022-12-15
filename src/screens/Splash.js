import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Images, Commons} from '../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

const Splash = props => {
  const {user} = useSelector(state => state.authReducer);

  useEffect(() => {
    setTimeout(
      () => {
        if (user) {
          if (user.email) Commons.reset(props.navigation, 'dashboard');
          else Commons.reset(props.navigation, 'profile_builder');
        } else {
          Commons.navigate(props.navigation, 'auth');
        }
      },
      user ? 2000 : 3000,
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <Image
        source={Images.splash}
        style={{
          width: '100%',
          height: RFValue(250),
          resizeMode: 'contain',
        }}
      />
    </SafeAreaView>
  );
};

export default Splash;
