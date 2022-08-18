import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Commons, Fonts, Colors, Images} from '../utils';
import {RFValue} from 'react-native-responsive-fontsize';

const HorizontalTappable = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: RFValue(10),
          borderBottomWidth: 1,
          borderBottomColor: Colors.primary,
          borderStyle: 'dashed',
        }}>
        <Text
          style={{
            color: 'black',
            flex: 1,
            fontFamily: Fonts.family.bold,
            fontSize: RFValue(22),
            alignSelf: 'center',
          }}>
          {props.text}
        </Text>
        <Icon
          name={'chevron-forward-circle-sharp'}
          size={20}
          color={Colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};
export default HorizontalTappable;
