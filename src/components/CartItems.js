import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native-gesture-handler';
import {Commons, Fonts, Colors} from '../utils';

export default function CartItems(props) {
  const Item = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: Commons.size(5),
          backgroundColor: Colors.light_grey,
          marginVertical: Commons.size(5),
          overflow: 'hidden',
        }}>
        <Pressable
          onPress={() => {
            Commons.navigate(props.navigation, 'product_detail', {
              product: item.product,
            });
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.product.image}}
            style={{
              height: Commons.size(90),
              width: Commons.width(0.4),
              resizeMode: 'cover',
            }}
          />
          <View style={{padding: Commons.size(10), flex: 1}}>
            <Text
              style={{
                color: 'black',
                fontSize: Commons.size(14),
                fontFamily: Fonts.family.bold,
              }}>
              {item.product.title}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={{
                color: 'black',
                fontSize: Commons.size(14),
                fontFamily: Fonts.family.regular,
              }}>
              {item.product.description}
            </Text>

            <Text
              style={{
                color: 'black',
                fontSize: Commons.size(14),
                fontFamily: Fonts.family.bold,
              }}>
              $ {item.product.price}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Commons.size(15),
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => props.decrement(item.product._id)}
                style={{
                  width: Commons.size(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: Colors.black,
                  borderRadius: Commons.size(2),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: Commons.size(22),
                    fontFamily: Fonts.family.bold,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  marginHorizontal: Commons.size(7),
                  fontSize: Commons.size(18),
                  fontFamily: Fonts.family.bold,
                }}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => props.increment(item.product._id)}
                style={{
                  width: Commons.size(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: Colors.black,
                  borderRadius: Commons.size(2),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: Commons.size(22),
                    fontFamily: Fonts.family.bold,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: 'black',
                marginTop: Commons.size(5),
                alignSelf: 'flex-end',
                fontSize: Commons.size(22),
                fontFamily: Fonts.family.bold,
              }}>
              $ {item.amount}
            </Text>
          </View>
        </Pressable>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: Commons.size(7),
            width: Commons.width(0.5),
            padding: Commons.size(7),
            marginVertical: Commons.size(10),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor: '#da2c43',
          }}>
          <Text
            style={{
              color: '#da2c43',
              fontSize: Commons.size(14),
              fontFamily: Fonts.family.regular,
            }}>
            Remove From Cart
          </Text>
          <Icon name={'delete'} size={Commons.size(20)} color={'#da2c43'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      data={props.items}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
    />
  );
}
