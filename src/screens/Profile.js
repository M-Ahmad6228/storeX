import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Commons, Fonts, Colors, Images} from '../utils';
import HorizontalTappable from '../components/HorizontalTappable';
import {RFValue} from 'react-native-responsive-fontsize';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateUser} from '../store/actions/AuthActions';
import ApiService from '../services/ApiService';
import Endpoints from '../utils/Endpoints';

const Profile = props => {
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.authReducer);
  const [loading, setLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState(
    user && user.image ? user.image : '',
  );

  const pickImages = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
    })
      .then(async res => {
        await Commons.cropFile(res.assets[0].uri)
          .then(async result => {
            setLoading(true);
            setAvatar(result.path);
            let filename =
              result.modificationDate +
              result.path.substring(result.path.lastIndexOf('.'));

            await Commons.uploadToFirebase(result.path, filename).then(
              async snapshot => {
                if (snapshot.state === 'success') {
                  const url = await Commons.getUrl(filename);
                  console.log(url);
                  user.image = url;
                  ApiService.patch(
                    Endpoints.user,
                    {
                      image: url,
                    },
                    token,
                    user._id,
                  )
                    .then(ans => {
                      dispatch(updateUser(user));
                      setLoading(false);
                    })
                    .catch(err => {
                      setLoading(false);
                    });
                }
              },
            );
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            props.navigation.openDrawer();
          }}>
          <Icon name="menu" size={22} color={Colors.white} />
        </Pressable>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: RFValue(18),
            color: Colors.white,
            fontFamily: Fonts.family.bold,
          }}>
          My Profile
        </Text>
        <Icon name="notifications" size={22} color={Colors.primary} />
      </View>

      <View
        style={{
          height: RFValue(120),
          width: RFValue(120),
          alignSelf: 'center',
        }}>
        <CardView
          style={{
            height: RFValue(120),
            width: RFValue(120),
            alignSelf: 'center',
            backgroundColor: Colors.white,
            marginVertical: RFValue(15),
          }}
          cardElevation={RFValue(3)}
          cornerRadius={RFValue(7)}>
          <View
            style={{
              height: RFValue(120),
              width: RFValue(120),
              overflow: 'hidden',
            }}>
            <Image
              style={{
                height: RFValue(120),
                width: RFValue(120),
                resizeMode: 'cover',
              }}
              source={avatar !== '' ? {uri: avatar} : Images.avatar}
            />
          </View>
        </CardView>
        <CardView
          cornerRadius={RFValue(20)}
          style={{
            height: RFValue(40),
            width: RFValue(40),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: -1 * RFValue(20),
            bottom: -1 * RFValue(20),
            backgroundColor: Colors.primary,
          }}>
          <Icon
            name="image"
            size={22}
            color={Colors.white}
            onPress={pickImages}
          />
        </CardView>
        {loading && (
          <View
            style={{
              height: RFValue(120),
              width: RFValue(120),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 0,
              top: RFValue(15),
            }}>
            <ActivityIndicator size={50} color={Colors.primary} />
          </View>
        )}
      </View>

      <Text
        style={{
          color: 'black',
          fontFamily: Fonts.family.bold,
          fontSize: RFValue(22),
          marginTop: RFValue(25),
          alignSelf: 'center',
        }}>
        {user ? `${user.firstName} ${user.lastName}` : ''}
      </Text>
      <Text
        style={{
          color: 'black',
          fontFamily: Fonts.family.regular,
          fontSize: RFValue(15),
          alignSelf: 'center',
        }}>
        {user ? user.email : ''}
      </Text>

      <CardView
        style={{
          margin: RFValue(20),
          padding: RFValue(10),
          backgroundColor: Colors.white,
        }}
        cardElevation={RFValue(5)}
        cornerRadius={RFValue(10)}>
        <View>
          <HorizontalTappable
            text={'Account Details'}
            onPress={() => {
              props.navigation.navigate('account_details');
            }}
          />
          <HorizontalTappable
            text={'Delivery Details'}
            onPress={() => {
              props.navigation.navigate('delivery_details');
            }}
          />
          <HorizontalTappable
            text={'Saved Cards'}
            onPress={() => {
              props.navigation.navigate('saved_cards');
            }}
          />
          <HorizontalTappable text={'View Receipts'} />
          <HorizontalTappable text={'Change Password'} />
          <HorizontalTappable
            text={'Marketing Preferences'}
            onPress={() => {
              props.navigation.navigate('marketing_preferences');
            }}
          />
        </View>
      </CardView>
    </SafeAreaView>
  );
};

export default Profile;
