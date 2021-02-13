import axios from 'axios';

const SET_CATEGORY = 'SET_CATEGORY';

export const setCategory = (items) => {
  return {
    type: SET_CATEGORY,
    items,
  };
};

export const fetchItems = (category, offset, history) => async (dispatch) => {
  const token = window.localStorage.getItem('token');

  const itemsFromCategory = (
    await axios.get(`/api/items/${category}/${offset}`, {
      headers: { authorization: token },
    })
  ).data;

  history.push(`/singlecategory/${category}/${itemsFromCategory.offset}`);
  return dispatch(setCategory(itemsFromCategory));
};

export default function categoryReducer(
  state = { list: [], offset: 0 },
  action
) {
  switch (action.type) {
    case SET_CATEGORY:
      return { list: action.items.items, offset: action.items.offset };
    default:
      return state;
  }
}
