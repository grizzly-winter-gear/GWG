import axios from 'axios';
import thunk from 'redux-thunk';

//ACTION CREATOR
const SET_ITEMS = 'SET_ITEMS';

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

//AXIOS CALL
export const pullItems = async () => {
  let result = await axios.get('/api/items');
  return result;
};

//THUNKS
//this function should work.. not sure why it's not...
export const fetchItems = () => {
  return function (dispatch) {
    return pullItems().then((result) => dispatch(setItems(result.data)));
  };
};

export default function itemsReducer(state = [], action) {
  if (action.type === SET_ITEMS) {
    return action.items;
  } else {
    return state;
  }
}
