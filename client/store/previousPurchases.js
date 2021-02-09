import axios from 'axios';

const SET_PURCHASES = 'SET_PURCHASES';

const setPurchases = (purchases) => ({ type: SET_PURCHASES, purchases });

export const fetchPurchases = () => async (dispatch) => {
  console.log('hi');
  const token = window.localStorage.getItem('token');
  if (token) {
    const purchases = (
      await axios.get(`/api/users/purchases`, {
        headers: {
          authorization: token,
        },
      })
    ).data;
    console.log('Purchases', purchases);
    return dispatch(setPurchases(purchases.carts));
  }
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PURCHASES:
      return action.purchases;
    default:
      return state;
  }
}
