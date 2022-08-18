import {
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

export default {
  calculateDateFromObj: date => {
    let strDate =
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      '-' +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '-' +
      date.getFullYear();
    return strDate || date;
  },

  reset: (navigation, screen) => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: screen}],
    });

    navigation.dispatch(resetAction);
  },

  navigateParams: (navigation, screen, params) => {
    navigation.navigate(screen, params);
  },

  navigate: (navigation, screen) => {
    navigation.navigate(screen);
  },

  toast: message => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        120,
      );
    }
  },

  pickSingleFile: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await DocumentPicker.pickSingle({
          type: DocumentPicker.types.allFiles,
          copyTo: 'cachesDirectory',
        });
        resolve(results);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          throw err;
        }
        reject(err);
      }
    });
  },

  pickMultipleFile: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: DocumentPicker.types.allFiles,
          copyTo: 'cachesDirectory',
        });
        resolve(results);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          throw err;
        }
        reject(err);
      }
    });
  },

  checkPermissions: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Camera Permission',
            message:
              'Pupper needs access to your camera ' +
              'so you can take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(true);
        } else {
          console.log('Permission denied');
          reject('Permission denied');
        }
      } catch (err) {
        console.warn(err);
        reject(err);
      }
    });
  },

  exitApp: () => {
    BackHandler.exitApp();
    return true;
  },

  goBack: navigation => {
    navigation.goBack();
    return true;
  },
};
