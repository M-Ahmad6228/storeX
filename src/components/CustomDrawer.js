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

const CustomDrawer = props => {
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
          <Avatar size={RFValue(70)} onPress={null} uri={null} />
          <Text style={{fontFamily: Fonts.family.bold, color: 'white'}}>
            User
          </Text>
          <Text style={{fontFamily: Fonts.family.bold, color: 'white'}}>
            user@storex.com
          </Text>
        </View>
        <DrawerItemList {...props} />
        <View style={{marginTop: 'auto', padding: RFValue(15)}}>
          <Pressable
            style={{flexDirection: 'row'}}
            onPress={() => {
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
          </Pressable>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
