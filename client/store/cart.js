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
    const token = window.localStorage.getItem('token');
    if (token) {
      const cart = (
        await axios.get(`/api/users/${id}`, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      return dispatch(setCart(cart));
    }
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};

export const fetchAddItem = (userId, itemId, quantity) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    if (token) {
      const item = (
        await axios.post(
          '/api/users/addItem',
          {
            userId: userId,
            itemId: itemId,
            quantity: quantity,
          },
          {
            headers: {
              authorization: token,
            },
          }
        )
      ).data;
      return dispatch(setAddItem(item));
    }
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};

export const fetchDeleteItem = (userId, itemId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    if (token) {
      await axios.post(
        `/api/users/deleteItem`,
        {
          userId: userId,
          itemId: itemId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return dispatch(setDeleteItem(itemId));
    }
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
      const token = window.localStorage.getItem('token');
      if (token) {
        await axios.put(
          `/api/users/editQuantity`,
          {
            userId: userId,
            itemId: itemId,
            quantity: quantity,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        return dispatch(setEditItem({ itemId: itemId, quantity: quantity }));
      }
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
      return state.map((item) =>
        item.id === action.item.id ? action.item : item
      );
    case DELETE_ITEM:
      // console.log(state);
      // console.log(action.itemId.itemId);
      return state.filter((item) => item.itemId !== action.itemId);
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
