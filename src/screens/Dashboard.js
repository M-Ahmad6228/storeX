import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Commons, Fonts, Colors, Images, Endpoints} from '../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import CardView from 'react-native-cardview';
import {useSelector} from 'react-redux';
import ApiService from '../services/ApiService';
import Slider from '../components/Slider';
import {useIsFocused} from '@react-navigation/native';

const Dashboard = props => {
  const isFocused = useIsFocused();
  const {user, token} = useSelector(state => state.authReducer);
  const [ads, setAds] = useState([]);
  const [cart, setCart] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) refresh();
  }, [isFocused]);

  const Item = ({item}) => {
    return (
      <CardView
        cornerRadius={RFValue(10)}
        cardElevation={RFValue(3)}
        style={{
          backgroundColor: Colors.white,
          width: RFValue(100),
          alignItems: 'center',
          justifyContent: 'center',
          margin: RFValue(5),
        }}>
        <Image
          source={item.image}
          style={{
            height: RFValue(80),
            width: RFValue(80),
            resizeMode: 'stretch',
          }}
        />
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: RFValue(15),
            fontFamily: Fonts.family.bold,
          }}>
          {item.text}
        </Text>
      </CardView>
    );
  };

  const data = [
    {
      id: 1,
      text: 'Milk',
      image: Images.milk,
    },
    {
      id: 2,
      text: 'Milkshakes',
      image: Images.milk,
    },
    {
      id: 3,
      text: 'Fruit Juices',
      image: Images.milk,
    },
    {
      id: 4,
      text: 'Eggs',
      image: Images.milk,
    },
    {
      id: 5,
      text: 'Creamery',
      image: Images.milk,
    },
    {
      id: 6,
      text: 'Yogurt',
      image: Images.milk,
    },
    {
      id: 7,
      text: 'Bakery',
      image: Images.milk,
    },
    {
      id: 8,
      text: 'Fruit & Veg',
      image: Images.milk,
    },
    {
      id: 9,
      text: 'Cereals',
      image: Images.milk,
    },
    {
      id: 10,
      text: 'Coffee & Tea',
      image: Images.milk,
    },
    {
      id: 11,
      text: 'Soft Drinks',
      image: Images.milk,
    },
    {
      id: 12,
      text: 'Spring Water',
      image: Images.milk,
    },
    {
      id: 13,
      text: 'Sweet Treats',
      image: Images.milk,
    },
    {
      id: 14,
      text: 'Household',
      image: Images.milk,
    },
    {
      id: 15,
      text: 'Bundles',
      image: Images.milk,
    },
  ];

  const fetchAds = async () => {
    setRefreshing(true);
    await ApiService.get(Endpoints.ads, token)
      .then(res => {
        setAds(res.data.advertisements);
        fetchCart();
      })
      .catch(err => {
        setRefreshing(false);
      });
  };

  const fetchCart = async () => {
    await ApiService.get(Endpoints.cart, token)
      .then(res => {
        setCart(res.data.cart);
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
      });
  };

  const refresh = () => {
    fetchAds();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.primary,
            padding: RFValue(15),
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <Icon name="menu" size={Commons.size(25)} color={Colors.white} />
          </TouchableOpacity>
          <Icon name="cart" size={Commons.size(25)} color={Colors.primary} />
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: RFValue(18),
              color: Colors.white,
              fontFamily: Fonts.family.bold,
            }}>
            Store X
          </Text>
          <TouchableOpacity
            style={{marginRight: Commons.size(10)}}
            onPress={() => {
              if (cart && cart.items.length > 0) {
                Commons.navigate(props.navigation, 'cart', {
                  cart: cart,
                });
              } else {
                Commons.toast('No items added to cart');
              }
            }}>
            <Icon name="cart" size={Commons.size(25)} color={Colors.white} />
            {cart && cart.items.length > 0 && (
              <View
                style={{
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: Commons.size(10),
                  width: Commons.size(10),
                  borderRadius: Commons.size(5),
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Icon
              name="notifications"
              size={Commons.size(25)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        {ads.length > 0 && (
          <View>
            <Slider
              data={ads}
              slider={true}
              duration={4000}
              navigation={props.navigation}
            />
          </View>
        )}

        <Text
          style={{
            color: 'black',
            fontFamily: Fonts.family.bold,
            fontSize: RFValue(22),
            marginTop: RFValue(10),
            alignSelf: 'center',
          }}>
          Hi {user ? user.firstName : ''}
        </Text>

        <CardView
          cornerRadius={RFValue(10)}
          cardElevation={RFValue(3)}
          cardMaxElevation={RFValue(3)}
          style={{
            width: Commons.width(0.9),
            alignSelf: 'center',
            padding: RFValue(10),
            backgroundColor: Colors.white,
            marginVertical: RFValue(10),
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  flex: 1,
                  color: 'black',
                  fontSize: RFValue(18),
                  fontFamily: Fonts.family.bold,
                }}>
                Your next delivery
              </Text>
              <Icon
                name={'chevron-forward-circle-sharp'}
                size={35}
                color={Colors.primary}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: RFValue(14),
                fontFamily: Fonts.family.regular,
              }}>
              Start your next order
            </Text>

            <TouchableOpacity
              onPress={() => {
                Commons.navigate(props.navigation, 'categories');
              }}
              style={{
                padding: RFValue(10),
                backgroundColor: Colors.primary,
                height: RFValue(100),
                width: RFValue(100),
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: RFValue(10),
              }}>
              <Icon name={'add'} color={Colors.white} size={Commons.size(25)} />

              <Text
                style={{
                  color: Colors.white,
                  fontSize: RFValue(12),
                  fontFamily: Fonts.family.regular,
                }}>
                Add products
              </Text>
            </TouchableOpacity>
          </View>
        </CardView>

        <FlatList
          overScrollMode={'never'}
          style={{
            paddingBottom: RFValue(15),
            alignSelf: 'center',
          }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          data={data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{height: RFValue(10)}}></View>}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
