import React, {useRef, useEffect} from 'react';
import {Image, FlatList, View, Pressable} from 'react-native';
import {Commons} from '../utils';
import CardView from 'react-native-cardview';

const Slider = props => {
  var index = 0;
  var listRef = useRef(View.prototype);

  const Item = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          props.navigation.navigate('product_detail', {
            product: item.product,
          });
        }}
        style={{paddingHorizontal: Commons.width(0.05)}}>
        <CardView
          cardElevation={0}
          cardMaxElevation={0}
          cornerRadius={Commons.size(15)}
          style={{
            width: Commons.width(0.9),
            height: Commons.size(170),
          }}>
          <Image
            style={{
              height: Commons.size(170),
              width: Commons.width(0.9),
              resizeMode: 'stretch',
            }}
            source={{uri: item.image}}
          />
        </CardView>
      </Pressable>
    );
  };

  useEffect(() => {
    setInterval(() => {
      if (listRef === null || listRef.current === null) return;
      listRef.current.scrollToIndex({viewPosition: 0.5, index: index});
      if (index === props.data.length - 1) index = 0;
      else index = index + 1;
    }, props.duration);
  }, []);
  // }, [props.slider]);

  return (
    <FlatList
      ref={listRef}
      pagingEnabled
      disableintervalmomentum
      removeClippedSubviews
      bounces
      style={{
        marginTop: Commons.size(15),
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={props.data}
      renderItem={Item}
      keyExtractor={item => item._id}
    />
  );
};

export default Slider;
