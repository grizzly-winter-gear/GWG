import axios from 'axios';
import thunk from 'redux-thunk';

//ACTION CONSTANTS
const FETCH_USERS = 'FETCH_USERS';
const DESTROY_USER = 'DESTROY_USER';

//ACTION CREATORS
const _fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

const _destroyUser = (id) => {
  return {
    type: DESTROY_USER,
    id,
  };
};

//THUNKS
export const fetchUsers = async () => {
  let users = await axios.get('/api/users');
  return function (dispatch) {
    return dispatch(_fetchUsers(users.data));
  };
};

export const destroyUser = (id) => {
  //should user auth token be passed in to confirm admin? @kuperavv
  try {
    axios.post('/api/users/destroy', { id });
    return async function (dispatch) {
      return dispatch(_destroyItem(id));
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default function usersReducer(state = [], action) {
  if (action.type === FETCH_USERS) {
    return action.users;
  }
  if (action.type === DESTROY_USER) {
    return state.filter((user) => user.id !== action.id);
  }
  return state;
}
