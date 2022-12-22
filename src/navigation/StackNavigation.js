import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {Fonts, Commons} from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Splash,
  Auth,
  ProfileBuilder,
  Dashboard,
  Category,
  Product,
  Orders,
  Settings,
  Support,
  Profile,
  AccountDetails,
  DeliveryDetails,
  SavedCards,
  MarketingPreferences,
  ProductDetail,
} from '../screens';

export default function StackNavigation() {
  const Stack = createStackNavigator();

  const Drawers = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        // detachInactiveScreens={false}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {marginLeft: -25, fontFamily: Fonts.family.bold},
        }}
        initialRouteName="home">
        <Drawer.Screen
          name="home"
          component={Dashboard}
          options={{
            headerShown: false,
            drawerLabel: 'Home',
            drawerIcon: ({color, size}) => {
              return <Ionicons name="home" color={color} size={20} />;
            },
          }}
        />
        <Drawer.Screen
          name="categories"
          component={Category}
          options={{
            headerShown: false,
            drawerLabel: 'Categories',
            drawerIcon: ({color, size}) => {
              return <Ionicons name="cart" color={color} size={20} />;
            },
          }}
        />
        <Drawer.Screen
          name="orders"
          component={Orders}
          options={{
            headerShown: false,
            drawerLabel: 'Orders',
            drawerIcon: ({color, size}) => {
              return <Ionicons name="receipt" color={color} size={20} />;
            },
          }}
        />
        <Drawer.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
            drawerLabel: 'Profile',
            drawerIcon: ({color, size}) => {
              return <Ionicons name="person-circle" color={color} size={20} />;
            },
          }}
        />
        <Drawer.Screen
          name="settings"
          component={Settings}
          options={{
            headerShown: false,
            drawerLabel: 'Settings',
            drawerIcon: ({color, size}) => {
              return <Ionicons name="settings" color={color} size={20} />;
            },
          }}
        />
        <Drawer.Screen
          name="support"
          component={Support}
          options={{
            headerShown: false,
            drawerLabel: 'Support',
            drawerIcon: ({color, size}) => {
              return (
                <Ionicons name="ios-help-circle" color={color} size={20} />
              );
            },
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator initialRouteName={'splash'} detachInactiveScreens={false}>
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile_builder"
        component={ProfileBuilder}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dashboard"
        component={Drawers}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="products"
        component={Product}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account_details"
        component={AccountDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="delivery_details"
        component={DeliveryDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="saved_cards"
        component={SavedCards}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="marketing_preferences"
        component={MarketingPreferences}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product_detail"
        component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
