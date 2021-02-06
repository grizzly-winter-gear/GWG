import axios from 'axios';

const ADD_ITEM = 'ADD_ITEM';
const SET_CART = 'SET_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';

const setAddItem = (item) => ({ type: ADD_ITEM, item });
const setCart = (cart) => ({ type: SET_CART, cart });
const setDeleteItem = (itemId) => ({ type: DELETE_ITEM, itemId });
const setEditItem = (data) => ({ type: EDIT_ITEM, data });

export const fetchCart = (id) => async (dispatch) => {
  try {
    const cart = (await axios.get(`/api/users/${id}`)).data.items;
    return dispatch(setCart(cart));
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};

export const fetchAddItem = (userId, itemId, quantity) => async (dispatch) => {
  try {
    // const cart = (await axios.get(`/api/users/${id}`)).data.items;
    const item = (
      await axios.post('/api/users/addItem', {
        userId: userId,
        itemId: itemId,
        quantity: quantity,
      })
    ).data;
    return dispatch(setAddItem(item));
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};

export const fetchDeleteItem = (userId, itemId) => async (dispatch) => {
  try {
    await axios.post(`/api/users/deleteItem`, {
      userId: userId,
      itemId: itemId,
    });
    return dispatch(setDeleteItem(itemId));
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};

export const fetchEditItem = (userId, itemId, quantity) => async (dispatch) => {
  try {
    if (quantity === 0) {
      dispatch(fetchDeleteItem(userId, itemId));
    } else {
      await axios.put(`/api/users/editQuantity`, {
        userId: userId,
        itemId: itemId,
        quantity: quantity,
      });
      return dispatch(setEditItem({ itemId: itemId, quantity: quanity }));
    }
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
    case ADD_ITEM:
      return [...state, action.item];
    case DELETE_ITEM:
      return state.filter((item) => item.itemId !== action.itemId.itemId);
    case EDIT_ITEM:
      return state.map((item) =>
        item.itemId === action.data.itemId
          ? { ...item, quantity: action.data.quantity }
          : item
      );
    default:
      return state;
  }
}
