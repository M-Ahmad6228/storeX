import {Text, View, TouchableOpacity, Pressable} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts, Commons, Images, Colors} from '../utils';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../store/actions/AuthActions';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.authReducer);

  return (
    <View style={{flex: 1, padding: 0, margin: 0}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0,
          flex: 1,
        }}>
        <View
          style={{
            height: RFValue(180),
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Avatar
            size={RFValue(70)}
            onPress={null}
            uri={user && user.image ? user.image : null}
          />
          <Text style={{fontFamily: Fonts.family.bold, color: 'white'}}>
            {user && user.firstName ? `${user.firstName} ${user.lastName}` : ''}
          </Text>
          <Text style={{fontFamily: Fonts.family.bold, color: 'white'}}>
            {user && user.email ? user.email : ''}
          </Text>
        </View>
        <DrawerItemList {...props} />
        <View style={{marginTop: 'auto', padding: RFValue(15)}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              dispatch(logout());
              Commons.reset(props.navigation, 'auth');
            }}>
            <Icon name="logout" size={20} color={'red'} />
            <Text
              style={{
                fontFamily: Fonts.family.bold,
                fontSize: RFValue(16),
                color: 'red',
                marginLeft: '5%',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
