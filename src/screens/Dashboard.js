import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Commons, Fonts, Colors, Images} from '../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import CardView from 'react-native-cardview';

const Dashboard = props => {
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
          Store X
        </Text>
        <Icon name="notifications" size={22} color={Colors.white} />
      </View>

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
        ListHeaderComponent={
          <ScrollView contentContainerStyle={{paddingHorizontal: RFValue(5)}}>
            <Text
              style={{
                color: 'black',
                fontFamily: Fonts.family.bold,
                fontSize: RFValue(22),
                marginTop: RFValue(10),
                alignSelf: 'center',
              }}>
              Hi user
            </Text>

            <CardView
              cornerRadius={RFValue(10)}
              cardElevation={RFValue(3)}
              cardMaxElevation={RFValue(3)}
              style={{
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

                <View
                  style={{
                    padding: RFValue(10),
                    backgroundColor: Colors.primary,
                    height: RFValue(100),
                    width: RFValue(100),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: RFValue(10),
                  }}>
                  <Icon name={'add'} color={Colors.white} size={22} />

                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: RFValue(14),
                      fontFamily: Fonts.family.regular,
                    }}>
                    Add more products
                  </Text>
                </View>
              </View>
            </CardView>

            <CardView
              cornerRadius={RFValue(10)}
              cardElevation={RFValue(3)}
              cardMaxElevation={RFValue(3)}
              style={{
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
                    Refer a friend
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
                  Receive free goodies on your doorstep
                </Text>
              </View>
            </CardView>
          </ScrollView>
        }
        ListFooterComponent={<View style={{height: RFValue(10)}}></View>}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
