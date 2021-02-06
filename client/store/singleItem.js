import axios from 'axios';

const SET_ITEM = 'SET_ITEM';

const setItem = (item) => ({ type: SET_ITEM, item });

export const fetchItem = (id) => async (dispatch) => {
  const item = (await axios.get(`/api/items/${id}`)).data;
  return dispatch(setItem(item));
};

const initialState = {
  id: 'hello',
  name: 'This is an item',
  description: 'some text',
  imageURL: '/images/skifree.jpg',
  price: '99.99',
  stock: '5',
  rating: '3',
  category: '4',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ITEM:
      return action.item;
    default:
      return state;
  }
}
