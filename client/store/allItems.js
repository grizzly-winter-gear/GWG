import axios from 'axios';

//ACTION CONSTANTS
const SET_ITEMS = 'SET_ITEMS';
const DESTROY_ITEM = 'DESTROY_ITEM';
const CREATE_ITEM = 'CREATE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

//ACTION CREATORS
export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

export const _fetchAllItems = (items) => {
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

const _createItem = (item) => {
  return {
    type: CREATE_ITEM,
    item,
  };
};

const _updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};

// //AXIOS CALL
// export const pullItems = async (index) => {
//   let result = await axios.get(`/api/items/offset/${index}`);
//   return result;
// };

// //THUNKS
// export const fetchItems = (index) => {
//   return function (dispatch) {
//     return pullItems(index).then((result) => dispatch(setItems(result.data)));
//   };
// };

export const fetchAllItems = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  try {
    if (token) {
      const items = await axios.get('/api/items/', {
        headers: {
          authorization: token,
        },
      });
      return dispatch(_fetchAllItems(items.data));
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const destroyItem = (id) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  try {
    if (token) {
      axios.post(
        '/api/items/destroy',
        {
          id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return dispatch(_destroyItem(id));
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createItem = ({ name, category }) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const item = (
      await axios.put(
        '/api/items/create',
        { name, category },
        {
          headers: {
            authorization: token,
          },
        }
      )
    ).data;
    return dispatch(_createItem(item));
  }
};

export const updateItem = ({ id, name, category, stock }) => async (
  dispatch
) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const item = (
      await axios.put(
        '/api/items/update',
        { id, name, category, stock },
        {
          headers: {
            authorization: token,
          },
        }
      )
    ).data;
    return dispatch(_updateItem(item));
  }
};

export default function itemsReducer(
  state = { catalog: [], index: 0 },
  action
) {
  if (action.type === SET_ITEMS) {
    return { index: state.index + 10, catalog: action.items };
  }
  if (action.type === DESTROY_ITEM) {
    return {
      ...state,
      catalog: state.catalog.filter((item) => item.id !== action.id),
    };
  }
  if (action.type === CREATE_ITEM) {
    return { ...state, catalog: [action.item, ...state.catalog] };
  }
  if (action.type === UPDATE_ITEM) {
    return {
      ...state,
      catalog: state.catalog.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        } else {
          return item;
        }
      }),
    };
  }
  return state;
}
