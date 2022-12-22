import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Styles, Fonts, Colors, Endpoints, Commons, Images} from '../utils';
import Loader from '../components/Loader';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import ApiService from '../services/ApiService';
import {useSelector} from 'react-redux';

export default function ProductDetail(props) {
  const {token} = useSelector(state => state.authReducer);
  let product = props.route.params.product;
  const [visible, setVisible] = useState(false);

  const addToCart = async () => {
    setVisible(true);
    await ApiService.post(
      Endpoints.addToCart,
      {
        product: product._id,
        amount: product.price,
        quantity: 1,
      },
      token,
    )
      .then(res => {
        Commons.toast(res.data.message);
        setVisible(false);
        props.navigation.goBack();
      })
      .catch(err => {
        setVisible(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
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
        <Pressable
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon name="chevron-back" size={22} color={Colors.white} />
        </Pressable>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: RFValue(18),
            color: Colors.white,
            fontFamily: Fonts.family.bold,
          }}>
          {product.title}
        </Text>
        <Icon name="notifications" size={22} color={Colors.primary} />
      </View>

      <View style={{borderBottomColor: Colors.grey, borderBottomWidth: 1}}>
        <Image
          source={{uri: product.image}}
          style={{
            height: Commons.size(240),
            width: Commons.width(),
            resizeMode: 'cover',
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: Commons.size(15)}}
        style={{
          width: Commons.width(0.9),
          alignSelf: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: RFValue(20),
                color: Colors.black,
                fontFamily: Fonts.family.bold,
              }}>
              {product.title}
            </Text>
            <Text
              style={{
                fontSize: RFValue(16),
                color: Colors.black,
                fonftFamily: Fonts.family.regular,
              }}>
              {product.category.name}
            </Text>
          </View>

          <TouchableOpacity
            onPress={addToCart}
            style={{
              height: Commons.size(50),
              width: Commons.size(50),
              borderRadius: Commons.size(25),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primary,
            }}>
            <MIcon
              name={'add-shopping-cart'}
              color={Colors.white}
              size={Commons.size(25)}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: RFValue(24),
            color: Colors.primary,
            fontFamily: Fonts.family.bold,
            marginTop: Commons.size(10),
          }}>
          $ {product.price}
        </Text>
        <Text
          style={{
            fontSize: RFValue(18),
            color: Colors.black,
            fontFamily: Fonts.family.bold,
            marginTop: Commons.size(15),
          }}>
          Description
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Colors.black,
            fontFamily: Fonts.family.regular,
          }}>
          {product.description}
        </Text>
      </ScrollView>

      <Loader visible={visible} />
    </SafeAreaView>
  );
}
