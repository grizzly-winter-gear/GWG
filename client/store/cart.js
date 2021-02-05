import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = (cart) => ({ type: SET_CART, cart });

export const fetchCart = (id) => async (dispatch) => {
  try {
    const cart = (await axios.get(`/api/users/${id}`)).data.items;
    return dispatch(setCart(cart));
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
