import axios from "axios";

const SET_CATEGORY = "SET_CATEGORY";

export const setCategory = (items) => {
  return {
    type: SET_CATEGORY,
    items
  }
}

export const fetchItems = (category) => async (dispatch) => {
  const itemsFromCategory = (await axios.get(`/api/items/${category}`)).data
  // console.log(itemsFromCategory);
  return dispatch(setCategory(itemsFromCategory))
}

export default function categoryReducer (state = [], action){
  switch (action.type){
  case SET_CATEGORY:
    return action.items;
  default:
    return state;
  }
}

