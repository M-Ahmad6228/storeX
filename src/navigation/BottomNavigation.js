import React, {useState, useEffect} from 'react';
import {View, Image, BackHandler} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Colors, Commons} from '../utils';
import {Home, Favourites, Search, Profile, AllConversations} from '../screens';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

import {useSelector, useDispatch} from 'react-redux';

const BottomNavigation = props => {
  const {user} = useSelector(state => state.authReducer);
  const Tab = createBottomTabNavigator();

  function fetchTabs() {
    try {
      return (
        <Tab.Navigator
          initialRouteName="home"
          backBehavior="initialRoute"
          screenOptions={{
            tabBarStyle: {position: 'absolute'},
            tabBarActiveTintColor: Colors.primary,
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="home"
            component={Home}
            listeners={{
              focus: () =>
                BackHandler.addEventListener(
                  'hardwareBackPress',
                  Commons.exitApp,
                ),
              blur: () =>
                BackHandler.removeEventListener(
                  'hardwareBackPress',
                  Commons.exitApp,
                ),
            }}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => {
                return (
                  <IonIcon
                    name={'home-outline'}
                    color={color}
                    size={RFValue(25)}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="favourites"
            component={Favourites}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => {
                return (
                  <IonIcon
                    name={'heart-outline'}
                    color={color}
                    size={RFValue(25)}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="search"
            component={Search}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => {
                return (
                  <IonIcon
                    name={'search-outline'}
                    color={color}
                    size={RFValue(25)}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="chat"
            component={AllConversations}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => {
                return (
                  <IonIcon
                    name={'chatbubble-ellipses-outline'}
                    color={color}
                    size={RFValue(25)}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => {
                return (
                  <IonIcon
                    name={'ios-person-outline'}
                    color={color}
                    size={RFValue(25)}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      );
    } catch (err) {
      console.log(err);
    }
  }

  return fetchTabs();
};

export default BottomNavigation;
