import axios from 'axios';
import history from '../history';

const storage = () => window.localStorage;
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const SET_PRIVILEGE = 'SET_PRIVILEGE';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const setPrivilege = (privilege) => ({ type: SET_PRIVILEGE, privilege });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = storage().getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
    storage().setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  storage().removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const fetchEditPrivilege = (userId, privilege) => async (dispatch) => {
  let res;
  try {
    const token = window.localStorage.getItem('token');
    if (token) {
      res = await axios.put(
        '/api/users/editPrivilege',
        { userId, privilege },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log('privilege result:', res);
      dispatch(setPrivilege(privilege));
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case SET_PRIVILEGE:
      return { ...state, privilege: action.privilege };
    default:
      return state;
  }
}
