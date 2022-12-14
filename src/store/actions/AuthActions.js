import {LOGGEDIN, LOGGEDOUT, UPDATE_USER} from '../Types';

export const updateUser = user => dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const login = (user, token) => dispatch => {
  dispatch({
    type: LOGGEDIN,
    payload: {isLoggedIn: true, user: user, token: token},
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGGEDOUT,
  });
};
