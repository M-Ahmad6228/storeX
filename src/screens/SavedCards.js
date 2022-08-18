import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Styles, Globals, Fonts, Colors, Commons} from '../utils';
import Toast, {DURATION} from 'react-native-easy-toast';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SavedCards = props => {
  var toastRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };

  const showToast = msg => {
    toastRef.show(msg, 2000, () => {
      // something you want to do at close
    });
  };

  return (
    <SafeAreaView style={Styles.container}>
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
        <TouchableOpacity activeOpacity={0.5} onPress={backAction}>
          <IonIcon name="chevron-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: RFValue(18),
            color: Colors.white,
            fontFamily: Fonts.family.bold,
          }}>
          Saved Cards
        </Text>
        <IonIcon name="notifications" size={22} color={Colors.primary} />
      </View>

      <View style={{paddingHorizontal: RFValue(15)}}></View>

      <Toast
        ref={ref => {
          toastRef = ref;
        }}
        position="bottom"
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
      />
    </SafeAreaView>
  );
};
export default SavedCards;
