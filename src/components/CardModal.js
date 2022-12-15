import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Styles, Fonts, Colors, Commons, Images} from '../utils';
import CardView from 'react-native-cardview';
import creditCardType from 'credit-card-type';
import {ProgressBar} from 'react-native-material-indicators';
import Modal from 'react-native-modal';
import {TextInputMask, TextMask} from 'react-native-masked-text';
import {api} from '../api/API';
import ApiService from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useSelector, useDispatch} from 'react-redux';
import Endpoints from '../utils/Endpoints';

const CardModal = props => {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      let obj = {
        name: props.objects.cardHolder,
        number: props.objects.cardNumber,
        cvv: props.objects.cvv,
        cardType: props.objects.type,
        expiry: props.objects.expiry,
      };
      if (props.objects.isEdit) updateCard(obj);
      else addCard(obj);
    }
  }, [visible]);

  const addCard = async obj => {
    // await ApiService.post(Endpoints.cards, obj, user.token)
    //   .then(res => {
    //     setVisible(false);
    //     // props.objects.cards.push(res.data.data);
    //     // dispatch(updateCards(props.objects.cards));
    //     props.setters.setCardModal(false);
    //     props.setters.setCardHolder('');
    //     props.setters.setCardNumber('');
    //     props.setters.setExpiry('');
    //     props.setters.setCvv('');
    //     props.setters.setCardType('');
    //     props.setters.setType('');
    //     props.setters.setEnabled(false);
    //     props.setters.setEdit(false);
    //     props.setters.setVisible(false);
    //   })
    //   .catch(err => {
    //     setVisible(false);
    //   });
  };

  const updateCard = async obj => {
    // await ApiService.patch(
    //   Endpoints.cards,
    //   obj,
    //   user.token,
    //   props.objects.selectedId,
    // )
    //   .then(res => {
    //     setVisible(false);
    //     const item = props.objects.cards.find(
    //       item => item._id === props.objects.selectedId,
    //     );
    //     item.number = obj.number;
    //     item.name = obj.name;
    //     item.cvv = obj.cvv;
    //     item.expiry = obj.expiry;
    //     item.cardType = obj.cardType;
    //     props.setters.setCardModal(false);
    //     props.setters.setCardHolder('');
    //     props.setters.setCardNumber('');
    //     props.setters.setExpiry('');
    //     props.setters.setCvv('');
    //     props.setters.setCardType('');
    //     props.setters.setType('');
    //     props.setters.setEnabled(false);
    //     props.setters.setEdit(false);
    //     props.setters.setVisible(false);
    //     // dispatch(updateCards(props.objects.cards));
    //   })
    //   .catch(err => {
    //     setVisible(false);
    //   });
  };

  const checkCardType = text => {
    let temp = '',
      cardType = '',
      type = '';
    const results = creditCardType(text);

    if (text.length === 0) {
      cardType = '';
      type = '';

      props.setters.setCardType(cardType);
      props.setters.setType(type);
    } else if (results.length === 1) {
      type = results[0].type;
      if (type === 'visa') cardType = Images.visa;
      else if (type === 'maestro') cardType = Images.maestro;
      else if (type === 'unionpay') cardType = Images.unionpay;
      else if (type === 'jcb') cardType = Images.jcb;
      else if (type === 'discover') cardType = Images.discover;
      else if (type === 'mastercard') cardType = Images.master_card;
      else if (type === 'american-express') cardType = Images.american_express;

      props.setters.setCardType(cardType);
      props.setters.setType(type);
    }
  };

  return (
    <Modal
      statusBarTranslucent={true}
      isVisible={props.objects.addCardModal}
      onBackdropPress={() => {
        props.setters.setCardModal(false);
        props.setters.setCardHolder('');
        props.setters.setCardNumber('');
        props.setters.setExpiry('');
        props.setters.setCvv('');
        props.setters.setCardType('');
        props.setters.setType('');
        props.setters.setEnabled(false);
        props.setters.setEdit(false);
      }}
      onBackButtonPress={() => {
        props.setters.setCardModal(false);
        props.setters.setCardHolder('');
        props.setters.setCardNumber('');
        props.setters.setExpiry('');
        props.setters.setCvv('');
        props.setters.setCardType('');
        props.setters.setType('');
        props.setters.setEnabled(false);
        props.setters.setEdit(false);
      }}>
      <View
        style={{
          overflow: 'hidden',
          backgroundColor: '#F9F9F9',
          borderRadius: 15,
        }}>
        <ProgressBar
          size={48}
          determinate={false}
          thickness={4}
          visible={visible}
          color={Colors.primary}
        />
        <View
          style={{
            padding: Commons.size(15),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={Images.card}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                tintColor: Colors.primary,
              }}
            />

            <Text
              style={{
                flex: 1,
                fontFamily: Fonts.family.semibold,
                color: Colors.black,
                marginHorizontal: Commons.width(0.05),
                fontSize: Commons.size(14),
              }}>
              Add Credit / Debit Card
            </Text>

            <Pressable
              onPress={() => {
                props.setters.setCardModal(false);
              }}>
              <Image
                source={Images.close}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  tintColor: Colors.primary,
                }}
              />
            </Pressable>
          </View>

          <View style={{marginTop: Commons.height(0.05)}} />

          <Text
            style={{
              fontSize: Commons.size(14),
              fontFamily: Fonts.family.bold,
              color: Colors.black,
            }}>
            Card Holder's Name
          </Text>
          <TextInput
            style={{
              backgroundColor: Colors.white,
              padding: Commons.size(7),
              marginTop: Commons.size(7),
              color: Colors.black,
              borderRadius: 7,
              fontFamily: Fonts.family.regular,
            }}
            maxLength={35}
            value={props.objects.cardHolder}
            onChangeText={text => props.setters.setCardHolder(text)}
          />

          <Text
            style={{
              fontSize: Commons.size(14),
              fontFamily: Fonts.family.bold,
              color: Colors.black,
              marginTop: Commons.size(7),
            }}>
            Card Number
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
              paddingHorizontal: Commons.size(7),
              color: Colors.black,
              marginTop: Commons.size(7),
              borderRadius: Commons.size(7),
              alignItems: 'center',
            }}>
            <TextInputMask
              type={'credit-card'}
              style={{
                flex: 1,
                fontFamily: Fonts.family.regular,
                color: Colors.black,
              }}
              options={{
                obfuscated: false,
                issuer: 'visa-or-mastercard',
              }}
              value={props.objects.cardNumber}
              onChangeText={text => {
                props.setters.setCardNumber(text);
                checkCardType(text);
              }}
            />
            {props.objects.cardType !== '' && (
              <Image
                source={props.objects.cardType}
                style={{resizeMode: 'contain', height: 25, width: 35}}
              />
            )}
          </View>

          <View style={{marginTop: Commons.size(7)}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  flex: 0.5,
                  marginRight: Commons.height(0.02),
                  fontSize: Commons.size(14),
                  fontFamily: Fonts.family.bold,
                  color: Colors.black,
                }}>
                Expiry Date
              </Text>
              <Text
                style={{
                  flex: 0.5,
                  marginLeft: Commons.height(0.02),
                  fontSize: Commons.size(14),
                  fontFamily: Fonts.family.bold,
                  color: Colors.black,
                }}>
                CVV
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextInputMask
                type={'datetime'}
                style={{
                  borderRadius: 7,
                  marginTop: Commons.size(7),
                  marginRight: '2%',
                  flex: 0.5,
                  color: Colors.black,
                  backgroundColor: Colors.white,
                  fontFamily: Fonts.family.regular,
                  padding: Commons.size(7),
                }}
                options={{
                  format: 'MM/YY',
                }}
                // customTextInput={expiryTextField}
                maxLength={5}
                value={props.objects.expiry}
                onChangeText={text => {
                  props.setters.setExpiry(text);
                }}
                placeholder={'MM/YY'}
              />

              <TextInput
                style={{
                  borderRadius: 7,
                  marginTop: Commons.size(7),
                  marginLeft: '2%',
                  flex: 0.5,
                  color: Colors.black,
                  backgroundColor: Colors.white,
                  fontFamily: Fonts.family.regular,
                  padding: Commons.size(7),
                }}
                maxLength={4}
                keyboardType="numeric"
                value={props.objects.cvv}
                onChangeText={text => props.setters.setCvv(text)}
                placeholder={'***'}
              />
            </View>
          </View>

          <TouchableOpacity
            style={
              props.objects.isEnabled
                ? {
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.primary,
                    paddingVertical: Commons.size(10),
                    marginTop: Commons.size(10),
                    borderRadius: 10,
                  }
                : {
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.grey,
                    paddingVertical: Commons.size(10),
                    marginTop: Commons.size(10),
                    borderRadius: 10,
                  }
            }
            disabled={!props.objects.isEnabled}
            onPress={() => {
              setVisible(true);
            }}>
            <Text
              style={{
                color: Colors.white,
                alignSelf: 'center',
                fontSize: 16,
                fontFamily: Fonts.family.bold,
              }}>
              {props.objects.isEdit ? 'Update Card' : 'Add Card'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CardModal;
