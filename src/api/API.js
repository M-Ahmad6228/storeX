import axios from 'react-native-axios';
// import {BASE_URL} from 'react-native-dotenv';
import Commons from '../utils/Commons';

const BASE_URL = 'https://storex-371612.uc.r.appspot.com/api/';

export const api = (method, endpoint, body, headers) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: BASE_URL + endpoint,
      data: body,
      headers: {
        Authorization: 'Bearer ' + headers,
      },
    })
      .then(res => {
        if (res.data.success) resolve(res);
        else {
          Commons.toast(res.data.message);
          reject(res.data.message);
        }
      })
      .catch(err => {
        // console.log(err.response.data);
        Commons.toast(err.message);
        reject(err);
      });
  });
};

export const api2 = (method, url, body, headers) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: body,
      headers: headers,
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        Commons.toast(err.message);
        reject(err);
      });
  });
};
