import axios from 'axios';

const SET_PURCHASES = 'SET_PURCHASES';

const setPurchases = (carts) => ({ type: SET_PURCHASES, carts });

export const fetchPurchases = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const carts = (
      await axios.get(`/api/users/purchases`, {
        headers: {
          authorization: token,
        },
      })
    ).data;

    return dispatch(setPurchases(carts));
  }
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PURCHASES:
      return action.carts;
    default:
      return state;
  }
}
