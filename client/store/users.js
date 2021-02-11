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

// export const fetchUsers = async () => {
//   const token = window.localStorage.getItem('token');
//   if (token) {
//     let users = await axios.get('/api/users', {
//       headers: {
//         authorization: token,
//       },
//     });
//     return function (dispatch) {
//       return dispatch(_fetchUsers(users.data));
//     };
//   }
// };

export default function (state = [], action) {
  if (action.type === FETCH_USERS) {
    console.log('reducer seeing users, ', action.users);
    return action.users;
  }
  return state;
}
