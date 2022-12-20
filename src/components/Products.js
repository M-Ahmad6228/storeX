import {View, Text, Image, RefreshControl} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import {Commons, Fonts, Colors, Images} from '../utils';

export default function Products(props) {
  const Item = ({item, index}) => {
    return (
      <CardView
        cornerRadius={Commons.size(10)}
        cardElevation={Commons.size(3)}
        style={{
          backgroundColor: Colors.white,
          width: Commons.width(0.45) - Commons.size(10),
          justifyContent: 'center',
          margin: Commons.size(5),
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            height: Commons.size(120),
            width: Commons.width(0.45) - Commons.size(10),
            resizeMode: 'cover',
          }}
        />
        <View style={{padding: Commons.size(10)}}>
          <Text
            style={{
              color: 'black',
              fontSize: Commons.size(18),
              fontFamily: Fonts.family.bold,
            }}>
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              color: 'black',
              fontSize: Commons.size(15),
              fontFamily: Fonts.family.regular,
            }}>
            {item.description}
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: Commons.size(20),
              fontFamily: Fonts.family.bold,
            }}>
            $ {item.price}
          </Text>
        </View>
      </CardView>
    );
  };

  return (
    <FlatList
      overScrollMode={'never'}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.fetchProducts}
        />
      }
      style={{
        paddingBottom: Commons.size(15),
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      data={props.products}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
      ListFooterComponent={<View style={{height: Commons.size(10)}}></View>}
    />
  );
}
