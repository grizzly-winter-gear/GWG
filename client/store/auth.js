import axios from 'axios';
import history from '../history';
import { clearCart } from './cart';

const storage = () => window.localStorage;
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = storage().getItem(TOKEN);

  let cart = window.localStorage.getItem('cart');
  if (cart) {
    cart = JSON.parse(cart);
  }

  if (token) {
    const res = await axios.post(
      '/auth/me',
      { cart: cart },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (window.localStorage.getItem('cart')) {
      window.localStorage.removeItem('cart');
    }

    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.removeItem('cart');
    storage().setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    if (window.localStorage.getItem('cart')) {
      window.localStorage.removeItem('cart');
    }
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => (dispatch) => {
  storage().removeItem(TOKEN);
  if (window.localStorage.getItem('cart')) {
    window.localStorage.removeItem('cart');
  }
  dispatch(clearCart());

  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
