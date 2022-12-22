import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Commons, Fonts, Colors, Images} from '../utils';
import ApiService from '../services/ApiService';
import Products from '../components/Products';
import Endpoints from '../utils/Endpoints';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Product(props) {
  const {token} = useSelector(state => state.authReducer);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setRefreshing(true);
    ApiService.get(
      Endpoints.products,
      token,
      '?category=' + props.route.params.id,
    )
      .then(res => {
        setProducts(res.data.products);
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
        console.error(err);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.primary,
          backgroundColor: Colors.primary,
          padding: Commons.size(15),
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
            fontSize: Commons.size(18),
            color: Colors.white,
            fontFamily: Fonts.family.bold,
          }}>
          Products
        </Text>
        <Icon name="notifications" size={22} color={Colors.primary} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: Commons.width(0.9),
          alignSelf: 'center',
          borderRadius: Commons.size(7),
          backgroundColor: Colors.white,
          borderColor: Colors.grey,
          borderWidth: 1,
          marginVertical: Commons.size(15),
          paddingHorizontal: Commons.size(10),
        }}>
        <TextInput
          style={{
            flex: 1,
            color: Colors.black,
            fontSize: Commons.size(14),
            fontFamily: Fonts.family.regular,
          }}
          placeholder={'Search...'}
          placeholderTextColor={Colors.grey}
        />
        <Icon name={'search'} size={Commons.size(25)} color={Colors.grey} />
      </View>

      <View style={{flex: 1, paddingHorizontal: Commons.width(0.05)}}>
        <Products
          products={products}
          refreshing={refreshing}
          fetchProducts={fetchProducts}
          navigation={props.navigation}
        />
      </View>
    </SafeAreaView>
  );
}
