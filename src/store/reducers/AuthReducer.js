import {LOGGEDIN, LOGGEDOUT, UPDATE_USER} from '../Types';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  var newState = {};
  switch (action.type) {
    case LOGGEDIN:
      newState = {
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        token: action.payload.token,
      };
      return newState;
    case UPDATE_USER:
      newState = {
        isLoggedIn: state.isLoggedIn,
        user: action.payload,
        token: state.token,
      };
      return newState;
    case LOGGEDOUT:
      newState = {
        isLoggedIn: false,
        user: null,
        token: null,
      };
      return newState;
    default:
      return state;
  }
};

export default authReducer;
