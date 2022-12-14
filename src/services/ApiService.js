import {api, api2} from '../api/API';

export default {
  post: (endpoint, body, token = {}) => {
    return new Promise((resolve, reject) => {
      api('post', endpoint, body, token)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get: (endpoint, token, id = '') => {
    return new Promise((resolve, reject) => {
      api('get', endpoint + id, null, token)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  patch: (endpoint, body, token, id = '') => {
    return new Promise((resolve, reject) => {
      api('patch', endpoint + id, body, token)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete: (endpoint, id, token) => {
    return new Promise((resolve, reject) => {
      api('delete', endpoint + id, null, token)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  //Countries
  getAllCountries: () => {
    return new Promise((resolve, reject) => {
      var countries = [];
      api2('get', 'https://countriesnow.space/api/v0.1/countries/', null, null)
        .then(res => {
          res.data.data.forEach(country => {
            countries.push(country.country);
          });
          resolve(countries);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getAllStatesForCountry: country => {
    return new Promise((resolve, reject) => {
      var temp = [];
      var states = [];
      let body = {
        country: country,
      };
      api2(
        'post',
        'https://countriesnow.space/api/v0.1/countries/states',
        body,
        null,
      )
        .then(res => {
          temp = res.data.data.states;
          temp.forEach(state => {
            states.push(state.name);
          });
          resolve(states);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getAllCitiesForStates: (country, state) => {
    return new Promise((resolve, reject) => {
      let body = {
        country: country,
        state: state,
      };
      api2(
        'post',
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        body,
        null,
      )
        .then(res => {
          resolve(res.data.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
};
