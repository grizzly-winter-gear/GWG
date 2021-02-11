import axios from 'axios';

//ACTION CONSTANTS
const FETCH_USERS = 'FETCH_USERS';

//ACTION CREATORS
function _fetchUsers(users) {
  return {
    type: FETCH_USERS,
    users,
  };
}

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

export default function (state = [], action) {
  if (action.type === FETCH_USERS) {
    return action.users;
  }
  return state;
}
