import {
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import {Commons, Fonts, Colors, Images} from '../utils';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function Categories(props) {
  const Item = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          Commons.navigate(props.navigation, 'products', {
            id: item._id,
          });
        }}>
        <CardView
          cornerRadius={Commons.size(10)}
          cardElevation={Commons.size(3)}
          style={{
            backgroundColor: Colors.white,
            width: Commons.width(0.45) - Commons.size(10),
            alignItems: 'center',
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
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: 'black',
              alignSelf: 'center',
              padding: Commons.size(10),
              fontSize: Commons.size(15),
              fontFamily: Fonts.family.bold,
            }}>
            {item.name}
          </Text>
        </CardView>
      </Pressable>
    );
  };

  return (
    <FlatList
      overScrollMode={'never'}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.fetchCategories}
        />
      }
      style={{
        paddingBottom: Commons.size(15),
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      data={props.categories}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
      ListFooterComponent={<View style={{height: Commons.size(10)}}></View>}
    />
  );
}
