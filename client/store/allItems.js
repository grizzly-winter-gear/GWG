import axios from 'axios';
import thunk from 'redux-thunk';

//ACTION CONSTANTS
const SET_ITEMS = 'SET_ITEMS';
const DESTROY_ITEM = 'DESTROY_ITEM';

//ACTION CREATORS
export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

const _destroyItem = (id) => {
  return {
    type: DESTROY_ITEM,
    id,
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

export const destroyItem = (id) => {
  //should user auth token be passed in to confirm admin? @kuperavv
  try {
    axios.post('/api/items/destroy', { id });
    return async function (dispatch) {
      return dispatch(_destroyItem(id));
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default function itemsReducer(state = [], action) {
  if (action.type === SET_ITEMS) {
    return action.items;
  }
  if (action.type === DESTROY_ITEM) {
    return state.filter((item) => item.id !== action.id);
  }
  return state;
}
