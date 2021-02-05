import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = (cart) => ({ type: SET_CART, cart });

export const fetchCart = (id) => async (dispatch) => {
  const cart = (await axios.get(`/api/carts/${id}`)).data;
  return dispatch(setCart(cart));
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.item;
    default:
      return state;
  }
}
