import axios from 'axios';

//ACTION CONSTANTS
const FETCH_USERS = 'FETCH_USERS';
const SET_PRIVILEGE = 'SET_PRIVILEGE';

//ACTION CREATORS
function _fetchUsers(users) {
  return {
    type: FETCH_USERS,
    users,
  };
}
const setPrivilege = (id, privilege) => ({
  type: SET_PRIVILEGE,
  id,
  privilege,
});

//THUNKS
export const fetchUsers = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    let users = await axios.get('/api/users', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(_fetchUsers(users.data));
  }
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
      return dispatch(setPrivilege(userId, privilege));
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default function (state = [], action) {
  if (action.type === FETCH_USERS) {
    return action.users;
  }
  if (action.type === SET_PRIVILEGE) {
    return state.map((user) => {
      if (user.id === action.id) {
        user.privilege = action.privilege;
      }
      return user;
    });
  }
  return state;
}
