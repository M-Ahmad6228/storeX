import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Commons, Fonts, Colors} from '../utils';
import Loader from '../components/Loader';
import CartItems from '../components/CartItems';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ApiService from '../services/ApiService';
import Endpoints from '../utils/Endpoints';
import Modal from 'react-native-modal';

const Cart = props => {
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.authReducer);

  const [cart, setCart] = React.useState(props.route.params.cart);
  const [isShippingAddress, setShippingAddress] = React.useState(false);
  const [isCheckout, setCheckout] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (loading && isCheckout) {
      processCheckout();
    }
  }, [loading]);

  const increment = async id => {
    setLoading(true);
    await ApiService.post(
      Endpoints.increment,
      {
        product: id,
      },
      token,
    )
      .then(res => {
        setCart(res.data.cart);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const decrement = async id => {
    setLoading(true);
    await ApiService.post(
      Endpoints.decrement,
      {
        product: id,
      },
      token,
    )
      .then(res => {
        setCart(res.data.cart);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const processCheckout = async () => {
    let body = {
      user: user._id,
      items: cart.items,
      deliveryAddress: '63b1f8d780a4e8000bfc5f4d',
      deliveryCharges: 10,
      totalCharges: cart.totalAmount + 10,
      notes: notes,
    };
    await ApiService.post(Endpoints.order, body, token)
      .then(res => {
        setLoading(false);
        props.navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        Commons.toast(err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.cart_bg}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

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
          Cart
        </Text>
        <Icon name="notifications" size={22} color={Colors.primary} />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: Commons.size(100)}}>
        <View
          style={{
            width: Commons.width(0.9),
            alignSelf: 'center',
            padding: Commons.size(10),
            borderRadius: Commons.size(5),
          }}>
          <Text
            style={{
              fontSize: Commons.size(22),
              fontWeight: 'bolder',
              fontFamily: Fonts.family.bold,
              color: Colors.black,
            }}>
            ITEMS
          </Text>

          <CartItems
            items={cart.items}
            navigation={props.navigation}
            increment={increment}
            decrement={decrement}
          />
        </View>
      </ScrollView>

      <Loader visible={loading} />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.light_grey,
          height: Commons.size(100),
          paddingHorizontal: Commons.width(0.05),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: Commons.size(14),
              fontFamily: Fonts.family.bold,
            }}>
            Total Amount:
          </Text>

          <Text
            style={{
              flex: 1,
              color: 'black',
              textAlign: 'right',
              fontSize: Commons.size(25),
              fontFamily: Fonts.family.bold,
            }}>
            $ {cart.totalAmount}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setShippingAddress(true)}
          style={{
            flexDirection: 'row',
            borderRadius: Commons.size(7),
            width: Commons.width(0.9),
            padding: Commons.size(10),
            marginVertical: Commons.size(10),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: Colors.black,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontSize: Commons.size(14),
              fontFamily: Fonts.family.regular,
            }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
      {/* 63b1f8d780a4e8000bfc5f4d */}
      <Modal
        isVisible={isShippingAddress}
        backdropOpacity={0.6}
        backdropColor={Colors.black}
        onBackButtonPress={() => {
          setShippingAddress(false);
        }}
        onBackdropPress={() => setShippingAddress(false)}>
        <View
          style={{
            borderRadius: Commons.size(10),
            padding: Commons.size(10),
            backgroundColor: Colors.white,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.family.bold,
              fontSize: Commons.size(18),
              fontWeight: 'bolder',
            }}>
            Select Shipping Address
          </Text>

          <TextInput
            style={{
              height: Commons.size(100),
              padding: Commons.size(7),
              textAlignVertical: 'top',
              color: Colors.black,
              fontSize: Commons.size(14),
              fontFamily: Fonts.family.regular,
              borderWidth: 1,
              borderColor: Colors.grey,
              marginTop: Commons.size(10),
              borderRadius: Commons.size(7),
            }}
            maxLength={350}
            numberOfLines={7}
            multiline={true}
            value={notes}
            onChangeText={setNotes}
            placeholder={'Add Notes (Optional)'}
            placeholderTextColor={Colors.grey}
          />

          <TouchableOpacity
            onPress={() => {
              setShippingAddress(false);
              setCheckout(true);
              setLoading(true);
            }}
            style={{
              width: '100%',
              borderRadius: Commons.size(7),
              padding: Commons.size(10),
              marginVertical: Commons.size(10),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: Colors.primary,
            }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: Commons.size(14),
                fontFamily: Fonts.family.regular,
              }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Cart;
